# Tito.io Integration Research for SAP Inside Track Weinheim 2026

**Event ID:** `sitwhm/2026`
**Tito URL:** `https://ti.to/sitwhm/2026`
**Research date:** April 2026

---

## Background: Tito's Integration Surface

Tito offers three distinct integration approaches, each with different trade-offs:

1. **Widget embed** (`<tito-widget>`) -- Renders the ticket list directly on the page; checkout opens in an overlay.
2. **Button popup** (`<tito-button>`) -- Renders a single button; clicking it opens the full ticket list + checkout in an overlay.
3. **Admin API + Checkout API** -- REST APIs for programmatic registration creation and custom-built flows.

Additionally, the widget supports **inline mode** (no iframe, full CSS control) and a **plugin system** for analytics and custom callbacks.

---

## Tito Widget V2 -- Capabilities Summary

### HTML Elements

| Element | Purpose |
|---------|---------|
| `<tito-widget event="account/event">` | Embeds ticket list; checkout in overlay |
| `<tito-button event="account/event">Label</tito-button>` | Button that opens overlay with ticket list |
| `<tito-events account="account">` | Lists upcoming/past events |
| `<tito-register-interest event="account/event">` | Interest registration form |

### Key Attributes (on `<tito-widget>` and `<tito-button>`)

| Attribute | Description |
|-----------|-------------|
| `event` | Required. Format: `account-slug/event-slug` |
| `releases` | Comma-separated list of release slugs to display (can show secret tickets) |
| `discount-code` | Pre-apply a discount code |
| `prefill` | JSON string to prefill name/email, e.g. `'{"name":"...","email":"..."}'` |
| `email-placeholder` | Custom placeholder for email field |
| `name-placeholder` | Custom placeholder for name field |
| `save-metadata-parameters` | Comma-separated URL params to save to registration metadata |

### Script Loading Variants

```
https://js.tito.io/v2                                          -- Standard (iframe)
https://js.tito.io/v2/with/inline                              -- Inline mode (no iframe)
https://js.tito.io/v2/with/inline/without/widget-css           -- Inline, no widget styles
https://js.tito.io/v2/with/inline/without/widget-css,checkout-css -- Inline, fully unstyled
https://js.tito.io/v2/with/ga4                                 -- With Google Analytics 4 plugin
https://js.tito.io/v2/with/test_mode                           -- Test mode for development
https://js.tito.io/v2/with/development_mode                    -- Bypass HTTPS requirement (dev only)
```

Multiple plugins can be combined: `.../v2/with/inline,ga4,test_mode`

### JavaScript Callbacks API

```js
// Queue pattern (safe before script loads)
window.tito = window.tito || function() { (tito.q = tito.q || []).push(arguments) };

// Available events:
tito('on:widget:loaded', function() { /* widget rendered */ });

tito('on:registration:started', function(data) {
  // data.slug -- order slug
  // data.line_items[] -- { release_slug, price, title, quantity, total, currency }
});

tito('on:registration:complete', function(data) {
  // data.name, data.email, data.total, data.currency
  // data.slug, data.reference
  // data.line_items[], data.tickets[]
  // data.receipt_url, data.registration_url
  // data.discount_code
});
```

### Permalink / Deep Link Support

V2 appends a `?tito=` query param, making checkout URLs shareable. You can also open the overlay via an anchor link:
```html
<a href="#/tito/sitwhm/2026/en/registrations/new">Register</a>
```

### Tito REST APIs

| API | Purpose | Auth |
|-----|---------|------|
| **Admin API** (v3.1) | Manage events, releases, registrations, discount codes | API token |
| **Checkout API** | Powers the widget's checkout flow | Public (widget) |
| **Check-in API** | Manage check-in workflow | API token |

The Admin API can create registrations programmatically (`POST`), but this requires server-side auth and is intended for admin/backend use, not public-facing registration.

---

## Three Integration Versions

---

### Version A: Improved Embedded Widget (Inline Mode + Custom Styling)

**How it works:** Uses `<tito-widget>` with the inline plugin and disabled default CSS, allowing full Tailwind styling of the ticket list. Checkout still opens in a Tito overlay (which is fine -- it handles payment securely).

**Code sketch:**

