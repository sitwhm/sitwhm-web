# Quick Start Guide - Launch Your Save the Date Page

**Time to launch:** ~20 minutes

## 📋 3 Steps to Go Live

### Step 1: Fill Your Information (5 min)

Replace these placeholders in **2 files**:

**Files:**
- `app/imprint/page.tsx`
- `app/privacy/page.tsx`

**Replace:**
```
[YOUR NAME]              → Your Full Name
[YOUR STREET ADDRESS]    → Your Street 123
[YOUR POSTAL CODE]       → 12345
[YOUR CITY]              → Your City
[YOUR EMAIL]             → your@email.com
[YOUR PHONE NUMBER]      → +49 123 456789
```

**Quick way:** Use Find & Replace (Ctrl/Cmd + H) in your editor

### Step 2: Set Up Google Form (10 min)

1. **Create form:** https://forms.google.com → Blank form
2. **Add question:** "Email Address" (Short answer, Email validation, Required)
3. **Get action URL:**
   - Click "Send" → Link icon
   - Copy URL, change `viewform` to `formResponse`
4. **Get entry ID:**
   - Preview form → Right-click email field → Inspect
   - Find `name="entry.XXXXXX"`
5. **Update code:** `components/sections/NotifyMe.tsx`
   - Line 65: Paste action URL
   - Line 75: Paste entry ID

**Detailed guide:** See `GOOGLE_FORMS_SETUP.md`

### Step 3: Test & Deploy (5 min)

```bash
# Test locally
npm run dev
# Visit http://localhost:3000

# Build for production
npm run build

# Deploy (example: Vercel)
vercel deploy --prod
```

**Test checklist:**
- [ ] Visit `/imprint` - your info shows correctly
- [ ] Visit `/privacy` - your info shows correctly
- [ ] Submit test email - appears in Google Forms
- [ ] Success message shows
- [ ] Mobile view looks good

## 🎯 What You Get

### Save the Date Teaser Page

**Features:**
- ✅ Clean, minimal design
- ✅ Event date & location prominently displayed
- ✅ Email notification signup
- ✅ GDPR-compliant with consent checkbox
- ✅ Legal pages (Imprint, Privacy)
- ✅ Mobile responsive
- ✅ Fast loading

**Page sections:**
1. Hero: Big event announcement
2. Email signup: "Get Notified" form
3. Footer: Legal links

### When to Switch to Full Page

When you have:
- Complete speaker list
- Full agenda
- Sponsors confirmed
- Venue details ready

**To switch:**
Edit `app/featureFlags.ts`:
```typescript
teaserMode: false  // Shows full event page
```

## 📁 Important Files

### You MUST edit:
- `app/imprint/page.tsx` - Add your contact info
- `app/privacy/page.tsx` - Add your contact info
- `components/sections/NotifyMe.tsx` - Add Google Form URLs

### Configuration:
- `app/featureFlags.ts` - Toggle teaser/full mode
- `app/siteConfig.ts` - Event details (date, venue, etc.)

### Documentation:
- `QUICK_START.md` - This file
- `GOOGLE_FORMS_SETUP.md` - Detailed form setup
- `LEGAL_COMPLIANCE_SUMMARY.md` - Complete legal overview
- `YOUR_INFO_TEMPLATE.md` - Info fill-in template

## 🚀 Deployment Options

### Vercel (Recommended - Free)
```bash
npm install -g vercel
vercel login
vercel deploy --prod
```
**Custom domain:** https://vercel.com/docs/custom-domains

### Netlify (Free)
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

### GitLab Pages (If using GitLab)
- Already configured in `.gitlab-ci.yml`
- Just push to GitLab
- Pages deploy automatically

## 🔒 Legal Compliance Status

✅ **GDPR Compliant**
- Explicit consent checkbox
- Privacy policy with Google Forms disclosure
- User rights documented

✅ **German Law Compliant (TMG)**
- Complete Impressum
- Contact information
- Liability disclaimers

✅ **ePrivacy Directive (TTDSG)**
- Consent for Google Forms
- Cookie notice via privacy policy

## ⚠️ Before Going Live

**Triple check:**
1. [ ] Your name/address in Imprint is **public** - are you OK with that?
2. [ ] Email in Imprint receives mail (people will contact you)
3. [ ] Phone number works
4. [ ] Google Form submission works
5. [ ] You can access form responses
6. [ ] You know how to delete responses (GDPR right to erasure)

## 📞 Common Questions

**Q: Can I use a PO Box for the address?**
A: No - German law requires a real address.

**Q: Will people see my home address?**
A: Yes, if you use it. Consider a business address or coworking space.

**Q: What if someone wants their email deleted?**
A: Go to Google Forms → Responses → Find their email → Delete.

**Q: Do I need a cookie banner?**
A: Not for the teaser version (only Google Forms cookies). If you add analytics, yes.

**Q: How do I send emails to the list later?**
A: Export from Google Forms → Import to Mailchimp/SendGrid → Send.

**Q: Can I change the privacy policy later?**
A: Yes, but major changes require informing users or getting new consent.

## 🎉 You're Done!

After completing the 3 steps above, your Save the Date page is:
- Legally compliant ✅
- Ready to collect emails ✅
- Mobile-friendly ✅
- Professional ✅

## 📚 Need More Help?

- **Google Forms setup:** `GOOGLE_FORMS_SETUP.md`
- **Legal details:** `LEGAL_COMPLIANCE_SUMMARY.md`
- **Feature toggle:** `TEASER_MODE.md`
- **Technical details:** `TEASER_IMPLEMENTATION.md`

---

**Ready to launch?** Follow the 3 steps above and you'll be live in 20 minutes! 🚀
