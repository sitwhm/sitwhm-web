# Save the Date Teaser Mode

This document explains how to toggle between the **Teaser Mode** (Save the Date) and **Full Mode** (complete event page).

## How to Toggle

Edit `app/featureFlags.ts` and change the `teaserMode` value:

```typescript
export const featureFlags = {
  teaserMode: true,  // Change to false for full page
} as const
```

### Teaser Mode (`teaserMode: true`)

**Shows:**
- Minimal hero section with event name, date, and location
- Email notification signup form
- Simplified navbar with "Get Notified" CTA
- Minimal footer with social links

**Purpose:**
Early announcement before full details are ready. Creates anticipation and collects interested attendee emails.

### Full Mode (`teaserMode: false`)

**Shows:**
- Complete hero section with CTAs
- About section
- Full agenda
- Registration widget
- Location details
- Sponsors section
- Speakers section
- Organizers section
- Full navbar with navigation
- Comprehensive footer

**Purpose:**
Complete event page when all details are finalized and registration is open.

## Design Philosophy

The teaser version follows these principles:

### Visual Design
- **Clean & Minimal**: Single hero section, no clutter
- **Bold Typography**: Large, impactful heading (up to 8xl on large screens)
- **Subtle Gradients**: Soft background decorations for depth
- **Icon-based Details**: Calendar and location with clean icons
- **Consistent Branding**: Uses existing Syntax blue/cyan color scheme

### User Experience
- **Single CTA**: "Get Notified" focus throughout
- **Immediate Value**: Date and location visible immediately
- **Low Friction**: Simple email form, no complex registration
- **Mobile-First**: Responsive from 375px up
- **Smooth Animations**: Fade-in effects with reduced-motion support

### Content Strategy
- Essential info only: Event name, date, location, brief description
- "More details coming soon" messaging
- Social proof: "Organized by SAP Community"
- Follow-up mechanism: Email notification system

## Technical Details

### Files Created for Teaser Mode

```
app/
  featureFlags.ts               # Toggle configuration
components/
  sections/
    HeroTeaser.tsx              # Minimal hero section
    NotifyMe.tsx                # Email notification signup
  layout/
    NavbarTeaser.tsx            # Simplified navigation
    FooterTeaser.tsx            # Minimal footer
```

### Files Modified

```
app/
  page.tsx                      # Conditional rendering based on flag
  layout.tsx                    # Conditional nav/footer based on flag
```

## Deployment Strategy

### Phase 1: Teaser (Current)
1. Set `teaserMode: true`
2. Deploy to collect early interest
3. Build social media buzz
4. Gather email list for announcements

### Phase 2: Full Launch
1. Finalize all event details (speakers, agenda, sponsors)
2. Set `teaserMode: false`
3. Send notification to collected emails
4. Open full registration

## Design System

Based on UI/UX Pro Max analysis:

- **Pattern**: Event/Conference Landing
- **Style**: Minimal & Block-based
- **Colors**: Syntax blue (#0632A0) + cyan (#1EB4E6) + black/white
- **Typography**: Inter (existing)
- **Effects**: Subtle gradients, smooth transitions (150-300ms)
- **Accessibility**: 4.5:1 contrast ratio, keyboard navigation, reduced motion support

## Best Practices Applied

✅ No emojis as icons (using Remix Icons)
✅ `cursor-pointer` on all interactive elements
✅ Smooth transitions (200ms)
✅ Sufficient contrast in light mode
✅ Visible focus states
✅ Responsive design (375px - 1440px+)
✅ `prefers-reduced-motion` support
✅ Semantic HTML
✅ Accessible form with labels
