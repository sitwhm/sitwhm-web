# Design Prompt - SAP Inside Track Weinheim (sitWHM)

## 🎯 How to Recreate This Design

Use this prompt with Claude or any AI assistant to recreate this exact design:

---

## Prompt Template

```
Create a minimal dark mode "Save the Date" page for SAP Inside Track Weinheim (sitWHM) 2026.

Design Requirements:
- Pure black background (#000000)
- Bold minimalist typography (Swiss style)
- NO gradients, NO glows, NO AI-shiny effects
- Massive heading text (144px on desktop)
- Simple countdown timer (just numbers, no cards)
- Underline hover states (no buttons with backgrounds)
- 2% opacity grid pattern background (barely visible)
- Monochrome only (black and white)
- Generous negative space

Typography:
- Font: Geist Sans (or Inter as fallback)
- Hero: 9xl (144px) → 8xl (96px) → 7xl (72px) responsive
- Weight: 700 (bold)
- Line-height: 0.9 (very tight)
- Tracking: -0.025em (tight)

Layout Structure:
1. Fixed navbar (black, white border bottom, minimal)
2. Hero section:
   - "Save the Date - 19th September" (one line, uppercase, small)
   - "SAP Inside Track Weinheim" (bold text, 60px - main hero, one line)
   - "#sitWHM" (medium text, 30px, 60% opacity - hashtag)
   - "2026" (light subtitle, 40% opacity)
   - Days count: "243 Days to Go" (static calculation, not live counter)
   - Event details: "September 19th, 2026 · Weinheim"
   - CTA: "Get Notified" (underline link)
3. Form section:
   - "Join Waitlist" heading (underline accent)
   - Email input (underline style, no border)
   - GDPR checkbox (white border square)
   - Submit button (white bg, black text, inverts on hover)
4. Footer (black, white border top, legal links)

Colors:
- Background: #000000
- Text: #FFFFFF
- Muted text: rgba(255,255,255,0.4)
- Borders: rgba(255,255,255,0.1)
- Grid: rgba(255,255,255,0.02)

Animations:
- Subtle fade-in only (700ms duration)
- 2px translate (not 8px)
- 200ms stagger delays
- Respect prefers-reduced-motion

Style References:
- Apple product launch pages
- Brutalist minimalism
- Swiss typography
- High-end fashion websites
- NOT: Glassmorphism, gradients, glows, AI landing pages

Tech Stack:
- Next.js 14+ with App Router
- Tailwind CSS
- TypeScript
- React hooks for countdown
```

---

## 🎨 Exact Design Specifications

### Typography Scale

```css
/* Hero Title */
.hero-title {
  font-size: clamp(4.5rem, 12vw, 9rem); /* 72px → 144px */
  font-weight: 700;
  line-height: 0.9;
  letter-spacing: -0.025em;
  color: #FFFFFF;
}

/* Subtitle */
.subtitle {
  font-size: 1.125rem; /* 18px */
  font-weight: 300;
  color: rgba(255,255,255,0.4);
}

/* Countdown Numbers */
.countdown-number {
  font-size: clamp(3rem, 6vw, 3.75rem); /* 48px → 60px */
  font-weight: 300;
  font-variant-numeric: tabular-nums;
}

/* Countdown Labels */
.countdown-label {
  font-size: 0.75rem; /* 12px */
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgba(255,255,255,0.4);
}
```

### Color Palette

```typescript
const colors = {
  background: '#000000',      // Pure black
  text: '#FFFFFF',            // Pure white
  textMuted: 'rgba(255,255,255,0.4)',  // 40% white
  border: 'rgba(255,255,255,0.1)',     // 10% white
  grid: 'rgba(255,255,255,0.02)',      // 2% white
}
```

### Spacing System

```typescript
const spacing = {
  section: '6rem',       // 96px - py-24
  large: '4rem',         // 64px - mb-16
  medium: '3rem',        // 48px - mb-12
  small: '2rem',         // 32px - mb-8
  tiny: '1rem',          // 16px - mb-4
}
```

