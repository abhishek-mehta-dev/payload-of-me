# Payload of Me - Personal Developer Portfolio

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-15.1.6-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0.0-38bdf8?style=for-the-badge&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**Backend-Focused Full-Stack Engineer | Distributed Systems • AI Workflows • DevOps**

[Live Demo](https://abhishek-mehta-dev.vercel.app/) • [Report Bug](https://github.com/abhishek-mehta-dev/payload-of-me/issues) • [Request Feature](https://github.com/abhishek-mehta-dev/payload-of-me/issues)

</div>

---

## 📖 About

This is my personal developer portfolio showcasing my journey as a **Backend-Focused Full-Stack Engineer**. As a backend developer, a "payload" represents structured, meaningful data. This portfolio is the payload of who I am as a developer.

Built with modern web technologies and production-grade practices, this portfolio demonstrates my expertise in:
- 🏗️ **Systems Architecture** - Scalable backend design
- 🔐 **Security & Compliance** - HIPAA-compliant healthcare systems
- 🤖 **AI Integration** - RAG pipelines and agent-based workflows
- ☁️ **DevOps & Cloud** - Production deployment and monitoring
- 💬 **Real-time Systems** - WebSocket chat and live updates

---

## ✨ Features

### 🎨 Core Features
- ✅ **Responsive Design** - Mobile-first, works on all devices
- ✅ **Dark Mode** - Seamless light/dark theme switching
- ✅ **Smooth Animations** - Framer Motion powered interactions
- ✅ **SEO Optimized** - Meta tags and structured data
- ✅ **Performance** - Optimized images and lazy loading
- ✅ **Accessibility** - WCAG compliant with keyboard navigation

### 🤖 AI-Powered Chatbot
- **Google Gemini Integration** - Intelligent conversational AI
- **Fallback System** - Static responses when API is unavailable
- **GitHub Integration** - Real-time profile and repository data
- **Smart Intent Detection** - Context-aware responses
- **Offline Mode** - Comprehensive knowledge base
- **Premium UI** - Glassmorphism design with animations

### 📧 Contact Form
- **EmailJS Integration** - Direct email delivery
- **Form Validation** - Client-side validation
- **Success/Error States** - User feedback
- **Dark Mode Support** - Fully styled for both themes
- **Responsive Layout** - Works on all screen sizes

### 📝 Dynamic Blog System (No Backend Required)
- **Serverless Architecture** - Uses Supabase and Next.js Server Actions
- **Admin Dashboard** - Password-protected Markdown editor
- **Live Preview & Rendering** - React Markdown with GFM support
- **Zero Ongoing Cost** - Runs 24/7 on free-tier serverless infrastructure

### 📂 Sections
1. **Hero** - Introduction with animated elements
2. **About** - Professional background and philosophy
3. **Skills** - Technical expertise showcase
4. **Experience** - Career journey and roles
5. **Projects** - Featured work with detailed descriptions
6. **Blogs** - Dynamic serverless blog rendering
7. **Contact** - Get in touch form with social links

---

## 🚀 Tech Stack

### Frontend
- **Framework**: Next.js 15.1.6 (App Router)
- **Language**: TypeScript 5.7.2
- **Styling**: Tailwind CSS 4.0.0
- **Animations**: Framer Motion 11.15.0
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React

### AI & Integration
- **AI**: Google Generative AI (Gemini 2.5 Flash Lite)
- **Email**: EmailJS Browser SDK
- **Fallback**: Custom JSON-based response system
- **GitHub API**: Real-time data fetching

### Database & Storage
- **Database**: Supabase (Serverless Postgres)

### Development Tools
- **Linting**: ESLint 9
- **Type Checking**: TypeScript strict mode
- **Package Manager**: npm
- **Version Control**: Git & GitHub

---

## 📦 Installation

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Git

### Clone Repository
```bash
git clone https://github.com/abhishek-mehta-dev/payload-of-me.git
cd payload-of-me
```

### Install Dependencies
```bash
npm install
```

### Environment Setup
Create a `.env.local` file in the root directory:

```env
# Google Gemini API Key
GEMINI_API_KEY=your_gemini_api_key_here

# EmailJS Configuration
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Admin Dashboard
ADMIN_PASSWORD=your_secure_password
```

### Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔧 Configuration

### 1. Google Gemini API Setup

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add to `.env.local` as `GEMINI_API_KEY`

### 2. EmailJS Setup

1. Create account at [EmailJS.com](https://www.emailjs.com/)
2. Add email service (Gmail recommended)
3. Create email template with these variables:
   - `{{from_name}}` - Sender's full name
   - `{{from_email}}` - Sender's email
   - `{{subject}}` - Message subject
   - `{{message}}` - Message content
   - `{{submitted_on}}` - Submission timestamp
4. Copy Service ID, Template ID, and Public Key
5. Add to `.env.local`

**Email Template Example:**
```
Subject: New Contact Request: {{subject}}

📧 New Contact Form Submission

Name: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}
Submitted On: {{submitted_on}}

Message:
{{message}}

---
This email was automatically generated from the Contact Us form.
```

### 3. Personal Information

Update `src/config.ts` with your information:
```typescript
export const profile = {
  name: "Your Name",
  email: { address: "your.email@example.com" },
  phone: { number: "+1 234 567 8900" },
  location: { name: "Your City, Country" },
  // ... other details
};
```

### 4. Blog & Supabase Setup

For detailed instructions on setting up the serverless blog architecture and your Supabase database, please refer to the dedicated [Blog Setup Guide](BLOG_SETUP.md).

---

## 📁 Project Structure

```
payload-of-me/
├── public/
│   └── assets/
│       └── images/          # Project images and assets
├── src/
│   ├── app/
│   │   ├── admin/           # Blog admin dashboard (protected)
│   │   ├── api/
│   │   │   └── chat/        # Chatbot API route
│   │   ├── blogs/           # Public blog listings and articles
│   │   ├── coming-soon/     # Coming soon page
│   │   ├── oops/            # Error page
│   │   ├── favicon.ico
│   │   ├── globals.css      # Global styles
│   │   ├── layout.tsx       # Root layout
│   │   ├── loading.tsx      # Loading state
│   │   └── page.tsx         # Home page
│   ├── components/
│   │   ├── ui/              # Reusable UI components
│   │   ├── About.tsx
│   │   ├── BlogsSection.tsx # Recent blogs component
│   │   ├── Chatbot.tsx      # AI chatbot component
│   │   ├── Contact.tsx      # Contact form
│   │   ├── Experience.tsx
│   │   ├── FloatingParticles.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── Navbar.tsx
│   │   ├── Projects.tsx     # Project showcase
│   │   ├── Skills.tsx
│   │   └── ThemeToggle.tsx  # Dark mode toggle
│   ├── data/
│   │   └── fallback-responses.json  # Chatbot fallback data
│   ├── services/
│   │   ├── fallback.ts      # Fallback service
│   │   └── github.ts        # GitHub API integration
│   ├── lib/
│   │   ├── supabase.ts      # Database client
│   │   └── utils.ts         # Utility functions
│   └── config.ts            # Site configuration
├── .env.local               # Environment variables (create this)
├── .env.local.example       # Environment template
├── components.json          # Shadcn UI config
├── next.config.ts           # Next.js configuration
├── tailwind.config.ts       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
├── package.json
├── BLOG_SETUP.md            # Blog module instructions
└── README.md
```

---

## 🎨 Key Components

### Chatbot Component
**Location**: `src/components/Chatbot.tsx`

Features:
- Google Gemini AI integration
- Fallback response system
- GitHub API integration
- Quick question shortcuts
- Minimize/maximize functionality
- Status indicators (online/offline)
- Glassmorphism UI design

### Contact Form
**Location**: `src/components/Contact.tsx`

Features:
- EmailJS integration
- Form validation
- Success/error states
- Dark mode support
- Animated interactions
- Social media links

### Projects Showcase
**Location**: `src/components/Projects.tsx`

Features:
- Cyclic navigation (loops through projects)
- Detailed project cards
- Technology badges
- Roles & responsibilities modal
- HIPAA compliance highlights
- Responsive design
- Book-flip animations

### Dynamic Serverless Blog
**Location**: `src/app/blogs/page.tsx` & `src/app/admin/page.tsx`

Features:
- Supabase PostgreSQL integration
- Next.js Server Actions rendering
- Custom Markdown editor
- Auth-protected dashboard route
- Native GitHub Flavored Markdown styling

---

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com/)
3. Import your repository
4. Add environment variables:
   - `GEMINI_API_KEY`
   - `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
   - `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
   - `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `ADMIN_PASSWORD`
5. Deploy!

### Deploy to Netlify

1. Push your code to GitHub
2. Go to [Netlify](https://www.netlify.com/)
3. Import your repository
4. Build command: `npm run build`
5. Publish directory: `.next`
6. Add environment variables
7. Deploy!

---

## 🎯 Featured Projects

### 1. DAHN - Hospice Nurse Documentation
- HIPAA-compliant healthcare application
- Encrypted PHI storage
- Role-based access control with audit logging
- Stripe payment integration
- AWS deployment

### 2. Taxificient - Enterprise Mobility SaaS
- Large-scale ride-hailing platform
- Dynamic geo-fenced pricing
- Real-time WebSocket chat
- Firebase Cloud Messaging
- Automated shift scheduling

### 3. DocuAI Pro
- AI-powered document processing
- RAG system with LangChain
- FastAPI backend
- OAuth authentication
- PayPal subscriptions

### 4. TimeLedger
- Work-hour tracking desktop app
- MongoDB Atlas integration
- Google Sheets sync
- Excel reporting

### 5. Job Tracker MultiSite
- AI-driven job aggregation
- n8n automation workflows
- OpenAI integration
- Notion and Telegram delivery

---

## 🛠️ Development

### Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Type check
npm run type-check
```

### Code Quality

- **TypeScript**: Strict mode enabled
- **ESLint**: Configured for Next.js
- **Prettier**: Code formatting (optional)
- **Git Hooks**: Pre-commit linting (optional)

---

## 🐛 Troubleshooting

### Chatbot Not Working
1. Check `GEMINI_API_KEY` in `.env.local`
2. Verify API key is valid
3. Check browser console for errors
4. Fallback system should activate automatically

### Contact Form Not Sending
1. Verify EmailJS credentials in `.env.local`
2. Check EmailJS template variable names match
3. Ensure template uses: `{{from_name}}`, `{{from_email}}`, `{{subject}}`, `{{message}}`, `{{submitted_on}}`
4. Check browser console for errors

### Blog / Supabase Issues
1. Verify `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `.env.local`
2. Check if the `blogs` table is properly created in Supabase SQL Editor.
3. Validate `ADMIN_PASSWORD` is correctly spelling in the environment variable for logging into the `/admin` portal.

### Dark Mode Issues
1. Clear browser cache
2. Check if theme toggle is working
3. Verify Tailwind dark mode classes

### Build Errors
1. Delete `.next` folder
2. Delete `node_modules`
3. Run `npm install`
4. Run `npm run build`

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Abhishek Mehta**

- Portfolio: [abhishek-mehta-dev.vercel.app](https://abhishek-mehta-dev.vercel.app/)
- GitHub: [@abhishek-mehta-dev](https://github.com/abhishek-mehta-dev)
- LinkedIn: [Abhishek Mehta](https://www.linkedin.com/in/abhishek-mehta-0724ab256/)
- Email: mehtaabhishek.dev@gmail.com

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Radix UI](https://www.radix-ui.com/) - Unstyled UI primitives
- [Google Gemini](https://ai.google.dev/) - AI integration
- [EmailJS](https://www.emailjs.com/) - Email service
- [Supabase](https://supabase.com/) - Serverless Database
- [Lucide](https://lucide.dev/) - Icon library

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📊 Project Stats

- **Lines of Code**: ~5,000+
- **Components**: 15+
- **Pages**: 4
- **API Routes**: 1
- **Build Time**: ~30s
- **Bundle Size**: Optimized for production

---

## 🔮 Future Enhancements

- [x] Blog section with Markdown support
- [ ] Project filtering and search
- [ ] Analytics dashboard
- [ ] Multi-language support
- [ ] CMS integration
- [ ] Performance monitoring
- [ ] A/B testing
- [ ] Newsletter subscription

---

<div align="center">

**Built with 💻 by Abhishek Mehta**

⭐ Star this repo if you find it helpful!

</div>
