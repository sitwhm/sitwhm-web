# Your Information Template

Fill in your information below, then use find-and-replace to update all legal pages.

## Your Details

```
YOUR NAME: ________________________________

YOUR STREET ADDRESS: ________________________________

YOUR POSTAL CODE: ________________________________

YOUR CITY: ________________________________

YOUR EMAIL: ________________________________

YOUR PHONE NUMBER: ________________________________
```

## How to Update All Files

### Option 1: Manual Find & Replace (Easiest)

1. Fill in the template above
2. Open each file below in your editor
3. Use Find & Replace (Ctrl/Cmd + H) to replace each placeholder

### Option 2: Command Line (Fastest)

On Mac/Linux, run these commands from your project root:

```bash
# Replace YOUR NAME
find app -name "*.tsx" -type f -exec sed -i '' 's/\[YOUR NAME\]/Your Actual Name/g' {} +

# Replace YOUR STREET ADDRESS
find app -name "*.tsx" -type f -exec sed -i '' 's/\[YOUR STREET ADDRESS\]/Your Street 123/g' {} +

# Replace YOUR POSTAL CODE
find app -name "*.tsx" -type f -exec sed -i '' 's/\[YOUR POSTAL CODE\]/12345/g' {} +

# Replace YOUR CITY
find app -name "*.tsx" -type f -exec sed -i '' 's/\[YOUR CITY\]/Your City/g' {} +

# Replace YOUR EMAIL
find app -name "*.tsx" -type f -exec sed -i '' 's/\[YOUR EMAIL\]/your@email.com/g' {} +

# Replace YOUR PHONE NUMBER
find app -name "*.tsx" -type f -exec sed -i '' 's/\[YOUR PHONE NUMBER\]/+49 123 456789/g' {} +
```

On Windows (PowerShell):

```powershell
# Replace YOUR NAME
Get-ChildItem -Path app -Filter *.tsx -Recurse | ForEach-Object {
    (Get-Content $_.FullName) -replace '\[YOUR NAME\]', 'Your Actual Name' | Set-Content $_.FullName
}

# Repeat for other placeholders...
```

## Files That Need Your Information

1. **`/app/imprint/page.tsx`** - 3 locations
   - Legal information section
   - Contact section
   - Responsible for content section

2. **`/app/privacy/page.tsx`** - 2 locations
   - Responsible party section
   - Contact information section

## Quick Reference: What Goes Where

### [YOUR NAME]
Use your **full legal name** (personal or business)
- Example: "Max Mustermann"
- Example: "Syntax GmbH"

### [YOUR STREET ADDRESS]
Your **complete street address**
- Example: "Musterstraße 123"
- Example: "Tech Park, Building 5"

### [YOUR POSTAL CODE]
Your **postal/ZIP code**
- Example: "69469"
- Example: "12345"

### [YOUR CITY]
Your **city name**
- Example: "Weinheim"
- Example: "Berlin"

### [YOUR EMAIL]
Your **business/contact email**
- Example: "info@sitwhm.com"
- Example: "max@example.com"

### [YOUR PHONE NUMBER]
Your **contact phone number** (include country code)
- Example: "+49 6201 123456"
- Example: "+49 170 1234567"

## Verification Checklist

After replacing all placeholders, verify:

- [ ] No brackets `[` or `]` remain in the files
- [ ] Your name appears consistently (same spelling)
- [ ] Address is complete and accurate
- [ ] Email is correct (test by sending yourself an email)
- [ ] Phone number includes country code (+49 for Germany)
- [ ] All information matches your business registration (if applicable)

## Legal Notes

### If You're an Individual Organizer:
- Use your personal name
- Use your home address (or registered business address)
- You are personally liable as the website operator

### If You're a Company/Organization:
- Use the registered company name
- Use the registered business address
- Include registration number/VAT ID if applicable

### Privacy Considerations:
- This information will be **publicly visible** on your website
- Consider using a business address instead of home address
- Consider using a business phone number
- PO Boxes are generally **not acceptable** for Impressum in Germany

## Need Help?

If you're unsure about any legal requirements:
- Consult a lawyer familiar with German/EU law
- Check with your local chamber of commerce (IHK)
- Review similar event websites for reference

---

**Important:** Make sure all information is accurate and up-to-date. Incorrect Impressum information can result in legal warnings (Abmahnungen) in Germany.