### Component Architecture

```
HeroRefined.tsx
├── Background Layer (black + 2% grid)
├── Content Container (centered, flex column)
│   ├── Badge ("Save the Date" with underline)
│   ├── Title Section
│   │   ├── Main Title ("SIT" / "Weinheim")
│   │   └── Year ("2026")
│   ├── Countdown
│   │   └── Three columns (Days, Hours, Min)
│   ├── Event Details (date · location)
│   └── CTA (underline link)

NotifyMeRefined.tsx
├── Background (pure black)
├── Content Container (max-w-2xl)
│   ├── Heading ("Join Waitlist" with underline)
│   ├── Description
│   ├── Form
│   │   ├── Email Input (underline style)
│   │   ├── GDPR Checkbox
│   │   └── Submit Button
│   └── Success State
```

### Animation Specifications

```typescript
const animations = {
  duration: 700,        // ms - slower, more refined
  easing: 'ease',       // Default ease
  stagger: 200,         // ms between elements
  translate: '0.5rem',  // 8px = 0.5rem (2px feels too subtle)

  sequence: [
    { delay: 0,    element: 'badge' },
    { delay: 200,  element: 'title' },
    { delay: 400,  element: 'year' },
    { delay: 600,  element: 'countdown' },
    { delay: 800,  element: 'details' },
    { delay: 1000, element: 'cta' },
  ]
}
```

## 📝 Key Design Principles

### 1. No AI Shininess

**Avoid:**
- Gradient backgrounds
- Glowing effects (box-shadow with color)
- Glass morphism (backdrop-filter)
- Animated gradients
- Multiple blur layers
- Rounded corners everywhere
- Colorful accents

**Use Instead:**
- Solid colors
- Simple borders
- Subtle opacity changes
- Sharp corners (or very subtle rounding)
- Monochrome palette
- Underline interactions

### 2. Swiss Minimalism

**Characteristics:**
- Lots of white (negative) space
- Grid-based layouts
- Sans-serif typography
- High contrast (black/white)
- Functional, not decorative
- Asymmetric balance
- Mathematical precision

### 3. Brutalist Touches

**Elements:**
- Raw, unpolished edges
- High contrast
- Bold typography
- Minimal decoration
- Functional first
- Honest materials (no fake depth)

## 🔧 Implementation Details

### Countdown Timer Logic

```typescript
// Update every minute (not every second - saves performance)
const updateCountdown = () => {
  const now = new Date().getTime()
  const target = new Date('2026-09-19T09:00:00+02:00').getTime()
  const distance = target - now

  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
  }
}

// Update every 60 seconds
setInterval(updateCountdown, 60000)
```

### Background Grid Pattern

```css
background-image:
  linear-gradient(to right, white 1px, transparent 1px),
  linear-gradient(to bottom, white 1px, transparent 1px);
background-size: 100px 100px;
opacity: 0.02; /* Barely visible */
```

### Underline Hover Effect

```css
.underline-link {
  border-bottom: 2px solid white;
  transition: all 200ms ease;
}

.underline-link:hover {
  border-color: rgba(255,255,255,0.4);
  color: rgba(255,255,255,0.6);
}
```

### Form Input Styling

```css
.minimal-input {
  background: transparent;
  border: none;
  border-bottom: 2px solid rgba(255,255,255,0.2);
  color: white;
  padding: 0.75rem 0;
  transition: border-color 200ms;
}

.minimal-input:focus {
  border-color: white;
  outline: none;
}
```

## 📱 Responsive Breakpoints

```typescript
const breakpoints = {
  mobile: '375px',   // Small phones
  tablet: '768px',   // Tablets
  desktop: '1024px', // Laptops
  wide: '1440px',    // Large displays
}

// Typography scales down
const titleSizes = {
  mobile: '7xl',   // 72px
  tablet: '8xl',   // 96px
  desktop: '9xl',  // 144px
}

const countdownSizes = {
  mobile: '5xl',   // 48px
  tablet: '6xl',   // 60px
  desktop: '6xl',  // 60px
}
```

