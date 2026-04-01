import { featureFlags } from "./featureFlags"
import { Hero } from "@/components/sections/Hero"
import { About } from "@/components/sections/About"
import { CallForSpeakersV3 as CallForSpeakers } from "@/components/sections/CallForSpeakersV3"
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
      <CallForSpeakers />
      <Agenda />
      <FridayProgram />
      <Registration />
      <Location />
      <Sponsors />
      <Speakers />
      <Organizers />
      <FAQ />
      <Hashtag />
    </main>
  )
}
