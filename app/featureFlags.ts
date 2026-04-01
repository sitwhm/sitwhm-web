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

  /**
   * Tito registration integration mode:
   * - 'a': Inline embedded widget — ticket list renders directly on the page,
   *        styled with brand CSS. Best if you want full visual control over
   *        the ticket selection UI.
   * - 'b': Popup button — a CTA button opens Tito's overlay on click.
   *        Simplest option; Tito handles all checkout UI in its own overlay.
   */
  titoMode: 'b' as 'a' | 'b',
}
