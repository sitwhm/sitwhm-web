import { FadeDiv } from "@/components/Fade"

/**
 * Shared section header.
 *
 * Matches the heading pattern the rest of the site already uses: small
 * uppercase eyebrow, large bold title, optional lede. Reuse it for any new
 * section so the page stays consistent.
 */
export function SectionHeading({
  eyebrow,
  title,
  lede,
  tone = "light",
}: {
  eyebrow: string
  title: string
  lede?: string
  tone?: "light" | "dark"
}) {
  const dark = tone === "dark"

  return (
    <div className="text-center">
      <FadeDiv>
        <p
          className={`text-sm font-medium uppercase tracking-[0.2em] ${
            dark ? "text-gray-400" : "text-syntax-blue"
          }`}
        >
          {eyebrow}
        </p>
      </FadeDiv>

      <FadeDiv delay={0.1}>
        <h2
          className={`mt-4 text-4xl font-bold tracking-tight sm:text-5xl ${
            dark ? "text-white" : "text-gray-900"
          }`}
        >
          {title}
        </h2>
      </FadeDiv>

      {lede && (
        <FadeDiv delay={0.15}>
          <p
            className={`mx-auto mt-4 max-w-2xl text-base ${
              dark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {lede}
          </p>
        </FadeDiv>
      )}
    </div>
  )
}
