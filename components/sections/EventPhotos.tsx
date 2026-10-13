import { FadeContainer, FadeDiv } from "@/components/Fade"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { PhotoGallery } from "@/components/PhotoGallery"
import { photos, year } from "@/lib/content/2026"

export function EventPhotos() {
  if (photos.length === 0) return null

  return (
    <section id="photos" className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading
          eyebrow={`${year} · Impressions`}
          title="Photos"
          lede="From an empty room in the morning to the group photo at the end. Click any photo to view it full size."
        />

        <FadeContainer>
          <FadeDiv delay={0.2}>
            <div className="mt-16">
              <PhotoGallery photos={photos} year={year} />
            </div>
          </FadeDiv>

          <FadeDiv delay={0.3}>
            <div className="mt-10 flex flex-col items-center gap-3 text-center">
              {/*
                Keep this visible. These are photos of identifiable people, and
                a one-click takedown path is the cheapest way to stay on the
                right side of a GDPR complaint.
              */}
              <p className="text-sm text-gray-400">
                Recognise yourself and would rather not be here?{" "}
                <a
                  href="mailto:team@sitwhm.de?subject=Please%20remove%20my%20photo"
                  className="underline hover:text-gray-600"
                >
                  Email us
                </a>{" "}
                and we&apos;ll take the photo down.
              </p>
            </div>
          </FadeDiv>
        </FadeContainer>
      </div>
    </section>
  )
}
