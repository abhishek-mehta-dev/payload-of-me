# Contact Form Email Setup Guide

Your contact form is now configured to send emails to **testmail@gmail.com** when users submit the form.

## Setup Instructions (EmailJS - Recommended)

### Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (allows 200 emails/month)
3. Verify your email address

### Step 2: Add Email Service

1. Go to **Email Services** in the dashboard
2. Click **Add New Service**
3. Choose **Gmail** (or your preferred email provider)
4. Connect your Gmail account: **testmail@gmail.com**
5. Copy the **Service ID** (e.g., `service_abc123`)

### Step 3: Create Email Template

1. Go to **Email Templates** in the dashboard
2. Click **Create New Template**
3. Use this template:

```
Subject: New Contact Form Submission - {{subject}}

From: {{from_name}}
Email: {{from_email}}

Subject: {{subject}}

Message:
{{message}}

---
This email was sent from your portfolio contact form.
```

4. **Template Variables** to use:
   - `{{from_name}}` - Sender's full name
   - `{{from_email}}` - Sender's email
   - `{{subject}}` - Message subject
   - `{{message}}` - Message content
   - `{{to_email}}` - Your email (testmail@gmail.com)

5. Set **To Email** to: `{{to_email}}` or directly to `testmail@gmail.com`
6. Copy the **Template ID** (e.g., `template_xyz789`)

### Step 4: Get Public Key

1. Go to **Account** → **General**
2. Find your **Public Key** (e.g., `abc123XYZ`)
3. Copy it

### Step 5: Add Environment Variables

1. Open your `.env.local` file (create if it doesn't exist)
2. Add these variables:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_abc123
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xyz789
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=abc123XYZ
```

3. Replace with your actual IDs from EmailJS

### Step 6: Restart Development Server

```bash
npm run dev
```

### Step 7: Test the Form

1. Go to your contact form
2. Fill in all fields
3. Click "Send Message"
4. Check your email: **testmail@gmail.com**

---


If you encounter any issues, check:
- EmailJS documentation: https://www.emailjs.com/docs/