```tsx
// components/TitoWidget.tsx
"use client"

import { useEffect, useCallback } from "react"
import Script from "next/script"

interface TitoWidgetProps {
  eventId: string
  discountCode?: string
  releases?: string[]
}

// Declare custom element for TypeScript
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "tito-widget": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          event: string
          "discount-code"?: string
          releases?: string
        },
        HTMLElement
      >
    }
  }
}

export function TitoWidget({ eventId, discountCode, releases }: TitoWidgetProps) {
  useEffect(() => {
    // Set up Tito callback queue before script loads
    ;(window as any).tito =
      (window as any).tito ||
      function () {
        ;((window as any).tito.q = (window as any).tito.q || []).push(arguments)
      }

    // Listen for registration completion
    ;(window as any).tito("on:registration:complete", (data: any) => {
      console.log("Registration complete:", data.reference)
      // Could trigger confetti, analytics, or a thank-you state
    })
  }, [])

  return (
    <>
      {/* Load Tito with inline mode for full CSS control */}
      <Script
        src="https://js.tito.io/v2/with/inline"
        strategy="lazyOnload"
      />

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <tito-widget
          event={eventId}
          {...(discountCode ? { "discount-code": discountCode } : {})}
          {...(releases ? { releases: releases.join(",") } : {})}
        />
      </div>
    </>
  )
}
```

To go further with fully custom styling, use:
```
https://js.tito.io/v2/with/inline/without/widget-css
```
Then target the Tito-generated HTML classes with your own Tailwind/CSS. The widget injects real DOM elements (not an iframe), so `.tito-widget-button`, `.tito-releases`, etc. are all accessible.

**UX Pros:**
- Attendees see the ticket list directly on the page -- zero friction to browse
- Checkout overlay keeps users on sitwhm.de
- Can be styled to match the site's dark/gradient aesthetic
- Inline mode gives full CSS access -- the ticket list can look native
- Supports discount codes, prefill, and metadata attributes

**UX Cons:**
- The checkout overlay itself still has Tito's styling (you can strip checkout CSS too, but that risks breaking the payment flow)
- Widget content loads async -- there is a brief loading flash
- If there is only one free ticket type, showing a list of one item is a bit redundant

**Implementation Complexity:** Low-Medium
- Using `next/script` with `strategy="lazyOnload"` is cleaner than manual DOM manipulation
- TypeScript declarations needed for custom elements
- CSS customization of inline widget requires inspecting Tito's DOM structure

---

### Version B: Popup/Overlay Button (tito-button)

**How it works:** Instead of embedding the ticket list, renders a styled call-to-action button. Clicking it opens the full Tito registration flow (ticket selection + checkout) in an overlay. The ticket list and checkout are all handled inside the overlay.

**Code sketch:**

```tsx
// components/TitoButton.tsx
"use client"

import { useEffect } from "react"
import Script from "next/script"

interface TitoButtonProps {
  eventId: string
  label?: string
  className?: string
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "tito-button": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & { event: string },
        HTMLElement
      >
    }
  }
}

export function TitoButton({
  eventId,
  label = "Register Now -- It's Free!",
  className,
}: TitoButtonProps) {
  useEffect(() => {
    ;(window as any).tito =
      (window as any).tito ||
      function () {
        ;((window as any).tito.q = (window as any).tito.q || []).push(arguments)
      }

    ;(window as any).tito("on:registration:complete", (data: any) => {
      // Show success toast, redirect to thank-you, etc.
    })
  }, [])

  return (
    <>
      <Script src="https://js.tito.io/v2" strategy="lazyOnload" />

      <tito-button
        event={eventId}
        className={className}
      >
        {label}
      </tito-button>

      {/* Style the tito-generated button */}
      <style>{`
        .tito-widget-button {
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          color: white;
          font-weight: 600;
          font-size: 1.125rem;
          padding: 0.875rem 2.5rem;
          border-radius: 0.75rem;
          border: none;
          cursor: pointer;
          transition: transform 0.15s, box-shadow 0.15s;
          font-family: var(--font-geist-sans), system-ui, sans-serif;
        }
        .tito-widget-button:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 25px rgba(99, 102, 241, 0.3);
        }
      `}</style>
    </>
  )
}
```

**Alternative: Use a plain anchor link to trigger the overlay without needing the `<tito-button>` element at all:**

```tsx
// Just load the Tito script, then use a regular link:
<a href="#/tito/sitwhm/2026/en/registrations/new"
   className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-8 py-4 text-lg font-semibold text-white hover:bg-indigo-500 transition-colors">
  Register Now
</a>
```

