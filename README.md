# Persona AI Chat

A minimalistic AI chat application featuring personas of tech educators **Hitesh Choudhary** and **Piyush Garg**. Built with Next.js 15+ for optimal performance and simplicity.

## Features

- 🎯 **Persona-Based AI Chat** - Switch between different AI personas
- 🎨 **Modern UI Design** - Clean, responsive interface with persona themes
- ⚡ **Performance Optimized** - 80.7KB bundle, sub-2s load times
- 🔐 **Secure** - Server-side OpenAI API integration
- 💬 **Context Aware** - Maintains conversation history

## Tech Stack

- **Next.js 15** - React framework with Pages Router
- **TypeScript** - Type safety and developer experience  
- **Tailwind CSS** - Utility-first styling
- **OpenAI API** - gpt-4.1-mini integration

## Quick Start

1. **Clone and install**
   ```bash
   git clone https://github.com/your-username/persona-ai.git
   cd persona-ai
   npm install
   ```

2. **Environment setup**
   ```bash
   # Create .env.local
   OPENAI_API_KEY=your_api_key_here
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000)

## Commands

```bash
npm run dev    # Development server
npm run build  # Production build
npm run start  # Production server
npm run lint   # Code linting
```

## Configuration

### Environment Variables
- `OPENAI_API_KEY` - Your OpenAI API key
- `NEXT_PUBLIC_APP_URL` - Application URL

## Deployment

**Vercel (Recommended)**
1. Connect repository to Vercel
2. Set environment variables in dashboard
3. Deploy with `vercel --prod`