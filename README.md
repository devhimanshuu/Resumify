# 📄 Resumify: The AI-Powered Career Catalyst

![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)
![Clerk](https://img.shields.io/badge/Clerk-Auth-6C47FF?style=for-the-badge&logo=clerk)
![Groq](https://img.shields.io/badge/Groq-AI-F55036?style=for-the-badge&logo=groq)

Resumify is a cutting-edge, AI-driven resume builder engineered to help professionals craft stunning, ATS-optimized resumes in minutes. Built on a modern Next.js stack, it seamlessly blends real-time editing with powerful AI generation capabilities.

---

## ✨ Key Features

- **🧠 Advanced AI Generation**: Instantly generate tailored professional summaries, bullet points, and descriptions powered by Groq's blazing-fast inference engine.
- **🎯 ATS Optimization & Matcher**: Analyze your resume against specific job descriptions to get real-time Match Scores and actionable improvement tips to beat Applicant Tracking Systems.
- **⚡ Real-Time Live Preview**: Watch your resume take shape as you type. What you see is exactly what you get.
- **🎨 Premium Customization**: Personalize your professional brand with custom theme colors, advanced typography, and a sleek dark mode interface.
- **🖱️ Intuitive Drag & Drop**: Effortlessly reorder your experience, education, and skills sections using Framer Motion.
- **📄 High-Fidelity PDF Export**: Generate pixel-perfect, ATS-readable PDFs using robust client-side rendering.
- **🔗 Shareable Public Links**: Generate unique, secure links to share your dynamic web-based resume with recruiters instantly.
- **🔒 Secure Authentication**: Enterprise-grade user authentication and session management powered by Clerk.

## 🏗️ Architecture & Tech Stack

Resumify is architected for performance, scalability, and developer experience:

- **Frontend**: Next.js 14 (App Router), React 18, Tailwind CSS, Shadcn UI, Framer Motion
- **Backend**: Next.js API Routes, Hono (RPC), TanStack React Query
- **Database**: PostgreSQL (Neon DB), Drizzle ORM
- **AI Integration**: Groq API (Llama 3 models)
- **Document Processing**: jsPDF, html2canvas
- **Authentication**: Clerk

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn
- A PostgreSQL Database (e.g., Neon or Vercel Postgres)
- API Keys for Clerk and Groq

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/AI-Resumes-Builder.git
   cd AI-Resumes-Builder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory and add your credentials (refer to `.env.example`):
   ```env
   # Database
   DATABASE_URL=your_postgres_connection_string

   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

   # AI Integration
   GROQ_API_KEY=your_groq_api_key
   NEXT_PUBLIC_GROQ_API_KEY=your_groq_api_key

   # App URL
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Initialize Database**
   Push the schema to your database:
   ```bash
   npm run db:push
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📂 Project Structure

```text
├── app/                        # Next.js 14 App Router
│   ├── (auth)/                 # Clerk Authentication routes
│   ├── (home)/                 # Main Application Workspace
│   │   ├── dashboard/          # User Dashboard & Document Management
│   │   ├── _components/        # Dashboard-specific UI & Forms
│   │   └── layout.tsx          # Main layout with Header & Mobile Customizer
│   ├── (landingPage)/          # Public Marketing & Hero section
│   ├── (public)/               # Public Portfolio & Live Preview routes
│   └── api/                    # Hono RPC Backend (Document, AI, ATS Engine)
├── components/                 # Shared UI Component Library
│   ├── preview/                # Resume Preview specific modules
│   └── ui/                     # Core Shadcn UI components
├── context/                    # Global State Management (Resume Context)
├── db/                         # Database & Persistence Layer
│   └── schema/                 # Drizzle ORM Table & Relation Definitions
├── features/                   # Logic-heavy Domain Features
│   ├── document/               # TanStack Query hooks for Document CRUD
│   └── ai/                     # AI content generation logic
├── hooks/                      # Global Custom React Hooks
├── lib/                        # Core Utilities & External API Clients
├── public/                     # Static Assets & Global Styles
└── types/                      # Shared TypeScript Type Definitions
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## 📄 License

This project is licensed under the MIT License.
