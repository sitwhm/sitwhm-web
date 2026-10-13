#!/usr/bin/env python3
"""
Turn raw event photos into the files the gallery serves.

The originals are iPhone HEICs shot from an audience seat under mixed light:
daylight from the windows, a bright projector, warm ceiling lights. Out of the
camera they are flat, slightly grey-green in the walls, dark in the front rows,
and the projection screen sits near clipping. This is the darkroom pass.

Each step is deliberately conservative. The goal is a photo that looks like
someone competent developed it, not an HDR poster.

  1 white balance   gentle grey-world correction, damped so the room keeps its
                    warmth instead of going clinically neutral
  2 black point     per-channel percentile stretch with a high clip guard, so
                    the blown projector screen can't define the white point
  3 tone curve      filmic S-curve plus shadow lift, applied in LINEAR light so
                    midtones open without the colours going muddy
  4 vibrance        saturates muted pixels more than already-saturated ones,
                    which protects skin tones and the blue lanyards
  5 resize          Lanczos to the target long edge, full and thumbnail
  6 sharpen         unsharp mask sized for the output, not the original

Setup (one-off, the deps are not part of the site build):

    python3 -m venv .photovenv
    .photovenv/bin/pip install pillow pillow-heif numpy

Usage:

    .photovenv/bin/python scripts/process-photos.py --src ~/Downloads/photos
    .photovenv/bin/python scripts/process-photos.py --src ... --format png

WebP is the default. At 2000px these frames are about 12x larger as PNG with
no visible difference, and git keeps every version forever. PNG earns its keep
on screenshots and line art, not on photographs.
"""
import argparse
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageOps, ImageFilter

try:
    import pillow_heif

    pillow_heif.register_heif_opener()
except ImportError:  # HEIC support is only needed for iPhone originals
    pillow_heif = None

REPO = Path(__file__).resolve().parent.parent

FULL_EDGE = 2000
# The gallery's featured tile is roughly 560px wide on a desktop and crops a
# 4:3 frame to a square, so a 900px thumbnail was being asked to cover more
# than it had. 1400 gives it headroom without approaching the full size.
THUMB_EDGE = 1400


# --------------------------------------------------------------------------
# the edit
# --------------------------------------------------------------------------
def to_linear(x):
    return np.where(x <= 0.04045, x / 12.92, ((x + 0.055) / 1.055) ** 2.4)


def to_srgb(x):
    x = np.clip(x, 0.0, 1.0)
    return np.where(x <= 0.0031308, x * 12.92, 1.055 * (x ** (1 / 2.4)) - 0.055)


def white_balance(rgb, strength=0.25):
    """
    Grey-world, heavily damped. We only travel `strength` of the way to
    neutral, measured on midtones only.

    The damping is not timidity. Grey-world assumes the average scene is
    neutral, and in these frames the dominant object is a projector screen
    showing a strongly coloured slide. At strength 0.6 that assumption swung
    the correction in opposite directions depending on the slide: the wall went
    olive behind a blue title slide and the screen went blue on a white one.
    The iPhone's own auto white balance was already close; the problem with
    these files was flatness, not colour.
    """
    luma = rgb.mean(axis=2)
    mask = (luma > 0.15) & (luma < 0.85)
    if mask.sum() < 1000:
        return rgb
    means = np.array([rgb[..., c][mask].mean() for c in range(3)])
    gains = means.mean() / np.maximum(means, 1e-6)
    return rgb * (1.0 + (gains - 1.0) * strength)


def set_black_point(rgb, low_pct=0.5):
    """
    Subtract the black point and rescale. Measured on luminance and applied to
    all three channels equally: doing it per channel is a white balance in
    disguise and shifts the colour of the shadows.

    Note what this deliberately does NOT do: touch the white point. An earlier
    version stretched each channel to a high percentile, which was wrong here.
    In frames where the projector screen fills most of the image, that
    percentile already sits at near-white, so the stretch drove more than half
    the pixels to pure 255 and flattened the screen into a white rectangle.
    These photos are lit by a projector; their highlights are the subject, not
    headroom to be spent.
    """
    lum = rgb.mean(axis=2)
    black = np.percentile(lum, low_pct)
    if black <= 0.0:
        return rgb
    return np.maximum(rgb - black, 0.0) / (1.0 - black)


def tone_curve(lin, contrast=1.10, shadow_lift=0.018, knee=0.80):
    """
    Gentle S-curve with a soft shoulder.

    Everything above `knee` is compressed through a tanh instead of being
    clipped, so the bright screen keeps its texture and the slide stays
    readable rather than turning into a white hole.
    """
    pivot = 0.18
    out = pivot * np.power(np.maximum(lin, 1e-6) / pivot, contrast)
    out = out + shadow_lift * np.exp(-out / 0.05)

    head = 1.0 - knee
    over = out > knee
    out[over] = knee + head * np.tanh((out[over] - knee) / head)
    return np.clip(out, 0.0, 1.0)


def vibrance(rgb, amount=0.16):
    """Boost flat pixels most, so faces don't go orange."""
    mx = rgb.max(axis=2, keepdims=True)
    mn = rgb.min(axis=2, keepdims=True)
    sat = (mx - mn) / np.maximum(mx, 1e-6)
    grey = rgb.mean(axis=2, keepdims=True)
    return np.clip(grey + (rgb - grey) * (1.0 + amount * (1.0 - sat) ** 2), 0, 1)