This anchor approach lets you use your own button component with full Tailwind styling and no custom element weirdness.

**UX Pros:**
- Cleanest page layout -- no embedded form taking up space
- The CTA button can be placed anywhere: hero, navbar, sticky footer, multiple sections
- Overlay handles the entire flow -- attendees stay on the site
- Perfect for events with a single free ticket where showing a "list" adds no value
- The anchor link approach requires zero custom elements -- just a styled `<a>` tag

**UX Cons:**
- Attendees must click to see ticket options (extra step vs. embedded list)
- Overlay is Tito-styled (limited customization of the popup itself)
- Less "transparent" -- attendees cannot see what they are registering for until they click

**Implementation Complexity:** Low
- Simplest approach, especially with the anchor link variant
- Very little code to maintain
- No CSS customization headaches

---

### Version C: Custom Registration Form via Tito Admin API

**How it works:** Build a fully custom registration form with your own UI. On submission, a Next.js API route (or Server Action) calls the Tito Admin API to create the registration server-side. The attendee never sees any Tito UI.

**Code sketch:**

```tsx
// app/api/register/route.ts  (Next.js Route Handler)
import { NextRequest, NextResponse } from "next/server"

const TITO_API_TOKEN = process.env.TITO_API_TOKEN!
const TITO_ACCOUNT = "sitwhm"
const TITO_EVENT = "2026"

export async function POST(request: NextRequest) {
  const { name, email, releaseId } = await request.json()

  const response = await fetch(
    `https://api.tito.io/v3/${TITO_ACCOUNT}/${TITO_EVENT}/registrations`,
    {
      method: "POST",
      headers: {
        Authorization: `Token token=${TITO_API_TOKEN}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        registration: {
          line_items: [
            {
              release_id: releaseId,
              quantity: 1,
            },
          ],
          name,
          email,
          notify: true, // send confirmation email
        },
      }),
    }
  )

  if (!response.ok) {
    const error = await response.json()
    return NextResponse.json({ error }, { status: response.status })
  }

  const data = await response.json()
  return NextResponse.json({ success: true, reference: data.reference })
}
```

```tsx
// components/CustomRegistrationForm.tsx
"use client"

import { useState } from "react"
import { motion } from "motion/react"

export function CustomRegistrationForm() {
  const [state, setState] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setState("submitting")

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          releaseId: "YOUR_RELEASE_ID", // get from Tito dashboard or API
        }),
      })

      if (!res.ok) throw new Error("Registration failed")
      setState("success")
    } catch {
      setState("error")
    }
  }

  if (state === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-2xl bg-green-50 border border-green-200 p-8 text-center"
      >
        <h3 className="text-2xl font-bold text-green-800">You are registered!</h3>
        <p className="mt-2 text-green-600">Check your email for confirmation details.</p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium">Full Name</label>
        <input
          id="name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 w-full rounded-lg border px-4 py-3"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium">Email</label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 w-full rounded-lg border px-4 py-3"
        />
      </div>
      <button
        type="submit"
        disabled={state === "submitting"}
        className="w-full rounded-xl bg-indigo-600 py-4 text-lg font-semibold text-white hover:bg-indigo-500 disabled:opacity-50 transition-colors"
      >
        {state === "submitting" ? "Registering..." : "Register for Free"}
      </button>
      {state === "error" && (
        <p className="text-red-500 text-sm">Something went wrong. Please try again.</p>
      )}
    </form>
  )
}
```

**UX Pros:**
- 100% custom UI -- fully matches your site's design system (Tailwind, Geist font, motion animations)
- No third-party UI appearing at all -- completely seamless experience
- Can add custom fields, validation, conditional logic
- Can show animated success states, confetti, etc.
- Full control over the form's accessibility

**UX Cons:**
- You are responsible for handling errors, validation, edge cases
- If Tito adds features (e.g., new required question), you must update your form
- Paid events would require handling payment separately (not applicable here since the event is free)
- Attendees do not see Tito's familiar checkout flow (loss of trust signal for some)

**Implementation Complexity:** High
- Requires Tito Admin API token (stored as env var, never exposed client-side)
- Must discover the correct `release_id` for the ticket type
- Need to handle API errors, rate limits, and edge cases
- Must test thoroughly with Tito's test mode
- If the event later becomes paid, this approach breaks -- you would need to switch to widget/button

---

## Comparison Matrix

| Aspect | Version A (Embedded Widget) | Version B (Popup Button) | Version C (Custom API Form) |
|--------|---------------------------|-------------------------|---------------------------|
| **Implementation effort** | Low-Medium | Low | High |
| **Design control** | Medium-High (inline mode) | Low (overlay is Tito-styled) | Full |
| **User stays on site** | Yes (overlay for checkout) | Yes (overlay for everything) | Yes (fully native) |
| **Maintenance burden** | Low | Low | Medium-High |
| **Works for paid events** | Yes | Yes | No (without payment integration) |
| **Mobile experience** | Good (Tito handles responsive) | Good | You must handle responsive |
| **Analytics/callbacks** | Built-in support | Built-in support | Must build yourself |
| **Loading performance** | ~50-100KB Tito JS | ~50-100KB Tito JS | Zero third-party JS |
| **SEO/Core Web Vitals** | Minor LCP impact (async) | Minimal (button is tiny) | None |

---

## Recommendation

For SAP Inside Track Weinheim 2026, **Version B (Popup Button)** is the best fit, with the following reasoning:

1. **The event is free with likely one ticket type** -- there is no need to embed a ticket list showing a single "Free Admission" release. A prominent "Register Now" button is cleaner.

2. **Minimal code to maintain** -- the anchor link approach (`<a href="#/tito/sitwhm/2026/en/registrations/new">`) is literally a styled link. No custom elements, no TypeScript declarations, no CSS overrides.

3. **The button can be placed in multiple locations** -- hero section, registration section, navbar, sticky mobile bar -- giving maximum conversion opportunity.

4. **Tito handles all the complexity** -- email confirmation, ticket assignment, question collection, etc. You do not need to replicate any of this.

5. **Easy to upgrade later** -- if you want to show the ticket list embedded (e.g., you add multiple ticket tiers), you can swap to Version A with minimal changes.

**However**, if you want the registration section to feel more substantial (showing ticket details and price inline before requiring a click), **Version A with inline mode** is the better choice.

**Version C** is overkill for a free community event and introduces unnecessary maintenance burden, but it is the right choice if you absolutely need a fully branded, zero-third-party-UI experience.

---

## Questions to Answer Before Choosing

1. **How many ticket types will there be?** If just one free ticket, Version B is ideal. If multiple tiers (e.g., Speaker, Attendee, Sponsor), Version A shows them better.

2. **Do you want attendees to see a ticket list before clicking?** If yes, Version A. If a single CTA button is sufficient, Version B.

3. **How important is pixel-perfect brand matching?** If the Tito overlay's default styling is acceptable, Version B. If the ticket list must match your dark gradient aesthetic, Version A with inline mode + custom CSS.

4. **Will the event ever become paid?** Version C does not handle payments. Versions A and B handle paid events out of the box.

5. **Do you need analytics on registration events?** All versions support this, but A and B have it built in via Tito's callback API and GA4 plugin. Version C requires manual implementation.

6. **Do you want to capture custom data (e.g., T-shirt size, dietary preferences)?** Tito supports custom questions natively in A/B. For C, you'd need to handle this yourself and sync via API.

7. **Do you need a "Register Interest" form for before registration opens?** Tito provides `<tito-register-interest>` for this -- works seamlessly with A and B.

8. **Performance budget?** The Tito JS bundle is ~50-100KB loaded async. If you are strict about zero third-party JS, Version C is the only option, but it comes at significant dev cost.

---

## Useful Links

- [Tito Widget V2 Documentation](https://ti.to/docs/api/widget)
- [Tito Widget Help Center](https://help.tito.io/en/articles/2003029-widget)
- [Tito Developers Portal](https://ti.to/developers)
- [Tito Widget Plugins](https://js-plugins.tito.io/)
- [Tito Examples GitHub Repo](https://github.com/teamtito/tito-examples)
- [Tito Node.js API Client](https://github.com/teamtito/node-tito-api)
- [Tito Admin API Docs](https://ti.to/docs/api/admin)
- [Tito API Changelog](https://ti.to/docs/api/changelog)
- [Blog: JavaScript Callbacks for the Tito Widget](https://blog.tito.io/posts/javascript-callbacks-for-the-tito-widget/)
- [Blog: Getting Creative with the Tito Widget](https://blog.tito.io/posts/the-tito-ticket-widget)
- [Blog: 8 Ways We Made Our Widget Better (V2 announcement)](https://blog.tito.io/posts/widget-v2)
