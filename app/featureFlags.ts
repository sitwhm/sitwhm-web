/**
 * Feature flags for the SITWHM website
 *
 * Toggle between different page modes
 */

export const featureFlags = {
  /**
   * Page mode options:
   * - 'recap':   Post-event. Talks, slides, photos, next edition, coverage.
   * - 'full':    Complete event page with all sections (the live-event mode)
   * - 'teaser':  Minimal light "Save the Date" teaser
   * - 'mystery': Premium dark mode with countdown and reveal effects
   *
   * The year rolls like this: mystery → teaser → full → recap → mystery.
   */
  pageMode: 'recap' as 'recap' | 'full' | 'teaser' | 'mystery',

  /**
   * Tito registration integration mode:
   * - 'a': Inline embedded widget - ticket list renders directly on the page,
   *        styled with brand CSS. Best if you want full visual control over
   *        the ticket selection UI.
   * - 'b': Popup button - a CTA button opens Tito's overlay on click.
   *        Simplest option; Tito handles all checkout UI in its own overlay.
   */
  titoMode: 'b' as 'a' | 'b',

  /**
   * How the posts in "What people wrote" are shown.
   *
   * - 'direct':        LinkedIn's embed loads with the page, so visitors see
   *                    the actual posts straight away. This contacts LinkedIn
   *                    on every page view and sets their cookies, which for a
   *                    German site means a consent banner is expected.
   * - 'click-to-load': the post loads only when someone asks for it. No
   *                    third-party request until then, and no banner needed.
   */
  linkedinEmbeds: 'direct' as 'direct' | 'click-to-load',
}