def develop(path: Path, crop=None) -> Image.Image:
    im = ImageOps.exif_transpose(Image.open(path)).convert("RGB")
    if crop:
        l, t, r, b = crop
        im = im.crop((round(im.width * l), round(im.height * t),
                      round(im.width * r), round(im.height * b)))
    rgb = np.asarray(im).astype(np.float32) / 255.0

    rgb = white_balance(rgb)
    rgb = set_black_point(rgb)
    rgb = to_srgb(tone_curve(to_linear(rgb)))
    rgb = vibrance(rgb)

    out = Image.fromarray((np.clip(rgb, 0, 1) * 255).round().astype(np.uint8))
    scale = FULL_EDGE / max(out.size)
    if scale < 1:
        out = out.resize(
            (round(out.width * scale), round(out.height * scale)), Image.LANCZOS
        )
    # Light touch. The first pass used percent=85/radius=1.1 and put visible
    # halos around the slide text, which on a photo of a screen full of type is
    # the most obvious place to get it wrong.
    return out.filter(ImageFilter.UnsharpMask(radius=0.8, percent=50, threshold=4))


# --------------------------------------------------------------------------
# the selection
# --------------------------------------------------------------------------
# Source filename -> output slug. Picked by eye from contact sheets of all the
# originals: the widest spread of moments the set actually contains, with the
# near-duplicate burst frames dropped.
#
# Keyed by filename rather than by position, so dropping another photo into the
# folder cannot silently re-point every entry at the wrong frame.
#
# To redo the selection for a new batch, generate contact sheets, look at them,
# and rewrite this map. There is no clever way around looking.
SELECTION = {
    "20260919_144952516_iOS.heic": "opening-the-talk",
    "20260919_144918788_iOS.heic": "addressing-the-room",
    "20260919_150329189_iOS.heic": "pointing-at-the-slide",
    "20260919_150650206_iOS.heic": "show-of-hands",
    "20260919_150820099_iOS.heic": "mid-gesture",
    "20260919_145829437_iOS.heic": "filming-from-the-back",
    "20260919_145810217_iOS.heic": "auditorium-from-the-back",
    "20260919_145514958_iOS.heic": "a-question-to-the-room",
    # Shot the day before, the room set up and still empty.
    "IMG_5302.HEIC": "the-empty-room",
    # From the second export, which reaches past 15:08 into the rest of the day.
    "20260919_153839724_iOS.heic": "group-photo",
    "20260919_152418918_iOS.heic": "audience-in-the-window-light",
    "IMG_0211.HEIC": "before-the-doors-opened",
    "IMG_0220.HEIC": "morten-wittrock-on-stage",
    "IMG_0229.HEIC": "book-raffle-winners",
    # Handed over separately, including the first photos we have of the Friday
    # CodeJam at the Syntax office. Everything else in the set is the white
    # auditorium, so these are the only images of the other half of the
    # programme.
    "codejam-room.jpg": "codejam-at-the-syntax-office",
    "codejam-screen.jpg": "codejam-hands-on-with-cap",
    "steiner-closeup.jpg": "matthias-steiner-speaking",
    "room-during-session.jpg": "the-room-during-a-session",
    "speaker-thanks.jpg": "thanks-to-the-speakers",
}

# Optional per-slug crop, as fractions of the original (left, top, right,
# bottom). Used sparingly, where the framing of the original gets in the way.
CROPS = {
    # The group stands in the upper third with a sea of empty chairs below and
    # a stretch of bare ceiling above. Trimming both puts the people, and the
    # "See you next year!" screens behind them, where they belong.
    "group-photo": (0.03, 0.14, 0.97, 0.86),
}


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--src", required=True, help="folder of original photos")
    ap.add_argument("--year", default="2026")
    # WebP by default: these are photographs, and the same set runs 68 MB as
    # PNG against 4 MB as WebP with no visible difference.
    ap.add_argument("--format", choices=["png", "webp"], default="webp")
    ap.add_argument(
        "--all", action="store_true",
        help="process every source file instead of the curated SELECTION",
    )
    args = ap.parse_args()

    src_dir = Path(args.src).expanduser()
    files = sorted(
        p for p in src_dir.iterdir()
        if p.suffix.lower() in {".heic", ".heif", ".jpg", ".jpeg", ".png"}
    )
    if not files:
        print(f"No images in {src_dir}", file=sys.stderr)
        return 1

    full_dir = REPO / "public" / "photos" / args.year
    thumb_dir = full_dir / "thumbs"
    full_dir.mkdir(parents=True, exist_ok=True)
    thumb_dir.mkdir(parents=True, exist_ok=True)

    by_name = {p.name: p for p in files}
    if args.all:
        jobs = [(p, f"photo-{i:02d}") for i, p in enumerate(files)]
    else:
        jobs = []
        for name, slug in SELECTION.items():
            path = by_name.get(name)
            if path is None:
                print(f"skip {slug}: {name} not found in {src_dir}", file=sys.stderr)
                continue
            jobs.append((path, slug))

    ext = args.format
    save_kw = {"optimize": True} if ext == "png" else {"quality": 82, "method": 6}
    total = 0

    for path, slug in jobs:
        full = develop(path, CROPS.get(slug))
        fp = full_dir / f"{slug}.{ext}"
        full.save(fp, ext.upper(), **save_kw)

        thumb = full.copy()
        thumb.thumbnail((THUMB_EDGE, THUMB_EDGE), Image.LANCZOS)
        tp = thumb_dir / f"{slug}.{ext}"
        thumb.save(tp, ext.upper(), **save_kw)

        size = fp.stat().st_size + tp.stat().st_size
        total += size
        print(f"{slug:28s} {full.width}x{full.height}  {size/1024:7.0f} KB")

    print(f"\n{len(jobs)} photos, {total/1024/1024:.1f} MB total as {ext.upper()}")
    print(f"written to public/photos/{args.year}/")
    return 0


if __name__ == "__main__":
    sys.exit(main())
