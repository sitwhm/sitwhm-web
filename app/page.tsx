import { Hero } from "@/components/sections/Hero"
import { About } from "@/components/sections/About"
import { Agenda } from "@/components/sections/Agenda"
import { Registration } from "@/components/sections/Registration"
import { Location } from "@/components/sections/Location"
import { Sponsors } from "@/components/sections/Sponsors"
import { Speakers } from "@/components/sections/Speakers"
import { Organizers } from "@/components/sections/Organizers"

export default function Home() {
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