## 🎯 Brand Guidelines - sitWHM

### Official Name
**Full:** SAP Inside Track Weinheim
**Short:** sitWHM
**Year:** 2026

### Event Details
- **Date:** September 19th, 2026
- **Time:** 9:00 AM - 6:00 PM
- **Location:** Weinheim, Germany
- **Venue:** Syntax Auditorium
- **Capacity:** 150 attendees
- **Price:** Free

### Tone of Voice
- Professional but approachable
- Tech-focused but not exclusive
- Community-driven
- Innovative and forward-thinking
- Not corporate or stuffy

### Typography Usage
```
"#sitWHM" - Primary branding (with hashtag for social media)
"SAP Inside Track Weinheim" - Full explanatory name
"sitWHM 2026" - Alternative short form with year
```

## 📦 Complete File Structure

```
app/
├── featureFlags.ts              # pageMode: 'mystery'
├── layout.tsx                   # Conditional nav/footer
├── page.tsx                     # Conditional content
└── siteConfig.ts               # Event details

components/
├── sections/
│   ├── HeroRefined.tsx         # Minimal dark hero
│   └── NotifyMeRefined.tsx     # Minimal dark form
├── layout/
│   ├── NavbarRefined.tsx       # Minimal navbar
│   └── FooterRefined.tsx       # Minimal footer
└── Fade.tsx                    # Animation wrapper

styles/
└── globals.css                 # Base styles

Documentation/
├── DESIGN_PROMPT.md           # This file
├── README_FINAL.md            # Implementation summary
├── GOOGLE_FORMS_SETUP.md      # Email setup
└── LEGAL_COMPLIANCE_SUMMARY.md # GDPR guide
```

## 🚀 Quick Recreation Steps

1. **Copy the prompt** from the "Prompt Template" section above
2. **Paste to Claude** or your AI assistant
3. **Specify:** Next.js 14+, Tailwind CSS, TypeScript
4. **Provide:** Event details (date, location, name)
5. **Review:** Check for AI shininess and remove it
6. **Refine:** Add more negative space if needed

## ✅ Design Validation Checklist

Before calling it "done", verify:

- [ ] Pure black background (#000000)
- [ ] No gradients anywhere
- [ ] No glowing effects
- [ ] No glass morphism
- [ ] Typography is massive (9xl on desktop)
- [ ] Only black and white colors
- [ ] Countdown shows numbers only (no cards)
- [ ] Hover states use underlines (not fills)
- [ ] Grid pattern is 2% opacity (barely visible)
- [ ] Generous white space (padding/margins)
- [ ] Animations are subtle (fade only)
- [ ] Works on mobile (responsive)
- [ ] Respects prefers-reduced-motion

## 🎨 Visual Reference Keywords

When describing the design, use these terms:

**YES:**
- Swiss minimalism
- Brutalist
- High contrast
- Typographic hierarchy
- Negative space
- Monochrome
- Bold and minimal
- Clean lines
- Functional design
- Understated elegance

**NO:**
- Glassmorphism
- Gradients
- Glowing
- Colorful
- Playful
- Frosted
- Soft
- Rounded
- Decorative
- Shiny

## 📸 Design Snapshot

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  #sitWHM                        Notify Me
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━



       Save the Date - 19th September


       SAP Inside Track Weinheim

               #sitWHM

                 2026



                 243
              Days to Go


   September 19th, 2026 · Weinheim


            Get Notified
            ─────────────



━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## 💾 Save This Prompt

**Location:** Keep this file in project root as `DESIGN_PROMPT.md`

**When to use:**
- Starting a new project
- Recreating the design elsewhere
- Briefing a designer
- AI-generating similar pages

**Pro tip:** Include screenshots alongside this prompt for best results.

---

**Design System:** Swiss Minimalism + Brutalism
**Target Audience:** SAP Developers, Architects, Consultants
**Mood:** Professional, Bold, Minimal, Sophisticated
**NOT:** Shiny, Colorful, AI-generated, Generic

**Last Updated:** January 2026
