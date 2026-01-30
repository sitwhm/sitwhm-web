# Google Forms Setup Guide - GDPR Compliant

This guide will help you set up the email notification system using Google Forms in a GDPR-compliant manner.

## Why Google Forms?

- **No backend required** - Works without a database or server-side code
- **Free** - No cost for collecting emails
- **Simple** - Easy to set up in 10 minutes
- **Exportable** - Download emails as CSV/Excel
- **GDPR Ready** - With proper consent mechanisms

## Step-by-Step Setup

### 1. Create Your Google Form

1. Go to [https://forms.google.com](https://forms.google.com)
2. Click **"+ Blank"** to create a new form
3. Name your form: "SITWHM 2026 - Email Notifications"

### 2. Add Email Question

1. Click on the default question
2. Change question type to **"Short answer"**
3. Set the question text to: "Email Address"
4. Click the three dots (⋮) → **"Response validation"**
5. Select:
   - **Text** → **Email**
   - Error message: "Please enter a valid email address"
6. Toggle **"Required"** ON (at the bottom)

### 3. Configure Form Settings

1. Click the **Settings** gear icon (⚙️) at the top
2. Under **"General"** tab:
   - ✅ Check "Limit to 1 response" (optional)
   - ✅ Check "Collect email addresses" (optional - for verification)
3. Under **"Presentation"** tab:
   - Set confirmation message: "Thank you! We'll keep you updated about SAP Inside Track Weinheim 2026."
4. Click **"Save"**

### 4. Get Form Action URL

1. Click **"Send"** button at top right
2. Click the **link icon** (<>)
3. Copy the URL - it looks like:
   ```
   https://docs.google.com/forms/d/e/1FAIpQLSc...LONG_ID.../viewform
   ```
4. **Change `viewform` to `formResponse`**:
   ```
   https://docs.google.com/forms/d/e/1FAIpQLSc...LONG_ID.../formResponse
   ```
5. Save this URL - you'll need it in step 6

### 5. Get Entry ID for Email Field

1. Go back to your form edit view
2. Click **"Preview"** (eye icon) at top right
3. In the preview page, **right-click** on the email input field
4. Select **"Inspect"** or **"Inspect Element"**
5. Find the `<input>` tag with `name="entry.XXXXXXXXX"`
6. Copy the full entry ID (e.g., `entry.1234567890`)
7. Save this - you'll need it in step 6

**Example of what you're looking for:**
```html
<input type="email" name="entry.1234567890" ...>
                         ↑ This is your Entry ID
```

### 6. Update Your Website Code

Open `/components/sections/NotifyMe.tsx` and replace the placeholders:

**Line 65 - Replace the action URL:**
```typescript
// BEFORE:
action="YOUR_GOOGLE_FORM_ACTION_URL"

// AFTER (use your URL from step 4):
action="https://docs.google.com/forms/d/e/1FAIpQLSc...YOUR_LONG_ID.../formResponse"
```

**Line 75 - Replace the entry ID:**
```typescript
// BEFORE:
name="YOUR_ENTRY_ID"

// AFTER (use your ID from step 5):
name="entry.1234567890"
```

### 7. Test Your Form

1. Run your development server: `npm run dev`
2. Go to `http://localhost:3000`
3. Scroll to "Stay in the Loop" section
4. Check the consent checkbox
5. Enter a test email
6. Click "Notify Me"
7. You should see a success message
8. Check your Google Form **"Responses"** tab - you should see the email

### 8. View and Export Responses

**View in Google Forms:**
1. Open your Google Form
2. Click **"Responses"** tab
3. See all submitted emails

**Export to Spreadsheet:**
1. In the "Responses" tab
2. Click the Google Sheets icon (green with white grid)
3. Your responses will open in Google Sheets
4. You can now filter, sort, and export as CSV/Excel

**Download as CSV:**
1. In Google Sheets: **File** → **Download** → **Comma Separated Values (.csv)**

## GDPR Compliance Checklist

Your setup is now GDPR compliant because:

✅ **Explicit Consent** - Users must check the consent checkbox before submitting

✅ **Clear Information** - Privacy policy link is provided in the consent text

✅ **Purpose Statement** - "for event notifications" clearly states the purpose

✅ **Right to Withdraw** - Consent text mentions users can withdraw consent

✅ **Data Processor Info** - Privacy policy documents Google Forms usage

✅ **Minimal Data** - Only email address is collected (no names, phone numbers, etc.)

✅ **Secure Transfer** - Google Forms uses HTTPS encryption

✅ **Legal Basis** - Art. 6 (1) lit. a DSGVO (consent)

## What Data is Collected?

When someone submits the form, Google collects:

- **Email address** (what you need)
- **Timestamp** (when they signed up)
- **IP address** (processed by Google, not visible to you by default)
- **Browser info** (processed by Google for fraud prevention)

## How to Handle Deletion Requests

If someone wants their email deleted (GDPR Right to Erasure):

1. Open your Google Form
2. Click **"Responses"** tab
3. Find their email in the list
4. Click the three dots (⋮) next to their response
5. Select **"Delete response"**
6. Confirm deletion

**Tip:** Keep a log of deletion requests for compliance records.

## How to Send Notifications Later

When you're ready to announce the full event details:

1. Export emails from Google Forms to CSV
2. Import to your email service (e.g., Mailchimp, SendGrid)
3. Send the announcement
4. Include an unsubscribe link (required by law)

## Alternative: Direct Email Service

If you want to skip Google Forms and use an email service directly:

**Option A: Mailchimp**
- Free up to 500 contacts
- Built-in unsubscribe
- Email templates
- [Setup guide](https://mailchimp.com/help/add-a-signup-form-to-your-website/)

**Option B: ConvertKit**
- Free up to 1000 subscribers
- Creator-focused
- [Setup guide](https://help.convertkit.com/en/articles/2502591-create-a-form)

**Option C: Buttondown**
- Simple markdown emails
- $9/month
- [Setup guide](https://buttondown.email/features/embeds)

## Troubleshooting

### Form submission doesn't work
- Check the action URL ends with `/formResponse` (not `/viewform`)
- Verify the entry ID matches your form field
- Open browser console (F12) to check for errors

### Success message doesn't show
- The form submits to a hidden iframe
- Success message is handled by React state, not Google's confirmation page
- Check console for JavaScript errors

### Emails not appearing in responses
- Wait 10-30 seconds and refresh the Responses tab
- Check if form validation is passing (email format)
- Verify the form is not restricted (check Settings)

### CORS or redirect issues
- This is normal - the hidden iframe handles the redirect
- User won't see Google's confirmation page
- Your success message should appear instead

## Legal Requirements Summary

### What You MUST Do:
1. ✅ Get explicit consent before collecting emails (checkbox)
2. ✅ Provide a privacy policy explaining data usage
3. ✅ Provide an imprint (Impressum) if in Germany/EU
4. ✅ Honor deletion requests within 30 days
5. ✅ Delete data after event ends (or get new consent for future use)
6. ✅ Don't share emails with third parties without consent
7. ✅ Use HTTPS (Next.js does this automatically)

### What You MUST NOT Do:
1. ❌ Collect emails without consent
2. ❌ Use emails for purposes not stated in privacy policy
3. ❌ Share emails with sponsors without separate consent
4. ❌ Send marketing emails after event without new consent
5. ❌ Ignore deletion requests

## After the Event

**Within 30 days of event:**
1. Send a final "thank you" email
2. Ask if attendees want to stay subscribed for future events
3. Delete emails of those who don't opt-in again
4. Document your data retention policy

## Need Help?

**Google Forms Help:**
- [Official Guide](https://support.google.com/docs/answer/6281888)

**GDPR Resources:**
- [Official GDPR Text](https://gdpr-info.eu/)
- [German Data Protection Authority](https://www.bfdi.bund.de/)

## Final Checklist

Before going live, verify:

- [ ] Google Form is created and tested
- [ ] Action URL is updated in `NotifyMe.tsx`
- [ ] Entry ID is updated in `NotifyMe.tsx`
- [ ] Test submission works end-to-end
- [ ] Your name/address is filled in Imprint
- [ ] Your email/phone is filled in Imprint
- [ ] Your name/address is filled in Privacy Policy (2 places)
- [ ] You can access form responses
- [ ] Consent checkbox is required
- [ ] Privacy policy link works
- [ ] Footer links to Imprint and Privacy work
- [ ] You have a plan for handling deletion requests
- [ ] You have a plan for sending notifications later

---

**You're all set!** Your email collection is now GDPR-compliant and ready to use. 🎉
