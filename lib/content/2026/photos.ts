import { Photo } from "@/lib/types"

/**
 * Event photos.
 *
 * Produced from the originals by scripts/process-photos.py, which also writes
 * the matching thumbnail. `src` is just the filename; the gallery builds both
 * URLs from it.
 *
 * Format is WebP, not PNG. These are photographs, and at 2000px the same set
 * was 68 MB as PNG against 4 MB as WebP with no visible difference. PNG earns
 * its keep on screenshots and line art, and git keeps every version forever.
 *
 * The set spans both days: the CodeJam on the Friday, the room before the
 * doors opened, several of the talks, the audience, the book raffle, the
 * speaker thank-you and the closing group photo.
 *
 * Keep the committed set SMALL. The full-resolution originals belong behind
 * `fullGalleryUrl`, not in git.
 *
 * GDPR note: these are identifiable people. Make sure there was a photography
 * notice at registration or on site. The "remove my photo" mailto is rendered
 * automatically below the grid; leave it there.
 */
export const photos: Photo[] = [
  {
    // First entry gets the large tile in the gallery grid. The group photo
    // has earned it.
    id: "group-photo",
    src: "group-photo.webp",
    alt: "Everyone gathered for the closing group photo, hands in the air, 'See you next year!' on the screens",
  },
  {
    id: "the-empty-room",
    src: "the-empty-room.webp",
    alt: "The Syntax Auditorium set up and still empty, the day before the event",
  },
  {
    id: "codejam-at-the-syntax-office",
    src: "codejam-at-the-syntax-office.webp",
    alt: "The CodeJam at the Syntax office, participants on the tiered wooden seating with their laptops",
  },
  {
    id: "codejam-hands-on-with-cap",
    src: "codejam-hands-on-with-cap.webp",
    alt: "A CAP CDS service definition on the screen during the hands-on CodeJam",
  },
  {
    id: "before-the-doors-opened",
    src: "before-the-doors-opened.webp",
    alt: "Rows of chairs with a Syntax tote bag on every seat, shortly before the doors opened",
  },
  {
    id: "opening-the-talk",
    src: "opening-the-talk.webp",
    alt: "Matthias Steiner opening his talk, the title slide on the screen behind him",
  },
  {
    id: "addressing-the-room",
    src: "addressing-the-room.webp",
    alt: "Matthias Steiner addressing the room, hand raised, daylight from the windows",
  },
  {
    id: "audience-in-the-window-light",
    src: "audience-in-the-window-light.webp",
    alt: "Attendees listening, lit by the tall windows along the side of the room",
  },
  {
    id: "morten-wittrock-on-stage",
    src: "morten-wittrock-on-stage.webp",
    alt: "Morten Wittrock presenting GitHub and Cloud Integration",
  },
  {
    id: "matthias-steiner-speaking",
    src: "matthias-steiner-speaking.webp",
    alt: "Matthias Steiner mid-sentence in front of his 'Built with AI' slide",
  },
  {
    id: "show-of-hands",
    src: "show-of-hands.webp",
    alt: "An attendee raising a hand during a show of hands",
  },
  {
    id: "a-question-to-the-room",
    src: "a-question-to-the-room.webp",
    alt: "Matthias Steiner putting a question to the room",
  },
  {
    id: "mid-gesture",
    src: "mid-gesture.webp",
    alt: "Matthias Steiner mid-gesture in front of the closing slides",
  },
  {
    id: "filming-from-the-back",
    src: "filming-from-the-back.webp",
    alt: "An attendee filming the talk on a phone from the back rows",
  },
  {
    id: "the-room-during-a-session",
    src: "the-room-during-a-session.webp",
    alt: "The auditorium during an afternoon session, seen from the back rows",
  },
  {
    id: "book-raffle-winners",
    src: "book-raffle-winners.webp",
    alt: "The winners of the SAP PRESS book raffle with their prizes",
  },
  {
    id: "thanks-to-the-speakers",
    src: "thanks-to-the-speakers.webp",
    alt: "The speakers lined up on stage with their gifts, 'Thanks to all the speakers!' on the screens",
  },
]

/**
 * Which photos appear in the hero, and in what order.
 *
 * Listed by id rather than taken from the top of `photos`, so reordering the
 * gallery doesn't silently change the first thing a visitor sees. Entries
 * whose photo has no file yet are skipped, and the hero lays out whatever is
 * left.
 */
export const heroPhotoIds = [
  "group-photo",
  "the-empty-room",
  "addressing-the-room",
]
