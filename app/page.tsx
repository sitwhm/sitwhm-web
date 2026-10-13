import { featureFlags } from "./featureFlags"
import { Hero } from "@/components/sections/Hero"
import { About } from "@/components/sections/About"
import { Agenda } from "@/components/sections/Agenda"
import { FridayProgram } from "@/components/sections/FridayProgram"
import { Registration } from "@/components/sections/Registration"
import { Location } from "@/components/sections/Location"
import { Sponsors } from "@/components/sections/Sponsors"
import { Speakers } from "@/components/sections/Speakers"
import { Organizers } from "@/components/sections/Organizers"
import { FAQ } from "@/components/sections/FAQ"
import { Hashtag } from "@/components/sections/Hashtag"
import { HeroTeaser } from "@/components/sections/HeroTeaser"
import { NotifyMe } from "@/components/sections/NotifyMe"
import { HeroRefined } from "@/components/sections/HeroRefined"
import { NotifyMeRefined } from "@/components/sections/NotifyMeRefined"
import { AboutSitWHM } from "@/components/sections/AboutSitWHM"
import { RecapHero } from "@/components/sections/RecapHero"
import { Recordings } from "@/components/sections/Recordings"
import { EventPhotos } from "@/components/sections/EventPhotos"
import { NextEdition } from "@/components/sections/NextEdition"
import { Coverage } from "@/components/sections/Coverage"
import { AnnouncementBar } from "@/components/sections/AnnouncementBar"

export default function Home() {
  // Recap mode: the post-event site. Everything the visitor came for is on
  // this one page: recordings, slides, photos, next year, coverage. The
  // deeper 2026 detail (agenda, speakers) lives at /2026/.
  if (featureFlags.pageMode === 'recap') {
    return (
      <main className="relative">
        {/* 2027 leads: the announcement bar sits above everything, and the
            sponsor pitch is the first full section rather than the last. The
            recap material stays one short scroll away and is linked from the
            hero chips, so nothing is buried. */}
        <AnnouncementBar />
        <RecapHero />
        <NextEdition />
        <Recordings />
        <EventPhotos />
        <Coverage />
      </main>
    )
  }

  // Mystery mode: Minimal dark teaser with countdown
  if (featureFlags.pageMode === 'mystery') {
    return (
      <main className="relative">
        <HeroRefined />
        <AboutSitWHM />
        <NotifyMeRefined />
      </main>
    )
  }

  // Teaser mode: Minimal light "Save the Date" page
  if (featureFlags.pageMode === 'teaser') {
    return (
      <main className="relative">
        <HeroTeaser />
        <NotifyMe />
      </main>
    )
  }

  // Full mode: Show complete event page
  return (
    <main className="relative">
      <Hero />
      <About />
      <Agenda />
      <Speakers />
      <Registration />
      <FridayProgram />
      <Location />
      <Sponsors />
      <Organizers />
      <FAQ />
      <Hashtag />
    </main>
  )
}
