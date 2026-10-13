import { EditionStats } from "@/lib/types"

/**
 * The numbers we put in front of sponsors.
 *
 * These come from the Tito export, not from a view counter. "104 attendees
 * from 47 companies" is the sentence a sponsor's marketing lead pastes into
 * their budget justification; "our PDF got 340 views" is not.
 *
 * Every field is optional and the strip renders only what's filled in. If
 * this whole object is empty, the stats block disappears rather than showing
 * invented numbers. So leaving it as-is is a valid choice.
 *
 * TODO(max): pull the Tito CSV when you get a quiet evening and fill these in.
 */
export const stats: EditionStats = {
  // attendees: 0,
  // companies: 0,
  // talks: 8,
  // audienceNote: "mostly developers, architects and consultants",
}

// All commented out on purpose, so the block doesn't render at all.
//
// A talk count on its own isn't a sponsor argument, and a single big number
// floating under the 2027 headline looked like a 2027 figure. Fill in
// attendees and companies from the Tito export and the whole strip appears,
// clearly labelled with the year it belongs to.
