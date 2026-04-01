/**
 * Feature flags for the SITWHM website
 *
 * Toggle between different page modes
 */

export const featureFlags = {
  /**
   * Page mode options:
   * - 'full': Complete event page with all sections
   * - 'teaser': Minimal light "Save the Date" teaser
   * - 'mystery': Premium dark mode with countdown and reveal effects
   */
  pageMode: 'full' as 'full' | 'teaser' | 'mystery',
} as const
