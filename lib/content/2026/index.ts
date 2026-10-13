/**
 * Everything that belongs to the 2026 edition, in one import.
 *
 * Speakers, sessions and sponsors still live in lib/content/*.ts (they were
 * there before the edition split and plenty of components import them
 * directly). They're re-exported here so new code can treat 2026 as one unit,
 * and so next year's folder has an obvious shape to copy.
 */

export { talks } from "./talks"
export { coverage } from "./coverage"
export { photos, heroPhotoIds } from "./photos"
export { stats } from "./stats"

export { speakers } from "../speakers"
export { sessions } from "../agenda"
export { sponsors } from "../sponsors"

/** Used to build asset paths: /slides/2026/..., /photos/2026/... */
export const year = 2026
