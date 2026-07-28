import { Session } from "@/lib/types"

// Schedule for the 2026-09-19 conference.
export const sessions: Session[] = [
  {
    id: "welcome",
    time: "09:00 - 09:20",
    title: "Welcome & Kickoff",
    speaker: "Organizers",
    description: "Opening remarks and an overview of the day ahead.",
  },
  {
    id: "talk1",
    time: "09:20 - 10:00",
    title: "Local-first development with CAP Node.js - mock all the things!",
    speaker: "DJ Adams",
    speakerId: "speaker-1",
    description:
      "Today, more than ever, developer efficiency is critical. Join this session to learn of the local-first development affordances that CAP has to offer, for tight dev loops that include data, auth, messaging and remote services.",
  },
  {
    id: "break1",
    time: "10:00 - 10:30",
    title: "Coffee Break",
    speaker: "Networking",
    description: "Grab a coffee and connect with fellow attendees.",
    isBreak: true,
  },
  {
    id: "talk2",
    time: "10:30 - 11:10",
    title: "Platform Engineering on BTP - Make the Life of your Developers easier",
    speaker: "Christian Lechner",
    speakerId: "speaker-4",
    description:
      "What is the main goal of developers? Creating apps that solve business problems. Their job is not wrapping their head around SAP BTP platform topics like setting up services. How can platform teams help here?\n\nIn this talk I will present you an answer to this question, showing you in code how such a setup on SAP BTP could look like using Terraform and Terramate.",
  },
  {
    id: "talk3",
    time: "11:20 - 12:00",
    title: "CAP Best Practices and AI → A Perfect Match",
    speaker: "Daniel Hutzel & Sebastian van Syckel",
    speakerId: ["speaker-8", "speaker-7"],
    description:
      "AI is the biggest paradigm shift of our era — and it fundamentally changes how we build and use enterprise software. It boosts everything we do, good and bad practices alike.\n\nThis talk explores the latest CAP evolutions, like CAP-level MCP, Agents, Embeddings, LLM integration, that greatly accelerate building AI-powered applications. Furthermore, we'll show how the timeless design principles promoted by CAP are uniquely suited to AI-assisted development of enterprise applications, amplifying proven best practices, not bad ones.",
  },
  {
    id: "lunch",
    time: "12:00 - 13:10",
    title: "Lunch & Networking",
    speaker: "Everyone",
    description: "Enjoy a catered lunch and connect with speakers and attendees.",
    isBreak: true,
  },
  {
    id: "talk4",
    time: "13:10 - 13:50",
    title: "Are you pondering what I'm pondering? Bringing SAP AI and Microsoft AI together",
    speaker: "Holger Bruchelt",
    speakerId: "speaker-2",
    description:
      "SAP and Microsoft are more intertwined than ever - and our AI stories are converging fast. This demo-driven session shows how the two platforms actually connect across three areas: security, data, and AI. We'll tour different AI use-cases that have lit up across real customer projects over the last few months - AI-assisted ABAP development, Joule & Copilot, agent-to-agent via the SAP Agent Gateway, MCP and more.",
  },
  {
    id: "talk5",
    time: "14:00 - 14:40",
    title: "CAP (Node.js) App vs. Integration Suite - an honest comparison with a real-world customer example",
    speaker: "Cedric Heisel",
    speakerId: "speaker-6",
    description:
      "Cost driver: Integration Suite. Especially for smaller companies that have to keep an eye on their budget and may just be starting their BTP journey, it is worth taking a look at alternative middleware solutions. Can a CAP app, acting as a middleware layer, be the more cost-effective option? In the era of GenAI, it pays to look behind the curtain and shift the focus back to pro-code instead of low-code. A practical example.",
  },
  {
    id: "break2",
    time: "14:40 - 15:10",
    title: "Coffee Break",
    speaker: "Networking",
    description: "Afternoon coffee break before the closing talks.",
    isBreak: true,
  },
  {
    id: "talk6",
    time: "15:10 - 15:50",
    title: "GitHub and Cloud Integration: Together at last",
    speaker: "Morten Wittrock",
    speakerId: "speaker-5",
    description:
      "Cloud Integration now supports GitHub repositories directly in the Integration Studio UI: no external tooling needed! In this session I'll discuss what this means for integration developers and demo the new features end to end. I'll close with a look at what's coming next.",
  },
  {
    id: "talk7",
    time: "16:00 - 16:40",
    title: "AI-Assisted SAP Development with MCP",
    speaker: "Marian Zeis",
    speakerId: "speaker-3",
    description:
      "AI-assisted development in SAP is moving beyond simple code completion. With MCP servers and modern AI-enabled IDEs, developers can bring more relevant context into their workflow.\n\nIn this session I will give a practical overview of what is already possible today. The focus is on realistic SAP development workflows across backend and frontend, showing how AI can support research, understanding existing code, generating ideas, and speeding up development without replacing developer judgment.",
  },
  {
    id: "talk8",
    time: "16:50 - 17:30",
    title: "The Long Arc of Enterprise Engineering",
    speaker: "Matthias Steiner",
    speakerId: "speaker-9",
    description:
      "The bar for engineering has never stayed still. Every major shift in tooling redraws it, and the current one, driven by autonomous agents, is doing exactly that: work that used to define what senior meant is increasingly handled by machines. In this session, Matthias sketches what this shift means for enterprise engineering teams today, which parts of the craft grow in importance, which fade, and how the developer role might evolve when routine work is no longer human work. A personal perspective, grounded in decades of enterprise software experience.",
  },
  {
    id: "closing",
    time: "17:30 - 18:00",
    title: "Closing, Group Photo & Sponsor/Speaker Recognition",
    speaker: "Organizers",
    description: "Wrap-up, group photo, and thanks to our sponsors and speakers.",
  },
]
