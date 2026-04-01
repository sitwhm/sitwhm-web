import { siteConfig } from "@/app/siteConfig"
import { FadeContainer, FadeDiv } from "@/components/Fade"
import { RiLinkedinBoxFill, RiTwitterXFill } from "@remixicon/react"

const shareText = encodeURIComponent(`Join me at ${siteConfig.name} - a free community tech conference on ${siteConfig.event.date} in ${siteConfig.event.city}!`)
const shareUrl = encodeURIComponent(siteConfig.url)

export function Hashtag() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 py-24">
      <div className="relative z-10 mx-auto max-w-6xl px-4 md:px-6">
        <FadeContainer className="text-center">
          <FadeDiv>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-400">
              Spread the word
            </p>
          </FadeDiv>

          <FadeDiv delay={0.1}>
            <h2 className="mt-4 text-5xl font-bold tracking-tight text-white sm:text-7xl lg:text-7xl">
              <span className="bg-gradient-to-r from-syntax-cyan to-syntax-green bg-clip-text text-transparent">
                #sitWHM
              </span>
            </h2>
          </FadeDiv>

          <FadeDiv delay={0.2}>
            <p className="mx-auto mt-5 max-w-md text-lg text-gray-400">
              Share the event with your network and help us grow the community.
            </p>
          </FadeDiv>

          <FadeDiv delay={0.3}>
            <div className="mt-8 flex items-center justify-center gap-4">
              <a
                href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}&hashtags=sitWHM`}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-gray-300 transition-all hover:border-syntax-cyan/30 hover:bg-syntax-cyan/10 hover:text-white"
              >
                <RiTwitterXFill className="h-5 w-5" />
                Share on X
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-gray-300 transition-all hover:border-syntax-cyan/30 hover:bg-syntax-cyan/10 hover:text-white"
              >
                <RiLinkedinBoxFill className="h-5 w-5" />
                Share on LinkedIn
              </a>
            </div>
          </FadeDiv>
        </FadeContainer>
      </div>
    </section>
  )
}
