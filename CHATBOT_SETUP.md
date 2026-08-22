# Portfolio Chatbot Setup Guide

This guide will help you set up the AI-powered chatbot for your portfolio using Google's Gemini API.

## Features

- 🤖 AI-powered responses about your portfolio
- 💬 Real-time chat interface
- 📱 Responsive design matching your portfolio theme
- 🎨 Smooth animations and transitions
- 🔒 Secure API integration

## Setup Instructions

### 1. Get Your Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key

### 2. Configure Environment Variables

1. Open the `.env.local` file in your project root
2. Replace `your_gemini_api_key_here` with your actual API key:

```env
GEMINI_API_KEY=your_actual_api_key_here
```

### 3. Install Dependencies

The required dependency `@google/generative-ai` has already been installed. If you need to reinstall:

```bash
npm install @google/generative-ai
```

### 4. Test the Chatbot

1. Start your development server:
```bash
npm run dev
```

2. Open your portfolio in the browser
3. Look for the floating chat button in the bottom-right corner
4. Click it and try asking questions like:
   - "Tell me about Abhishek's experience"
   - "What technologies does he work with?"
   - "What are his featured projects?"

## Chatbot Features

### Smart Responses
The chatbot is trained with comprehensive information about:
- Your educational background (MCA from Chandigarh University)
- Current role as MERN Stack Developer
- Technical skills across multiple domains
- Detailed project information including DAHN, Taxificient, DocuAI Pro, etc.
- Your roles and responsibilities in each project

### Conversation Examples
- **User:** "What is Abhishek's experience with healthcare applications?"
- **Bot:** "Abhishek has significant experience in healthcare applications, particularly with the DAHN project - a Hospice Nurse Documentation Support App. He built this full-stack application using the MERN stack with features like role-based access control for Admins, Agencies, and Nurses, patient notes management, and Stripe integration for billing..."

### UI Features
- Floating chat button with smooth animations
- Modern chat interface with user/bot message distinction
- Typing indicators during response generation
- Responsive design that works on all devices
- Dark mode support

## Customization

### Updating Portfolio Information
To update the chatbot's knowledge about your portfolio:

1. Open `src/components/Chatbot.tsx`
2. Modify the `PORTFOLIO_CONTEXT` constant with new information
3. The chatbot will automatically use the updated context

### Styling Customization
The chatbot uses your existing design system:
- Tailwind CSS classes matching your portfolio theme
- Framer Motion animations consistent with your site
- Color scheme that adapts to your brand colors

### API Configuration
The chatbot API is located at `src/app/api/chat/route.ts`. You can:
- Modify the Gemini model (currently using 'gemini-pro')
- Adjust response parameters
- Add additional context or instructions

## Troubleshooting

### Common Issues

1. **Chatbot not responding:**
   - Check if your API key is correctly set in `.env.local`
   - Ensure the API key has proper permissions
   - Check browser console for error messages

2. **API key errors:**
   - Verify the API key is valid and active
   - Make sure you haven't exceeded API quotas
   - Check if the API key has the necessary permissions

3. **Styling issues:**
   - Ensure all Tailwind CSS classes are properly configured
   - Check if Framer Motion is installed and working

### Environment Variables
Make sure your `.env.local` file is:
- In the project root directory
- Not committed to version control (already in .gitignore)
- Has the correct variable name: `GEMINI_API_KEY`

## Security Notes

- Never commit your API key to version control
- The `.env.local` file is already included in `.gitignore`
- API calls are made server-side to keep your key secure
- Consider implementing rate limiting for production use

## Production Deployment

When deploying to production:

1. Add the `GEMINI_API_KEY` environment variable to your hosting platform
2. Ensure the API endpoint is accessible
3. Consider implementing additional security measures like rate limiting
4. Monitor API usage and costs

## Support

If you encounter any issues:
1. Check the browser console for error messages
2. Verify your API key is working by testing it directly with Google AI Studio
3. Ensure all dependencies are properly installed
4. Check that your environment variables are correctly configured

The chatbot is now ready to help visitors learn more about your portfolio and professional background!