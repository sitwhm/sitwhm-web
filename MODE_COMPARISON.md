# Teaser Mode vs Full Mode Comparison

## Visual Comparison

### Teaser Mode (`teaserMode: true`)

```
┌─────────────────────────────────────────────┐
│  SITWHM 2026          [Get Notified]       │  ← Simple navbar
├─────────────────────────────────────────────┤
│                                             │
│            🔔 Save the Date                 │
│                                             │
│         SAP Inside Track                    │  ← Big, bold
│         Weinheim 2026                       │     typography
│                                             │
│    📅 September 19th, 2026                  │
│    📍 Weinheim, Germany                     │
│                                             │
│    A free community conference for SAP      │
│    developers, architects, and consultants  │
│         More details coming soon            │
│                                             │
│         [Get Notified]                      │  ← Single CTA
│                                             │
│     Organized by the SAP Community          │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│           📧 Stay in the Loop               │
│                                             │
│   Be the first to know when registration    │
│   opens and the full agenda is released     │
│                                             │
│   [email input] [Notify Me]                 │  ← Email capture
│   No spam, unsubscribe anytime              │
│                                             │
├─────────────────────────────────────────────┤
│     🐦 💼 🐙                                │  ← Minimal footer
│   © 2026 SITWHM 2026. A SAP Community Event │
└─────────────────────────────────────────────┘
```

### Full Mode (`teaserMode: false`)

```
┌─────────────────────────────────────────────┐
│  SITWHM  About Speakers Agenda Location... │  ← Full navigation
├─────────────────────────────────────────────┤
│         SAP Inside Track Weinheim           │
│    [Register] [View Agenda]                 │  ← Multiple CTAs
├─────────────────────────────────────────────┤
│              About Section                  │
├─────────────────────────────────────────────┤
│              Agenda Section                 │
├─────────────────────────────────────────────┤
│           Registration Widget               │
├─────────────────────────────────────────────┤
│             Location Section                │
├─────────────────────────────────────────────┤
│             Sponsors Section                │
├─────────────────────────────────────────────┤
│             Speakers Section                │
├─────────────────────────────────────────────┤
│            Organizers Section               │
├─────────────────────────────────────────────┤
│           Comprehensive Footer              │
│   Links | Social | Legal | Newsletter       │
└─────────────────────────────────────────────┘
```

## Feature Comparison

| Feature | Teaser Mode | Full Mode |
|---------|-------------|-----------|
| **Navigation** | Logo + "Get Notified" CTA | Full menu with all sections |
| **Hero** | Large, centered, minimal | Standard with multiple CTAs |
| **About** | ❌ | ✅ |
| **Speakers** | ❌ | ✅ |
| **Agenda** | ❌ | ✅ |
| **Registration** | Email notification only | Full Ti.to widget |
| **Location** | Icon + text in hero | ✅ Full section with map |
| **Sponsors** | ❌ | ✅ |
| **Organizers** | Small credit text | ✅ Full section with profiles |
| **Footer** | Social links only | Full footer with links |
| **Page Sections** | 2 (Hero + Email) | 8+ sections |
| **CTAs** | 1 ("Get Notified") | Multiple (Register, Agenda, etc.) |
| **Scroll Length** | ~1.5 screens | 5+ screens |
| **Load Time** | ⚡ Very fast | ⚡ Fast |
| **Info Density** | 🔹 Minimal | 🔹🔹🔹 Comprehensive |

## Content Comparison

### Teaser Mode Content

**Visible Information:**
- Event name
- Event date
- Event location (city, country)
- Brief one-line description
- "More details coming soon" message
- Email notification signup
- Social media links
- Organizer credit

**Total Word Count:** ~50 words

**User Actions:**
1. Read the date/location
2. Submit email for notifications
3. Follow social media links

### Full Mode Content

**Visible Information:**
- Everything from teaser mode, plus:
- Detailed event description
- Complete agenda/schedule
- Speaker bios and photos
- Organizer profiles
- Venue details with map
- Sponsor logos and info
- Registration system
- Full navigation menu
- Comprehensive footer

**Total Word Count:** ~1000+ words

**User Actions:**
1. Browse full agenda
2. Learn about speakers
3. Register for event
4. View location details
5. Learn about organizers
6. Navigate between sections
7. View sponsor information

## Metadata Comparison

### Teaser Mode

```html
<title>Save the Date - SAP Inside Track Weinheim 2026</title>
<meta name="description" content="Save the date for September 19th, 2026. Free community tech conference..." />
```

### Full Mode

```html
<title>SAP Inside Track Weinheim 2026</title>
<meta name="description" content="Free community tech conference for SAP developers..." />
```

## Use Case Timeline

### Week 1-4: Teaser Mode
**Goal:** Build anticipation, collect emails

- Announce event on social media
- Share teaser page link
- Collect interested attendee emails
- Generate buzz in SAP community
- Finalize speakers/agenda in background

### Week 5+: Full Mode
**Goal:** Drive registrations

- Email notification list with full details
- Switch to full mode
- Open registration
- Share complete agenda
- Promote speakers and content
- Track registration numbers

## Switching Between Modes

### Enable Teaser Mode
```typescript
// app/featureFlags.ts
export const featureFlags = {
  teaserMode: true,
}
```

### Enable Full Mode
```typescript
// app/featureFlags.ts
export const featureFlags = {
  teaserMode: false,
}
```

**Note:** Changes require rebuild and deployment:
```bash
npm run build
# Deploy to your hosting platform
```

## Analytics Tracking Recommendations

### Teaser Mode Metrics
- Page views
- Email signup conversion rate
- Social link clicks
- Average time on page
- Device/browser breakdown

### Full Mode Metrics
- All teaser metrics, plus:
- Registration conversion rate
- Section scroll depth
- Speaker profile views
- Agenda interactions
- Sponsor link clicks

## SEO Considerations

### Teaser Mode
- Focus on date announcement keywords
- Social sharing optimized
- Open Graph images for "Save the Date"
- Keep meta descriptions concise

### Full Mode
- Rich schema markup for events
- Detailed speaker/agenda content
- Location-based keywords
- Comprehensive meta descriptions
- Event structured data

## Design Philosophy

### Teaser Mode: "Less is More"
- Single message with maximum impact
- Reduce cognitive load
- Create mystery and anticipation
- Easy mobile experience
- Fast loading time

### Full Mode: "Everything You Need"
- Comprehensive information
- Multiple entry points
- Rich content for exploration
- Detailed decision-making support
- Complete event experience
