export const siteConfig = {
  name: "SAP Inside Track Weinheim 2026",
  shortName: "SITWHM 2026",
  url: "https://sitwhm.de",
  description: "SAP Inside Track Weinheim (#sitWHM) 2026 - Free community tech conference for SAP developers, architects, and consultants. Join us September 19, 2026 at Syntax Auditorium, Weinheim, Germany for sessions on BTP, ABAP, Fiori, AI, and more.",
  event: {
    date: "September 19th, 2026",
    time: "9:00 AM - 6:00 PM",
    venue: "Syntax Auditorium",
    city: "Weinheim an der Bergstraße",
    country: "Germany",
    capacity: 150,
  },
  registration: {
    url: "https://ti.to/sitwhm/sitwhm2026",
    titoEventId: "sitwhm/sitwhm2026",
    price: "Free",
    releases: [] as string[],
    discountCode: undefined as string | undefined,
  },
  codejam: {
    url: "https://ti.to/sitwhm/codejam-whm",
    titoEventId: "sitwhm/codejam-whm",
    infoUrl: "https://community.sap.com/t5/sap-codejam/hands-on-with-cap-cds/ec-p/14380407",
    topic: "Hands-on with CAP CDS",
    instructor: "DJ Adams (SAP Developer Advocate)",
  },
  social: {
    github: "sitwhm/sitwhm-web",
  },
  /** Where sponsor enquiries and photo takedown requests land. */
  contactEmail: "team@sitwhm.de",
  /**
   * Reused for "notify me about the next edition". Same form as the 2026
   * signup, one less thing to maintain.
   */
  notifyFormUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLSdvnH7H4u4xr0eg5ChBOCkpxVB620-YjLlB4DOMJJ8mJunoxQ/viewform",
}
