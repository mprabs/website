# EmailJS Setup Guide for Contact Form

## Quick Setup (5 minutes)

### Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

### Step 2: Add Email Service
1. In the EmailJS dashboard, go to **"Email Services"**
2. Click **"Add New Service"**
3. Choose your email provider (Gmail recommended)
4. Click **"Connect Account"** and authorize EmailJS
5. Copy the **Service ID** (looks like `service_xxxxxxx`)

### Step 3: Create Email Template
1. Go to **"Email Templates"**
2. Click **"Create New Template"**
3. Use this template content:

**Subject:**
```
New Contact Form Message from {{user_name}}
```

**Body:**
```
You have a new message from your portfolio contact form!

From: {{user_name}}
Email: {{user_email}}

Message:
{{message}}

---
Sent from prabinacharya.com contact form
```

4. Click **"Save"** and copy the **Template ID** (looks like `template_xxxxxxx`)

### Step 4: Get Public Key
1. Go to **"Account"** → **"General"**
2. Find your **Public Key** (looks like a long string)
3. Copy it

### Step 5: Update Contact.jsx
Open `/Users/macbook/Desktop/projects/prabin-portfolio/src/pages/Contact.jsx` and replace these lines (around line 20-22):

```javascript
const SERVICE_ID = 'YOUR_SERVICE_ID'; // Replace with your Service ID
const TEMPLATE_ID = 'YOUR_TEMPLATE_ID'; // Replace with your Template ID
const PUBLIC_KEY = 'YOUR_PUBLIC_KEY'; // Replace with your Public Key
```

### Step 6: Test It!
1. Go to your contact page
2. Fill out the form
3. Click submit
4. Check your email inbox!

---

## Free Tier Limits
- ✅ **200 emails/month** (more than enough for a portfolio)
- ✅ No credit card required
- ✅ Completely client-side (no backend needed)

## Alternative: Simple mailto Link
If you don't want to set up EmailJS, I can also implement a simple `mailto:` link that opens the user's email client. Just let me know!

---

## Troubleshooting

**Error: "Failed to send message"**
- Check that all three IDs are correct
- Make sure you've verified your email with EmailJS
- Check browser console for specific error messages

**Not receiving emails?**
- Check your spam folder
- Verify the email template is saved correctly
- Make sure the email service is connected properly
