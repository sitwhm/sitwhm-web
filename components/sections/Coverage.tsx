import { FadeContainer, FadeDiv } from "@/components/Fade"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { LinkedInPost } from "@/components/LinkedInPost"
import { coverage } from "@/lib/content/2026"
import type { CoveragePost } from "@/lib/types"
import {
  RiLinkedinBoxFill,
  RiArticleLine,
  RiCloudLine,
  RiChat1Line,
  RiArrowRightUpLine,
} from "@remixicon/react"

const PLATFORM: Record<
  CoveragePost["platform"],
  { label: string; Icon: typeof RiLinkedinBoxFill }
> = {
  linkedin: { label: "LinkedIn", Icon: RiLinkedinBoxFill },
  bluesky: { label: "Bluesky", Icon: RiCloudLine },
  mastodon: { label: "Mastodon", Icon: RiChat1Line },
  blog: { label: "Blog", Icon: RiArticleLine },
  "sap-community": { label: "SAP Community", Icon: RiArticleLine },
}

/**
 * Community coverage.
 *
 * One column of full-width cards rather than a grid, because the cards expand:
 * a post embed is well over 500px tall, and in a two-column layout opening one
 * card shoves its neighbour around. A single column lets each post open in
 * place without disturbing anything above it.
 *
 * Each card carries our own one-line description, and optionally the whole
 * post via LinkedIn's embed, loaded only on click. We never copy the author's
 * text onto our pages.
 *
 * Entries without a url are treated as unfinished and skipped, so a row can be
 * scaffolded in the content file before the link is known.
 */
export function Coverage() {
  // Array order is the running order. Dates on LinkedIn posts are a nuisance
  // to get right and add nothing here.
  const sorted = coverage.filter((p) => p.url)

  return (
    <section
      id="coverage"
      className="bg-gradient-to-b from-gray-50 to-white py-24"
    >
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <SectionHeading
          eyebrow="#sitWHM"
          title="What people wrote"
          lede={
            sorted.length > 0
              ? "Posts from attendees and speakers, straight from LinkedIn."
              : "Attendees and speakers have been posting about the day. We're collecting the best of it here."
          }
        />

        {sorted.length > 0 && (
          <FadeContainer>
            <div className="mt-16 space-y-4">
              {sorted.map((post, i) => {
                const { label, Icon } = PLATFORM[post.platform]
                return (
                  <FadeDiv key={post.id} delay={0.2 + 0.08 * i}>
                    <article className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                      {/*
                        A thin header only. The embed below carries the
                        author's name and picture itself; this line is what
                        remains if the embed is blocked or the post is deleted.
                      */}
                      <div className="mb-4 flex items-center gap-2 text-gray-400">
                        <Icon className="h-4 w-4 shrink-0" />
                        <span className="text-sm font-medium text-gray-900">
                          {post.author}
                        </span>
                        {post.authorRole && (
                          <span className="truncate text-sm">
                            · {post.authorRole}
                          </span>
                        )}
                      </div>

                      {post.platform === "linkedin" && post.linkedinEmbedUrn ? (
                        <LinkedInPost
                          urn={post.linkedinEmbedUrn}
                          url={post.url}
                          author={post.author}
                        />
                      ) : (
                        <a
                          href={post.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-syntax-blue hover:underline"
                        >
                          Read it on {label}
                          <RiArrowRightUpLine className="h-4 w-4" />
                        </a>
                      )}
                    </article>
                  </FadeDiv>
                )
              })}
            </div>
          </FadeContainer>
        )}

        <FadeDiv delay={0.3}>
          <div
            className={`${
              sorted.length > 0 ? "mt-10" : "mt-16"
            } rounded-xl border border-dashed border-gray-300 bg-white/60 px-6 py-6 text-center`}
          >
            <p className="text-gray-600">
              Posted about sitWHM and think it belongs here?{" "}
              <a
                href="mailto:team@sitwhm.de?subject=%23sitWHM%20post"
                className="font-semibold text-syntax-blue hover:underline"
              >
                Send us the link.
              </a>
            </p>
          </div>
        </FadeDiv>
      </div>
    </section>
  )
}
