# PLAN: Tito.io Registration Integration for SITWHM 2026

## Current State Summary

The project is a Next.js 16.1.4 app (React 19, Tailwind CSS v4, Motion for animations, Geist font). It uses a feature-flag system (`featureFlags.ts`) to switch between `mystery`, `teaser`, and `full` page modes. The `full` mode renders a `Registration` section containing a basic `TitoWidget` that manually injects the Tito V2 script via `document.createElement`. The existing widget lacks TypeScript declarations for custom elements, does not use `next/script`, has no callback support, no test mode, and no loading state.

Key files and conventions:
- **Path alias:** `@/*` maps to project root
- **Brand colors:** `syntax-blue` (#0632A0), `syntax-cyan` (#1EB4E6), `syntax-green` (#3CC85A)
- **Component patterns:** Fade animations via `FadeDiv`/`FadeContainer` from `@/components/Fade`, `Button` component with `primary`/`secondary` variants and `sm`/`md`/`lg` sizes, `cn()` utility for class merging
- **Config:** `siteConfig.registration.titoEventId` already holds `"sitwhm/2026"`
- **No `app/api/` directory** exists yet
- **No `.env` file** exists yet

---

## Option A: Improved Embedded Widget (Inline Mode + Tailwind Styling)

### What the User Sees

The Registration section displays the Tito ticket list directly on the page, styled to match the site's aesthetic (white card, Syntax brand colors, Geist font). The ticket details (name, description, price, quantity selector) render as native DOM elements that you fully control with CSS. When the user clicks "Register", Tito's checkout overlay opens (handling email, payment if applicable, and confirmation). After completion, a success animation plays inline.

### Files to Create or Modify

#### 1. Create `types/tito.d.ts` -- TypeScript declarations for Tito custom elements

This file declares the `tito-widget` JSX intrinsic element so TypeScript does not complain. It also declares the `window.tito` callback queue function.

Contents:
- Extend `JSX.IntrinsicElements` with `tito-widget` accepting `event`, `discount-code`, `releases`, `prefill`, `save-metadata-parameters` as string attributes
- Declare `interface Window { tito: (...args: any[]) => void }` on the global scope

#### 2. Rewrite `components/TitoWidget.tsx` -- Inline widget with proper Script loading

Step-by-step changes:
1. Remove the manual `document.createElement("script")` approach entirely
2. Import `Script` from `next/script` and use `strategy="lazyOnload"`
3. Set the script `src` to `https://js.tito.io/v2/with/inline/without/widget-css` (inline mode, no default widget CSS -- you provide all styling)
4. For development/testing, append `,test_mode,development_mode` to the URL based on an environment variable (see step 5 below)
5. Accept props: `eventId` (string), `discountCode?` (string), `releases?` (string[]), `testMode?` (boolean)
6. In a `useEffect`, initialize the `window.tito` callback queue and register `on:widget:loaded` and `on:registration:complete` handlers
7. On `registration:complete`, set a local state `registrationComplete` to `true` and store the `data.reference`
8. Render: if `registrationComplete` is true, show a success card (green background, checkmark icon, "You're registered!" message with the reference number) using `motion.div` for a scale+fade entrance animation
9. Otherwise, render the `<tito-widget>` element inside a styled container
10. Add a CSS block (via `<style jsx>` or a dedicated CSS file) targeting Tito's inline DOM classes: `.tito-releases`, `.tito-release`, `.tito-release-title`, `.tito-release-description`, `.tito-release-price`, `.tito-submit`, `.tito-release-quantity` -- applying Tailwind-compatible styles (rounded corners, Syntax brand colors, Geist font inheritance, proper spacing)

Key CSS targets for the inline widget (discovered from Tito's DOM structure):
```
.tito-releases          -- container for all ticket types
.tito-release           -- individual ticket card
.tito-release-title     -- ticket name
.tito-release-price     -- price display
.tito-submit            -- the "Register" button inside the widget
.tito-release-quantity  -- quantity input
```

#### 3. Modify `components/sections/Registration.tsx` -- Minor updates

- Pass `testMode` prop to `TitoWidget` based on `process.env.NEXT_PUBLIC_TITO_TEST_MODE === "true"`
- No structural changes needed; the existing card layout and "What's Included" list remain

#### 4. Modify `app/siteConfig.ts` -- Add Tito configuration fields

Add to `registration` object:
```
releases: [] as string[],    // optional: specific release slugs to show
discountCode: undefined as string | undefined,
```

#### 5. Create `.env.example` -- Document environment variables

```
# Tito Integration
NEXT_PUBLIC_TITO_TEST_MODE=true   # Set to "true" for test mode (no real registrations)
```

#### 6. Add to `app/globals.css` -- Tito inline widget style overrides

Add a section at the bottom of `globals.css` with CSS rules targeting Tito's inline DOM. This is preferable to inline `<style>` tags because it participates in Tailwind's cascade and is easier to maintain. Example rules:

```css
/* Tito Inline Widget Overrides */
.tito-releases { /* spacing, font-family: inherit */ }
.tito-release { /* rounded-lg, border, padding, hover state */ }
.tito-submit { /* bg-syntax-blue, text-white, rounded-md, hover styles matching Button component */ }
```

### Architecture Decisions

- **`next/script` with `lazyOnload`** ensures the Tito JS does not block page rendering or affect LCP. It loads after the page is interactive.
- **Inline mode without widget CSS** gives full control. The checkout overlay CSS is intentionally left intact (stripping it risks breaking the payment flow).
- **CSS in globals.css** rather than CSS-in-JS because the Tito widget injects DOM after hydration; Tailwind utility classes cannot be applied to elements you do not render. Global CSS selectors are the correct approach here.
- **TypeScript declarations in a separate file** (`types/tito.d.ts`) keeps the component clean and is reusable if `tito-button` is added later.

### Testing Approach

1. **Test mode:** Set `NEXT_PUBLIC_TITO_TEST_MODE=true` in `.env.local`. Append `test_mode` to the Tito script URL. This creates test registrations that do not count toward the event and do not send real confirmation emails.
2. **Development mode:** Also append `development_mode` when running `next dev` on `localhost` (HTTP). Tito V2 normally requires HTTPS; `development_mode` bypasses this.
3. **Manual testing:** Verify the widget loads, ticket list renders with custom styles, quantity selector works, "Register" button opens the checkout overlay, and completing checkout triggers the `on:registration:complete` callback and shows the success state.
4. **Edge cases:** Test with zero releases published (widget should show "No tickets available"), test with discount codes, test on mobile viewports.

### Estimated Complexity

**Low-Medium.** The main work is CSS styling of the inline Tito DOM. The component logic is straightforward. Expect 2-4 hours including CSS polish and testing.

---

## Option B: Popup Button (Anchor Link Approach)

### What the User Sees

A prominent "Register Now -- It's Free!" button appears in up to three locations: (1) the Hero section alongside the existing "View Agenda" button, (2) the Registration section replacing the embedded widget, and (3) the Navbar's "Register" button. Clicking any of these opens Tito's overlay, which handles the entire flow (ticket selection, checkout, confirmation). The user stays on sitwhm.com at all times.

### Files to Create or Modify

#### 1. Create `types/tito.d.ts` -- TypeScript declarations (same as Option A)

Declare `tito-button` custom element in addition to `tito-widget` (for completeness), and the `window.tito` callback queue.

#### 2. Create `components/TitoPopup.tsx` -- Tito script loader + callback handler

This is a thin "provider" component that:
1. Loads the Tito V2 script via `next/script` with `strategy="lazyOnload"`. The URL is `https://js.tito.io/v2` (standard mode -- no inline needed since we are not rendering any widget on-page). Append `test_mode,development_mode` in dev.
2. Sets up the `window.tito` callback queue in a `useEffect`
3. Registers `on:registration:complete` to trigger a success toast or state update
4. Renders only the `<Script>` tag and `{children}` -- it is a wrapper, not visible UI

This component should be placed once, high in the tree. The best location is inside `app/layout.tsx`, wrapping `{children}`, but only in `full` page mode.

#### 3. Modify `components/sections/Registration.tsx` -- Replace widget with anchor link button

Step-by-step:
1. Remove the `TitoWidget` import and `<TitoWidget>` usage
2. Replace it with a styled anchor link:
   ```tsx
   <a
     href={`#/tito/${siteConfig.registration.titoEventId}/en/registrations/new`}
     className={cn(/* Button large primary styles */)}
   >
     Register Now -- It's Free!
   </a>
   ```
3. Use the same styling as the `Button` component's `primary` + `lg` variant (copy the class string or refactor `Button` to accept `as="a"` -- see architecture decisions below)
4. Keep the "What's Included" list and "Code of Conduct" note

#### 4. Modify `components/sections/Hero.tsx` -- Add Tito popup trigger to CTA

Change the existing "Register for Free" button from `<a href="#registration">` (which scrolls to the section) to `<a href="#/tito/sitwhm/2026/en/registrations/new">` (which opens the Tito overlay directly). This eliminates one click from the conversion funnel.

Alternatively, keep the scroll-to-section behavior and only use the direct Tito link in the Registration section. This is a UX decision for the site owner.

#### 5. Modify `components/layout/Navbar.tsx` -- Optional: direct Tito trigger from navbar

The navbar "Register" button currently links to `#registration`. You could change it to `#/tito/sitwhm/2026/en/registrations/new` so it opens the overlay directly from any scroll position. Same for the mobile menu button.

#### 6. Modify `app/layout.tsx` -- Add TitoPopup provider

In the `full` page mode branch (or unconditionally), add the `TitoPopup` component wrapping `{children}`. This ensures the Tito script is loaded once regardless of which anchor link the user clicks.

```tsx
import { TitoPopup } from "@/components/TitoPopup"

// In the body:
<TitoPopup>
  {children}
</TitoPopup>
```

#### 7. Create `.env.example` -- Same as Option A

### Architecture Decisions

- **Anchor link approach over `<tito-button>`:** The anchor link (`#/tito/sitwhm/2026/en/registrations/new`) is vastly simpler than the `<tito-button>` custom element. It requires zero custom element registration, zero TypeScript JSX declarations for the button element, and gives you full control over the button's appearance using your existing `Button` component or plain Tailwind classes. The Tito V2 script intercepts these hash links automatically.
- **Single script loader component:** Loading the Tito script once in the layout (rather than in each component that has a register link) prevents duplicate script loading and ensures callbacks are registered once.
- **Button component polymorphism:** Consider adding an `asChild` or `as` prop to the `Button` component so it can render as an `<a>` tag while keeping button styles. This avoids duplicating class strings. However, this is optional and can be deferred.

### Testing Approach

1. **Test mode:** Same as Option A -- append `test_mode` to script URL via env var.
2. **Manual testing:** Click each register button (Hero, Registration section, Navbar) and verify the Tito overlay opens. Complete a test registration and verify the callback fires.
3. **Hash navigation:** Verify that direct URL access with the `#/tito/...` fragment opens the overlay on page load (Tito V2 supports this).
4. **Mobile:** Test the overlay on mobile viewports -- Tito's overlay is responsive by default.

### Estimated Complexity

**Low.** This is the simplest option. The main work is wiring up the anchor links and placing the script loader. Expect 1-2 hours.

---

## Option C: Custom API Form (Server-Side Tito Admin API)

### What the User Sees

A fully custom registration form rendered natively on the page: name field, email field, and a "Register for Free" submit button, all styled with Tailwind and animated with Motion. On submission, a loading spinner appears. On success, the form transitions to a celebratory confirmation card with the registration reference number. On error, an inline error message appears with a retry option. No Tito UI is ever visible.

### Files to Create or Modify

#### 1. Create `app/api/register/route.ts` -- Server-side API route

This is a Next.js Route Handler that:
1. Accepts POST with JSON body: `{ name: string, email: string }`
2. Validates inputs server-side (non-empty name, valid email format)
3. Calls the Tito Admin API: `POST https://api.tito.io/v3/sitwhm/2026/registrations`
4. Uses `Authorization: Token token=${process.env.TITO_API_TOKEN}` header (never exposed to client)
5. Sends the registration payload with `notify: true` so Tito sends the confirmation email
6. The `release_id` is read from `process.env.TITO_RELEASE_ID` (discovered from the Tito dashboard or by calling `GET /v3/sitwhm/2026/releases` once)
7. Returns `{ success: true, reference: string }` on success or `{ error: string }` on failure
8. Implements basic rate limiting (optional but recommended): check a simple in-memory counter or use headers

Step-by-step for the API call:
```
POST https://api.tito.io/v3/sitwhm/2026/registrations
Headers:
  Authorization: Token token=<TITO_API_TOKEN>
  Content-Type: application/json
  Accept: application/json
Body:
{
  "registration": {
    "line_items": [{ "release_id": "<TITO_RELEASE_ID>", "quantity": 1 }],
    "name": "<name>",
    "email": "<email>",
    "notify": true
  }
}
```

#### 2. Create `components/CustomRegistrationForm.tsx` -- Client-side form component

Step-by-step:
1. `"use client"` directive
2. State: `name`, `email`, `status` (idle | submitting | success | error), `reference`, `errorMessage`
3. `handleSubmit`: prevent default, set status to submitting, POST to `/api/register`, handle response
4. Render states:
   - **idle/error**: Form with name input, email input, submit button. Error message below button if status is error.
   - **submitting**: Same form but inputs disabled, button shows spinner + "Registering..."
   - **success**: Animated card (using `motion.div` with `initial={{ opacity: 0, scale: 0.95 }}` and `animate={{ opacity: 1, scale: 1 }}`) showing checkmark icon, "You're registered!" heading, reference number, and "Check your email" message
5. Styling: Use the project's existing patterns -- `rounded-lg`, `border border-gray-200`, `bg-white`, `shadow-sm`, input fields with `rounded-lg border px-4 py-3`, button matching `Button` component primary/lg styles
6. Accessibility: proper `<label>` elements, `aria-live="polite"` on the status region, `aria-busy` on form during submission

#### 3. Modify `components/sections/Registration.tsx` -- Use custom form

1. Remove `TitoWidget` import
2. Import `CustomRegistrationForm`
3. Replace `<TitoWidget eventId="sitwhm/2026" />` with `<CustomRegistrationForm />`
4. Everything else stays the same

#### 4. Create `.env.example` -- Document required secrets

```
# Tito API Integration (Option C only)
TITO_API_TOKEN=your_tito_admin_api_token_here
TITO_RELEASE_ID=your_release_id_here

# To find TITO_RELEASE_ID:
# 1. Go to https://ti.to/sitwhm/2026/admin/releases
# 2. Click on the release, note the ID from the URL or API response
# OR call: curl -H "Authorization: Token token=YOUR_TOKEN" https://api.tito.io/v3/sitwhm/2026/releases
```

#### 5. Create `app/api/register/releases/route.ts` -- Optional: helper to discover release IDs

A GET endpoint (protected or for development only) that calls `GET https://api.tito.io/v3/sitwhm/2026/releases` and returns the list. This helps the developer find the correct `TITO_RELEASE_ID` without leaving the terminal. Should be removed or auth-protected before production.

#### 6. Create `types/tito.d.ts` -- Not needed for Option C

Option C does not use any Tito client-side elements, so no custom element declarations are required.

#### 7. Modify `app/siteConfig.ts` -- No changes needed

The API route reads from environment variables, not siteConfig.

### Architecture Decisions

- **Route Handler over Server Action:** A Route Handler (`app/api/register/route.ts`) is preferred over a Server Action because it provides a clear REST endpoint, is easier to test with curl/Postman, and separates concerns cleanly. Server Actions would also work but couple the form submission to the component.
- **Server-side only API token:** The `TITO_API_TOKEN` is stored as a non-`NEXT_PUBLIC_` env var, so it is never bundled into client code. The client communicates only with `/api/register`.
- **No Tito client JS at all:** This option loads zero third-party JavaScript. Best for performance and privacy, but at the cost of implementation effort.
- **Free events only:** This approach works because the event is free. If the event ever charges, you cannot handle payment through the Admin API alone -- you would need to switch to Option A or B.

### Testing Approach

1. **Tito test mode via API:** Tito's Admin API has a test mode controlled by event settings in the dashboard (Settings > Test Mode). When enabled, registrations created via API are marked as test. Alternatively, create a separate test event (e.g., `sitwhm/2026-test`).
2. **API route testing:** Use curl or a REST client to POST to `http://localhost:3000/api/register` with test payloads. Verify correct Tito API calls by checking the Tito dashboard for new registrations.
3. **Error handling:** Test with invalid email, missing name, invalid release ID, expired/sold-out release, rate limit exceeded, and Tito API downtime (mock the fetch).
4. **End-to-end:** Fill out the form in the browser, submit, verify success state renders, and check that a confirmation email arrives (in test mode, check Tito dashboard instead).
5. **Edge cases:** Double-submit prevention (disable button during submission), duplicate email registration (Tito may return an error or allow it depending on settings).

### Estimated Complexity

**High.** Requires server-side API integration, secret management, error handling for external API failures, and thorough testing. Expect 4-8 hours including edge case handling and polish.

---

## Comparison: Quick Reference

| Aspect | Option A | Option B | Option C |
|--------|----------|----------|----------|
| Files to create | 2 | 2 | 3-4 |
| Files to modify | 3-4 | 3-5 | 2 |
| Third-party JS | Yes (~50-100KB async) | Yes (~50-100KB async) | None |
| Design control | High (ticket list) | Low (overlay only) | Total |
| Implementation time | 2-4 hours | 1-2 hours | 4-8 hours |
| Maintenance burden | Low | Very low | Medium-high |
| Works for paid events | Yes | Yes | No |
| Env vars needed | 1 optional | 1 optional | 2 required (secrets) |

---

## Shared Concerns (All Options)

### Environment Variable Pattern

Create `.env.local` (gitignored) for local development. Create `.env.example` (committed) documenting all variables. For deployment (Vercel, etc.), set env vars in the platform dashboard.

### Feature Flag Consideration

Only the `full` page mode uses the Registration section. The `teaser` and `mystery` modes do not render it. No changes are needed to `featureFlags.ts` for any option. However, if you want a registration CTA in `mystery` mode, that would require adding the Tito script loader to the mystery layout as well.

### Accessibility

All options should ensure:
- Focus management after overlay opens/closes (Tito handles this for A and B)
- Form labels and error messages are properly associated (Option C requires manual implementation)
- Color contrast meets WCAG AA (the Syntax brand blue #0632A0 on white passes AA for large text)

### Structured Data Update

The existing JSON-LD in `layout.tsx` already includes an `offers` block pointing to `siteConfig.registration.url`. No changes needed for any option. If Option B changes the Hero CTA to open the overlay directly, the `offers.url` should remain the Tito event URL as a fallback for search engines.

---

## Recommendation

**Option B (Popup Button)** is the best fit for this project because:
1. The event is free with likely one ticket type -- embedding a ticket list (Option A) adds visual clutter for a single "Free Admission" item
2. The anchor link approach requires the least code and zero custom element complexity
3. The button can be placed in the Hero for maximum conversion without scrolling
4. Tito handles all checkout complexity, email confirmation, and responsive behavior
5. Upgrading to Option A later (if multiple ticket tiers are added) requires only swapping the anchor links for a `<tito-widget>` element

If pixel-perfect branding of the ticket selection step is important, choose Option A. If you need zero third-party JavaScript and want a fully native form experience, choose Option C (but understand the maintenance trade-off).

---

### Critical Files for Implementation

- `/private/tmp/sitwhm-solar/components/TitoWidget.tsx` -- The existing widget component that gets rewritten (Option A) or replaced (Options B/C)
- `/private/tmp/sitwhm-solar/components/sections/Registration.tsx` -- The registration section that changes in all three options
- `/private/tmp/sitwhm-solar/components/sections/Hero.tsx` -- Where CTA buttons live; modified in Option B to open Tito overlay directly
- `/private/tmp/sitwhm-solar/app/layout.tsx` -- Where the Tito script loader would be placed (Option B) or left unchanged (Options A/C)
- `/private/tmp/sitwhm-solar/app/siteConfig.ts` -- Central config holding `registration.titoEventId` used across all options
