import { featureFlags } from "./featureFlags"
import { Hero } from "@/components/sections/Hero"
import { About } from "@/components/sections/About"
import { Agenda } from "@/components/sections/Agenda"
import { Registration } from "@/components/sections/Registration"
import { Location } from "@/components/sections/Location"
import { Sponsors } from "@/components/sections/Sponsors"
import { Speakers } from "@/components/sections/Speakers"
import { Organizers } from "@/components/sections/Organizers"
import { HeroTeaser } from "@/components/sections/HeroTeaser"
import { NotifyMe } from "@/components/sections/NotifyMe"
import { HeroRefined } from "@/components/sections/HeroRefined"
import { NotifyMeRefined } from "@/components/sections/NotifyMeRefined"
import { AboutSitWHM } from "@/components/sections/AboutSitWHM"

export default function Home() {
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
      <Registration />
      <Location />
      <Sponsors />
      <Speakers />
      <Organizers />
    </main>
  )
}
