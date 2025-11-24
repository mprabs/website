# Formspree Setup Guide (Super Simple!)

## Setup in 2 Minutes

### Step 1: Create Formspree Account
1. Go to [https://formspree.io](https://formspree.io)
2. Sign up for FREE (no credit card needed)

### Step 2: Create a Form
1. Click **"+ New Form"**
2. Give it a name like "Portfolio Contact Form"
3. Copy the **Form Endpoint URL** (looks like `https://formspree.io/f/xyzabc123`)

### Step 3: Update Contact.jsx
Open `src/pages/Contact.jsx` and replace line 19:

```javascript
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';
```

With your actual endpoint URL:

```javascript
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xyzabc123'; // Your actual URL
```

### Step 4: Done! 🎉
That's it! Test your form and check your email inbox.

---

## Why Formspree is Better:
- ✅ **Simpler** - Just one URL, no API keys or templates
- ✅ **Free** - 50 submissions/month (plenty for portfolio)
- ✅ **No dependencies** - Uses native `fetch()`, no npm packages
- ✅ **Spam protection** - Built-in reCAPTCHA
- ✅ **Email notifications** - Instant email to your inbox

---

## Free Tier:
- 50 submissions/month
- Email notifications
- Spam filtering
- Form analytics

Perfect for a portfolio site! 🚀
