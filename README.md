# Persona AI Chat Application

A **minimalistic AI chat application** that allows users to interact with AI-powered personas of popular tech educators **Hitesh Choudhary** and **Piyush Garg**. Built with Next.js 15+ using an ultra-simple architecture designed for beginners.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-15.1.8+-black.svg)
![Bundle Size](https://img.shields.io/badge/bundle%20size-80.7KB-brightgreen.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)

## ✨ Features

- 🎯 **Persona-Based AI Chat** - Switch between Hitesh Choudhary and Piyush Garg personas
- 🎨 **Modern UI Design** - Professional minimalistic interface with persona-specific themes
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop (320px to 1024px+)
- ⚡ **Ultra-Fast Performance** - < 2 second load times, 80.7KB bundle size
- 🔐 **Secure API Integration** - Server-side OpenAI API handling with environment variables
- 💬 **Conversation Context** - Maintains chat history during persona switches
- 🛠️ **Beginner-Friendly** - Simple file structure with maximum 6 components

## 🏗️ Architecture

### Technology Stack

- **Frontend**: Next.js 15.1.8+ with Pages Router
- **Styling**: Tailwind CSS with professional color palette
- **AI Integration**: OpenAI API (GPT-4o-mini)
- **Language**: TypeScript for type safety
- **Testing**: ESLint for code quality

### Ultra-Minimalist File Structure

```
persona-ai/
├── components/
│   ├── ChatInterface.tsx    # Complete chat UI component
│   └── PersonaToggle.tsx    # Persona switching component
├── lib/
│   ├── openai.ts           # OpenAI client configuration
│   ├── personas.ts         # Server-side persona management
│   ├── personas-client.ts  # Client-safe persona utilities
│   └── prompts/           # Markdown-based system prompts
│       ├── hitesh-choudhary.md
│       └── piyush-garg.md
├── pages/
│   ├── index.tsx          # Main chat page
│   ├── _app.tsx          # Next.js app wrapper
│   └── api/
│       └── chat.ts       # OpenAI API endpoint
├── styles/
│   └── globals.css       # All styles consolidated
└── Configuration files...
```

## 🚀 Quick Start

### Prerequisites

- **Node.js 18+** and npm
- **OpenAI API key** ([Get one here](https://platform.openai.com/api-keys))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/persona-ai.git
   cd persona-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Edit `.env.local` and add your OpenAI API key:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) and start chatting!

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm run start

# Run linting
npm run lint
```

## 🎭 Personas

### Hitesh Choudhary (Green Theme)
- **Platform Focus**: YouTube, Twitter, Online Courses
- **Teaching Style**: Practical, project-based learning
- **Expertise**: JavaScript, React, Node.js, Full-stack development
- **Communication**: Direct, encouraging, industry-focused

### Piyush Garg (Red Theme)
- **Platform Focus**: YouTube, Tech tutorials
- **Teaching Style**: Detailed explanations, step-by-step guidance
- **Expertise**: Web development, Programming fundamentals
- **Communication**: Patient, thorough, beginner-friendly

## 📖 Project Stories & Development

This project was built following a story-driven development approach:

### Completed Stories

1. **[Story 1.1: Basic Chat Interface](docs/stories/1.1.basic-chat-interface.md)**
   - ✅ Clean, responsive chat interface
   - ✅ Professional minimalistic design
   - ✅ Mobile-first responsive layout

2. **[Story 1.2: OpenAI Integration](docs/stories/1.2.openai-integration.md)**
   - ✅ Secure OpenAI API integration
   - ✅ Conversation context maintenance
   - ✅ Comprehensive error handling

3. **[Story 1.3: Persona Selection](docs/stories/1.3.persona-selection.md)**
   - ✅ Persona toggle functionality
   - ✅ Visual feedback and theming
   - ✅ Markdown-based system prompts

## 📊 Performance Metrics

| Metric | Target | Current | Status |
|--------|--------|---------|---------|
| Page Load Time | < 2s | ~1.3s | ✅ |
| Bundle Size | < 500KB | 80.7KB | ✅ |
| API Response Time | < 5s | ~4.5s | ✅ |
| Dependencies | < 10 | 8 | ✅ |
| File Count | < 15 | 16 | ⚠️ |

## 🎨 Design System

### Color Palette

```css
/* Primary Colors */
--primary-blue: #2563eb      /* Professional blue for CTAs */
--primary-gray: #1f2937      /* Dark gray for text */

/* Persona Colors */
--persona-hitesh: #059669    /* Green for Hitesh persona */
--persona-piyush: #dc2626    /* Red for Piyush persona */

/* Backgrounds */
--bg-white: #ffffff          /* Main background */
--bg-light: #f9fafb         /* Light gray for chat bubbles */
```

### Responsive Breakpoints

- **Mobile**: 320px minimum width
- **Tablet**: 768px and up
- **Desktop**: 1024px and up
- **Max Width**: 800px centered

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | Your OpenAI API key | ✅ |
| `NEXT_PUBLIC_APP_URL` | Application URL | ✅ |

### Deployment

#### Vercel (Recommended)

1. **Connect your repository to Vercel**
2. **Set environment variables in Vercel dashboard**:
   - `OPENAI_API_KEY`: Your OpenAI API key
   - `NEXT_PUBLIC_APP_URL`: Your production URL

3. **Deploy**:
   ```bash
   vercel --prod
   ```

#### Manual Deployment

```bash
# Build the application
npm run build

# Start production server
npm run start
```

## 🧪 Testing

### Running Tests

```bash
# Run linting
npm run lint

# Build test (checks for compilation errors)
npm run build
```

### Testing Checklist

- ✅ Chat interface loads correctly
- ✅ OpenAI API integration works
- ✅ Persona switching functions properly
- ✅ Responsive design across breakpoints
- ✅ Error handling displays user-friendly messages
- ✅ API key security (not exposed client-side)

## 📋 Development Guidelines

### Code Conventions

- **Components**: Use functional components with TypeScript
- **Styling**: Tailwind CSS utility classes
- **File Naming**: PascalCase for components, camelCase for utilities
- **State Management**: React hooks for local state
- **API Calls**: Async/await pattern with proper error handling

### Adding New Features

1. Follow the ultra-minimalist principle (< 6 components)
2. Maintain bundle size under 500KB
3. Ensure mobile-first responsive design
4. Add comprehensive error handling
5. Update documentation accordingly

## 🔍 Project Requirements (PRD)

This project follows a comprehensive **[Product Requirements Document](docs/prd.md)** that outlines:

- **Goals & Background**: Persona-based AI chat application vision
- **Technical Specifications**: Next.js 15+, TypeScript, Tailwind CSS
- **User Interface Design**: Professional minimalistic design principles
- **Success Metrics**: Performance targets and quality standards
- **Implementation Timeline**: Story-driven development approach

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Follow the existing code style and architecture
4. Ensure bundle size stays under 500KB
5. Test across different screen sizes
6. Submit a pull request

## 📝 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🆘 Troubleshooting

### Common Issues

**"Missing OPENAI_API_KEY" Error**
- Ensure `.env.local` file exists with valid API key
- Restart development server after adding environment variables

**API Timeout Errors**
- Check OpenAI API status and account limits
- Verify API key has sufficient credits

**Build Failures**
- Run `npm run lint` to check for TypeScript errors
- Ensure all imports are correctly typed

**UI Not Loading**
- Check browser console for client-side errors
- Verify all dependencies are installed: `npm install`

### Performance Optimization

- Bundle size is monitored and optimized
- Images should be optimized for web
- Minimize external dependencies
- Use Next.js built-in optimizations

---

## 📚 Additional Resources

- **[Next.js Documentation](https://nextjs.org/docs)**
- **[OpenAI API Documentation](https://platform.openai.com/docs)**
- **[Tailwind CSS Documentation](https://tailwindcss.com/docs)**
- **[TypeScript Documentation](https://www.typescriptlang.org/docs)**

---

**Built with ❤️ by the Persona AI team**

*This application demonstrates modern web development practices with a focus on simplicity, performance, and user experience.*