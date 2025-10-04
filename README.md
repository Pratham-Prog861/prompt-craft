# 🚀 PromptCraft

<div align="center">

![PromptCraft Logo](https://via.placeholder.com/200x80/4F46E5/FFFFFF?text=PromptCraft)

**Build stunning websites with a single prompt**

[![Next.js](https://img.shields.io/badge/Next.js-15.3.3-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.1-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-11.9.1-orange?style=for-the-badge&logo=firebase)](https://firebase.google.com/)
[![Gemini AI](https://img.shields.io/badge/Gemini-2.5_Flash-4285F4?style=for-the-badge&logo=google)](https://ai.google.dev/)

</div>

---

## ✨ What is PromptCraft?

PromptCraft is a revolutionary AI-powered website builder that transforms your ideas into stunning, responsive websites with just a single prompt. No coding knowledge required – just describe what you want, and watch your vision come to life in seconds.

### 🎯 Key Features

- **🤖 AI-Powered Generation** - Powered by Google's Gemini 2.5 Flash for lightning-fast website creation
- **📱 Responsive Design** - Every website is mobile-first and looks perfect on all devices
- **🎨 Tailwind CSS** - Beautiful, modern styling with utility-first CSS framework
- **🔄 Real-time Editing** - Iterate and refine your website with follow-up prompts
- **💾 Project Management** - Save, organize, and manage multiple website projects
- **🔐 Secure Authentication** - Firebase-powered user authentication and data storage
- **⚡ Performance Optimized** - Fast loading times with Next.js and optimized AI responses
- **🌙 Dark Mode** - Beautiful light and dark themes

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Firebase project
- Google AI API key

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/pratham-prog861/promptcraft.git
   cd promptcraft
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   ```

   Fill in your environment variables:

   ```env
   GEMINI_API_KEY=your_gemini_api_key
   NEXT_PUBLIC_PROJECT_ID=your_firebase_project_id
   NEXT_PUBLIC_API_KEY=your_firebase_api_key
   NEXT_PUBLIC_AUTH_DOMAIN=your_firebase_auth_domain
   NEXT_PUBLIC_MESSAGING_SENDER_ID=your_messaging_sender_id
   NEXT_PUBLIC_APP_ID=your_firebase_app_id
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:9002](http://localhost:9002)

## 🛠️ Tech Stack

### Frontend

- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Radix UI](https://www.radix-ui.com/)** - Accessible component primitives
- **[Framer Motion](https://www.framer.com/motion/)** - Animation library
- **[Zustand](https://github.com/pmndrs/zustand)** - State management

### Backend & AI

- **[Google Gemini 2.5 Flash](https://ai.google.dev/)** - AI model for website generation
- **[Genkit](https://firebase.google.com/docs/genkit)** - AI framework by Google
- **[Firebase](https://firebase.google.com/)** - Authentication & database
- **[Firestore](https://firebase.google.com/docs/firestore)** - NoSQL database

### Development Tools

- **[ESLint](https://eslint.org/)** - Code linting
- **[Prettier](https://prettier.io/)** - Code formatting
- **[TypeScript](https://www.typescriptlang.org/)** - Type checking

## 📁 Project Structure

```bash
promptcraft/
├── src/
│   ├── ai/                    # AI generation logic
│   │   ├── flows/            # AI workflow definitions
│   │   ├── fallback-templates.ts
│   │   └── genkit.ts
│   ├── app/                  # Next.js app router pages
│   │   ├── studio/          # Website builder interface
│   │   ├── projects/        # Project management
│   │   └── layout.tsx
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # Base UI components
│   │   ├── webgenius/      # Website builder components
│   │   └── layout/         # Layout components
│   ├── firebase/           # Firebase configuration
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   └── store/              # State management
├── public/                 # Static assets
└── docs/                   # Documentation
```

## 🎨 Usage Examples

### Creating Your First Website

1. **Start a new project**

   ```bash
   Click "New Project" or navigate to /studio?new=true
   ```

2. **Describe your website**

   ```bash
   "Create a modern portfolio website for a web developer with a dark theme,
   hero section, skills showcase, and contact form"
   ```

3. **Iterate and refine**
   ```bash
   "Add a testimonials section with 3 customer reviews"
   "Change the color scheme to blue and white"
   "Make the hero section more minimalist"
   ```

### Example Prompts

- **Landing Page**: "Create a SaaS landing page for a project management tool with pricing tiers"
- **Portfolio**: "Build a creative portfolio for a photographer with image galleries"
- **Business**: "Design a professional website for a law firm with services and team pages"
- **E-commerce**: "Create a product showcase page for handmade jewelry"

## 🔧 Available Scripts

```bash
# Development
npm run dev              # Start development server with Turbopack
npm run genkit:dev       # Start Genkit AI development server
npm run genkit:watch     # Start Genkit with file watching

# Production
npm run build            # Build for production
npm run start            # Start production server

# Code Quality
npm run lint             # Run ESLint
npm run typecheck        # Run TypeScript type checking
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your repository to Vercel**
2. **Set environment variables in Vercel dashboard**
3. **Deploy automatically on every push**

### Other Platforms

PromptCraft can be deployed on any platform that supports Next.js:

- Netlify
- Railway
- Render
- AWS Amplify

## 🤝 Contributing

We love contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run tests: `npm run test`
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Google Gemini](https://ai.google.dev/) for the powerful AI capabilities
- [Vercel](https://vercel.com/) for the amazing deployment platform
- [Firebase](https://firebase.google.com/) for backend services
- [Tailwind CSS](https://tailwindcss.com/) for the beautiful styling system
- [Radix UI](https://www.radix-ui.com/) for accessible components

## 📞 Support

- 📧 Email: [Gmail](pratham8355@gmail.com)

---

<div align="center">

**Made with ❤️ by the Pratham Darji**

[⭐ Star us on GitHub](https://github.com/pratham-prog861/promptcraft)

</div>
