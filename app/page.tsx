import { Hero } from "@/components/sections/Hero"
import { About } from "@/components/sections/About"
import { Agenda } from "@/components/sections/Agenda"
import { Registration } from "@/components/sections/Registration"
import { Location } from "@/components/sections/Location"
import { Sponsors } from "@/components/sections/Sponsors"

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <About />
      <Agenda />
      <Registration />
      <Location />
      <Sponsors />
    </main>
  )
}
