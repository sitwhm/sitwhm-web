# sitWHM 2026 - SAP Inside Track Weinheim

Minimal dark mode "Save the Date" website for SAP Inside Track Weinheim 2026.

## 🎨 Design

**Style:** Swiss Minimalism + Brutalism  
**Colors:** Pure black & white (monochrome)  
**Typography:** Geist Sans, bold, massive scale (144px hero)  
**Vibe:** Professional, bold, minimal, sophisticated

**NOT:** AI-shiny, gradients, glows, glassmorphism, colorful

## 🚀 Quick Start

```bash
# Install
npm install

# Develop
npm run dev

# Build
npm run build

# Deploy
vercel deploy --prod
```

## 📁 Important Files

```
DESIGN_PROMPT.md              ← How to recreate this design
QUICK_START.md                ← 20-minute launch guide
GOOGLE_FORMS_SETUP.md         ← Email notification setup
LEGAL_COMPLIANCE_SUMMARY.md   ← GDPR compliance guide
README_FINAL.md               ← Implementation details
```

## 🎯 Three Modes Available

Edit `app/featureFlags.ts`:

```typescript
export const featureFlags = {
  pageMode: 'mystery'  // or 'teaser' or 'full'
}
```

| Mode | Style | Use When |
|------|-------|----------|
| **mystery** (current) | Minimal dark + countdown | Build hype (6+ months out) |
| **teaser** | Light & clean | Simple announcement |
| **full** | Comprehensive | All details ready |

## ✅ Before Launch

1. **Fill your information** in:
   - `app/imprint/page.tsx`
   - `app/privacy/page.tsx`

2. **Set up Google Form**:
   - Create form at forms.google.com
   - Update URLs in `components/sections/NotifyMeRefined.tsx`
   - See `GOOGLE_FORMS_SETUP.md` for details

3. **Test everything**:
   - Form submission works
   - Countdown shows correctly
   - Mobile responsive
   - All links work

## 🎨 Design Details

### Current Page Structure

```
━━━━━━━━━━━━━━━━━━━━━━━━━
  sitWHM 2026    Notify Me
━━━━━━━━━━━━━━━━━━━━━━━━━

      Save the Date

         sitWHM

          2026

    243  ·  15  ·  42
   Days   Hours   Min

Sept 19, 2026 · Weinheim

      Get Notified
      ─────────────

━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Key Features

- ✅ Pure black background (#000000)
- ✅ Massive typography (144px heading)
- ✅ Live countdown timer
- ✅ Minimal design (no AI shininess)
- ✅ GDPR-compliant email form
- ✅ Mobile responsive
- ✅ Accessible (WCAG AA)

## 📖 Documentation

**Design & Recreation:**
- `DESIGN_PROMPT.md` - Complete design specification & prompting guide

**Setup & Launch:**
- `QUICK_START.md` - Launch in 20 minutes
- `GOOGLE_FORMS_SETUP.md` - Email form setup
- `YOUR_INFO_TEMPLATE.md` - Fill-in template

**Legal Compliance:**
- `LEGAL_COMPLIANCE_SUMMARY.md` - GDPR compliance overview
- `app/imprint/page.tsx` - German Impressum
- `app/privacy/page.tsx` - Privacy policy

**Technical Details:**
- `README_FINAL.md` - Implementation summary
- `MODE_SELECTOR.md` - Comparison of all modes
- `MYSTERY_MODE.md` - Dark mode guide

## 🔧 Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **Font:** Geist Sans
- **Icons:** Remix Icons
- **Forms:** Google Forms (GDPR-compliant)

## 🎯 Event Details

- **Name:** SAP Inside Track Weinheim (sitWHM)
- **Date:** September 19th, 2026
- **Time:** 9:00 AM - 6:00 PM
- **Location:** Weinheim, Germany
- **Venue:** Syntax Auditorium
- **Capacity:** 150 attendees
- **Price:** Free

## ⚖️ Legal Compliance

✅ **GDPR Compliant:**
- Explicit consent checkbox
- Privacy policy with data processor disclosure
- User rights documented
- Google Forms integration disclosed

✅ **German TMG Compliant:**
- Complete Impressum
- Contact information
- Liability disclaimers

See `LEGAL_COMPLIANCE_SUMMARY.md` for details.

## 🚀 Deployment

**Production:** GitHub Pages at https://sitwhm.de (custom domain, HTTPS enforced)

- Source: GitHub Actions workflow (`.github/workflows/nextjs.yml`)
- Trigger: push to `main` on `sitwhm/sitwhm-web`
- Build: `npm ci && next build` → static export in `out/`
- Custom domain set via Settings → Pages (also pinned by `public/CNAME`)

**Staging:** GitLab Pages (`.gitlab-ci.yml` included)

### HTTPS / TLS certificate

GitHub Pages issues and **auto-renews** the certificate via Let's Encrypt (~30 days before the 90-day expiry). No manual action needed as long as:

- DNS A records for `sitwhm.de` stay on GitHub Pages IPs (`185.199.108-111.153`)
- Domain remains "verified" in repo Settings → Pages
- "Enforce HTTPS" stays enabled

If auto-renew ever fails: remove and re-add the custom domain in Settings → Pages to trigger a fresh cert request. Let's Encrypt certs cannot be extended beyond 90 days, and GitHub Pages does not support uploading custom certificates.

## 📝 Quick Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run linter
```

## 🎨 Color Palette

```css
--background: #000000;           /* Pure black */
--text: #FFFFFF;                 /* Pure white */
--text-muted: rgba(255,255,255,0.4);   /* 40% white */
--border: rgba(255,255,255,0.1);       /* 10% white */
--grid: rgba(255,255,255,0.02);        /* 2% white */
```

## 📱 Responsive

Tested at:
- Mobile: 375px
- Tablet: 768px
- Desktop: 1024px
- Wide: 1440px+

## ♿ Accessibility

- WCAG 2.1 AA compliant
- 21:1 contrast ratio (white on black)
- Keyboard navigation
- Screen reader friendly
- Respects `prefers-reduced-motion`

## 🤝 Contributing

This is an event website. For design changes:
1. Review `DESIGN_PROMPT.md` for design principles
2. Keep it minimal (no AI shininess)
3. Test on real devices
4. Maintain GDPR compliance

## 📄 License

Private event website - All rights reserved.

## 🆘 Support

**Questions?**
- Design: See `DESIGN_PROMPT.md`
- Setup: See `QUICK_START.md`
- Legal: See `LEGAL_COMPLIANCE_SUMMARY.md`
- Forms: See `GOOGLE_FORMS_SETUP.md`

---

**Built with:** ❤️ + Swiss Minimalism + Brutalism

**Design Inspiration:** Apple launches, high-end fashion sites, brutalist portfolios

**NOT Inspired By:** Generic AI landing pages, glassmorphism, gradient madness

---

sitWHM 2026 - A SAP Community Event
