import { CoveragePost } from "@/lib/types"

/**
 * Community coverage: hand-picked, never scraped.
 *
 * Each entry renders as LinkedIn's own embed, so visitors read the author's
 * actual post with their name and picture, served by LinkedIn, plus a link to
 * the full post. We write nothing about the posts ourselves and we never copy
 * anyone's text onto our pages.
 *
 * Listed in the order they appear here, oldest first, taken from the LinkedIn
 * post ids, which increase over time.
 *
 * Two things to know if you add more:
 *
 *  1. Strip the query string from the `url`. The share links LinkedIn hands
 *     you carry `utm_*` parameters and an `rcm=` value, and that last one
 *     identifies the member whose share produced the link. Publishing it would
 *     put that identifier on every visitor's screen.
 *  2. `linkedinEmbedUrn` comes from the URL itself: a URL containing
 *     `-share-1234` becomes `urn:li:share:1234`, one containing
 *     `-ugcPost-1234` becomes `urn:li:ugcPost:1234`. The post's "..." menu
 *     offers "Embed this post", which gives the same thing. Without it the
 *     card falls back to a plain link.
 */
export const coverage: CoveragePost[] = [
  {
    id: "madhusudhanan-perumalswamy",
    author: "Madhusudhanan Perumalswamy",
    platform: "linkedin",
    url: "https://www.linkedin.com/posts/madhusudhananp_sitwhm-sapcommunity-share-7507119409983864832-SMWR/",
    linkedinEmbedUrn: "urn:li:share:7507119409983864832",
  },
  {
    // TODO(max): read this one before it goes live. It is not a recap. It is
    // about people registering for a free community event and then not
    // turning up, and the catering that went to waste as a result. Honest
    // community feedback, and arguably worth showing, but whether it belongs
    // on the event's own recap page is your call. Delete this entry if not.
    id: "holger-bruchelt",
    author: "Holger Bruchelt",
    authorRole: "Principal Product Manager, Microsoft",
    platform: "linkedin",
    url: "https://www.linkedin.com/posts/holger-bruchelt_sitwhm-sapcommunity-ugcPost-7507124379412066304-018m/",
    linkedinEmbedUrn: "urn:li:ugcPost:7507124379412066304",
  },
  {
    id: "nil-peksen",
    author: "Nil Peksen",
    platform: "linkedin",
    url: "https://www.linkedin.com/posts/nilpeksen_sitwhm-sapcommunity-sapinsidetrack-ugcPost-7507153362383994880-uwXO/",
    linkedinEmbedUrn: "urn:li:ugcPost:7507153362383994880",
  },
  {
    id: "anne-kathrine-petteroe",
    author: "Anne Kathrine Petterøe",
    platform: "linkedin",
    url: "https://www.linkedin.com/posts/akpetteroe_sapcommunity-sapinsidetrack-sitwhm-ugcPost-7507434190062354432-2azY/",
    linkedinEmbedUrn: "urn:li:ugcPost:7507434190062354432",
  },
  {
    id: "christian-lechner",
    author: "Christian Lechner",
    authorRole: "Product Manager, BTP Platform Automation, SAP",
    platform: "linkedin",
    url: "https://www.linkedin.com/posts/christian-lechner-inthecloud_sitwhm-share-7507683156033110016-5rKD/",
    linkedinEmbedUrn: "urn:li:share:7507683156033110016",
  },
]
