# 🚀 Vibethon - SuhanaBagwan-t153

An interactive learning platform for **AI/ML adventures** with engaging learning modules, coding challenges, and quizzes. Built with modern technologies for a seamless learning experience.

## ✨ Features

- 📚 **Learning Modules** - Structured, in-depth lessons on AI/ML topics
- 💻 **Coding Challenges** - Hands-on practice problems to reinforce concepts
- 🧪 **Interactive Quizzes** - Test your knowledge with instant feedback
- 🔐 **Secure Authentication** - User login and registration via Supabase
- 📊 **Progress Dashboard** - Track your learning journey
- 📱 **Fully Responsive** - Optimized for desktop, tablet, and mobile devices
- ⚡ **Lightning Fast** - Built with Vite for instant builds and HMR
- 🎨 **Beautiful UI** - Modern components with Radix UI and Tailwind CSS

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend Framework** | React + TanStack Router |
| **Styling** | Tailwind CSS + Radix UI Components |
| **Build Tool** | Vite 7 |
| **Auth & Database** | Supabase |
| **Dev Tools** | TypeScript, ESLint, Prettier |
| **Deployment** | Netlify + Cloudflare Workers |

## 📁 Project Structure

```
src/
├── routes/                 # Page routes & navigation
│   ├── __root.tsx         # Root layout
│   ├── index.tsx          # Home page
│   ├── learn.tsx          # Learning modules
│   ├── practice.tsx       # Coding challenges
│   ├── quizzes.tsx        # Quiz section
│   ├── dashboard.tsx      # User dashboard
│   ├── instructions.tsx   # Getting started
│   └── disclaimer.tsx     # Terms & conditions
├── components/
│   ├── ui/                # Reusable UI components
│   ├── Navbar.tsx         # Navigation bar
│   └── Footer.tsx         # Footer
├── data/                  # Static content
│   ├── learning-modules.ts
│   ├── coding-challenges.ts
│   └── quizzes.ts
├── integrations/
│   └── supabase/          # Supabase setup
├── hooks/                 # Custom React hooks
└── lib/                   # Utilities & helpers
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ or Bun
- npm/yarn/pnpm/bun
- Supabase account (for authentication)

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/Suhana39/vibethon-SuhanaBagwan-t153.git
cd vibethon-SuhanaBagwan-t153
```

2. **Install dependencies:**
```bash
npm install
# or
bun install
```

3. **Set up environment variables:**
Create a `.env` file in the root:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **Start development server:**
```bash
npm run dev
```

Visit `http://localhost:8080/` in your browser.

## 📝 Available Commands

```bash
npm run dev          # Start dev server with HMR
npm run build        # Build for production
npm run build:dev    # Build in development mode
npm run preview      # Preview production build locally
npm run lint         # Run ESLint checks
npm run format       # Format code with Prettier
```

## 🌐 Live Demo

**Deployed on Netlify:** [vibethon-suhanabagwan-t153.netlify.app](https://vibethon-suhanabagwan-t153.netlify.app)

## 🔗 Routes

| Route | Purpose |
|-------|---------|
| `/` | Home page with introduction |
| `/learn` | Learning modules and courses |
| `/practice` | Coding challenges |
| `/quizzes` | Assessment quizzes |
| `/dashboard` | User progress and stats |
| `/instructions` | How to use the platform |
| `/disclaimer` | Terms and conditions |

## 🔐 Authentication

This project uses **Supabase** for:
- User registration and login
- Password reset functionality
- Session management
- Secure data storage

### Setting up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Get your `Project URL` and `Anon Key` from Settings
3. Add them to your `.env` file
4. Update authentication middleware in `src/integrations/supabase/`

## 🏗️ Architecture

- **Client-Side Routing:** TanStack Router handles all navigation
- **Styling:** Tailwind CSS for utility-first styling
- **Component Library:** Radix UI for accessible, unstyled components
- **State Management:** React hooks and context API
- **Build Optimization:** Vite's fast development and optimized production builds

## 📦 Key Dependencies

```json
{
  "@tanstack/react-router": "^1.168.0",
  "@tanstack/react-start": "^1.167.14",
  "react": "^19.2.0",
  "@supabase/supabase-js": "^2.103.0",
  "@radix-ui/*": "*",
  "tailwindcss": "^4.x"
}
```

## 🚀 Deployment

### Deploy to Netlify

1. Push code to GitHub:
```bash
git push origin main
```

2. Connect your repo to [Netlify](https://netlify.com)

3. Netlify automatically:
   - Installs dependencies
   - Runs `npm run build`
   - Deploys from `dist/client`
   - Handles SPA routing

### Deploy to Other Platforms

**Vercel:**
```bash
npm i -g vercel
vercel
```

**GitHub Pages:**
```bash
npm run build
# Push dist/ contents to gh-pages branch
```

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| "Page not found" on Netlify | Ensure `netlify.toml` exists with SPA routing rules |
| Supabase connection fails | Check `.env` file has correct credentials |
| Styles not loading | Clear cache: `rm -rf node_modules/.vite && npm run dev` |
| Build fails | Try deleting `node_modules` and reinstalling |

## 📚 Documentation

- [React Documentation](https://react.dev)
- [TanStack Router](https://tanstack.com/router/latest)
- [Tailwind CSS](https://tailwindcss.com)
- [Radix UI](https://www.radix-ui.com/)
- [Supabase Docs](https://supabase.com/docs)

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Request features
- Submit pull requests
- Improve documentation

## 📄 License

This project is part of the AIML Adventures initiative.

## 👤 Author

**Suhana Bagwan** | Team Code: `t153`

## 📞 Support

For issues and questions:
- Open an issue on [GitHub](https://github.com/Suhana39/vibethon-SuhanaBagwan-t153/issues)
- Check existing documentation
- Review the code comments

---

**Built with ❤️ using React, TanStack Router, Tailwind CSS, and Supabase**

Last Updated: April 2026
