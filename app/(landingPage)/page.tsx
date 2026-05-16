import { Button } from "@/components/ui/button";
import { SignUpButton } from "@clerk/nextjs";
import {
  Sparkles,
  Zap,
  Shield,
  Download,
  Share2,
  Palette,
  Bot,
  FileText,
  ArrowRight,
  Star,
  CheckCircle2,
  Trophy,
  Target,
  Briefcase,
  Linkedin,
  Github,
  Globe,
  Twitter,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FallingPattern } from "@/components/ui/falling-pattern";
import { CyberneticBentoGrid } from "@/components/ui/cybernetic-bento-grid";
import { TypewriterText } from "@/components/ui/typewriter-text";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { TestimonialMarquee } from "@/components/ui/testimonial-marquee";

export default function Home() {
  return (
    <div className="w-full overflow-hidden">
      {/* ===== Hero Section ===== */}
      <section className="relative flex min-h-[92vh] w-full items-center justify-center overflow-hidden bg-background">
        {/* Falling Pattern Background */}
        <div className="absolute inset-0 z-0">
          <FallingPattern
            className="opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]"
            color="hsl(var(--primary))"
          />
        </div>

        <div className="absolute inset-x-0 top-0 z-0 h-80 bg-gradient-to-b from-indigo-500/10 via-background/60 to-transparent" />
        
        {/* Background Blobs */}
        <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] z-0 animate-pulse pointer-events-none" />
        <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] z-0 pointer-events-none" />

        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center justify-center px-5 pb-20 pt-20 text-center">
          {/* Badge */}
          <div className="animate-fade-up mb-8">
            <div className="inline-flex items-center gap-2 rounded-md border border-indigo-500/20 bg-background/80 px-4 py-2 text-sm font-medium shadow-sm glass">
              <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent font-semibold">
                Introducing CareerForge AI Suite
              </span>
            </div>
          </div>

          {/* Heading */}
          <h1
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tight animate-fade-up leading-[1.1] max-w-full mx-auto px-2 break-words font-display"
            style={{ animationDelay: "0.1s" }}
          >
            <span className="text-foreground">Supercharge Your </span>
            <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient py-2 inline-block min-w-[320px] md:min-w-[500px]">
              <TypewriterText
                words={["Resumes", "Interviews", "Cover Letters", "Job Hunt"]}
                typingSpeed={100}
                deletingSpeed={60}
                pauseDelay={2500}
                className="whitespace-nowrap"
              />
            </span>
          </h1>

          {/* Subheading */}
          <p
            className="mt-8 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-fade-up font-medium"
            style={{ animationDelay: "0.2s" }}
          >
            Stop guessing what recruiters want. CareerForge uses advanced AI to
            build ATS-optimized resumes, prepare you for interviews, and track
            your applications in one unified platform.
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12 animate-fade-up w-full sm:w-auto"
            style={{ animationDelay: "0.3s" }}
          >
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto h-14 px-8 text-base font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-300 gap-2 rounded-xl shimmer-effect"
            >
              <Link href="/sign-up">
                <Sparkles size="18px" />
                Start Forging — It&apos;s Free
                <ArrowRight size="16px" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full sm:w-auto h-14 px-8 text-base font-semibold border-indigo-500/20 hover:bg-indigo-500/10 text-foreground transition-all duration-300 gap-2 rounded-xl glass"
            >
              <Link href="#how-it-works">See How It Works</Link>
            </Button>
          </div>

          {/* Stats Bar */}
          <div
            className="mt-16 grid w-full grid-cols-2 gap-4 rounded-lg border bg-card/80 px-4 py-6 shadow-sm animate-fade-up sm:mt-20 sm:gap-8 sm:px-6 sm:py-8 md:grid-cols-4"
          >
            <div className="flex flex-col items-center justify-center">
              <div className="text-2xl sm:text-3xl font-black text-foreground flex items-center">
                <AnimatedCounter target={10000} suffix="+" />
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1 font-medium text-center">
                Resumes Created
              </p>
            </div>
            <div className="flex flex-col items-center justify-center border-l-0 sm:border-l sm:border-border/50">
              <div className="text-2xl sm:text-3xl font-black text-foreground flex items-center">
                <AnimatedCounter target={95} suffix="%" />
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1 font-medium text-center">
                ATS Pass Rate
              </p>
            </div>
            <div className="flex flex-col items-center justify-center border-l-0 md:border-l border-border/50 pt-4 sm:pt-0">
              <div className="text-2xl sm:text-3xl font-black text-foreground flex items-center">
                <AnimatedCounter target={500} suffix="+" />
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1 font-medium text-center">
                Jobs Landed
              </p>
            </div>
            <div className="flex flex-col items-center justify-center border-l-0 sm:border-l sm:border-border/50 pt-4 sm:pt-0">
              <div className="text-2xl sm:text-3xl font-black text-foreground flex items-center gap-1">
                <AnimatedCounter target={4} suffix=".9" />
                <Star className="fill-yellow-400 text-yellow-400 w-4 h-4 sm:w-5 sm:h-5 ml-1" />
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1 font-medium text-center">
                User Rating
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Features Section ===== */}
      <section id="features" className="relative py-28 px-5">
        <CyberneticBentoGrid />
      </section>

      {/* ===== How It Works Section (Timeline Redesign) ===== */}
      <section id="how-it-works" className="relative py-28 px-5 mesh-gradient">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium border border-border mb-4 glass">
              <Target size="14px" className="text-indigo-500" />
              The Process
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">
              From Draft to{" "}
              <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
                Dream Offer
              </span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              A comprehensive system designed to optimize every stage of your
              job hunt.
            </p>
          </div>

          <div className="relative">
            {/* Center Line for Desktop */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500/0 via-indigo-500/50 to-indigo-500/0 transform -translate-x-1/2" />

            <div className="space-y-12 md:space-y-24">
              {[
                {
                  step: "01",
                  title: "Forge Your Profile",
                  description:
                    "Input your basic details or import from LinkedIn. Our AI analyzes your experience and generates high-impact, quantified bullet points tailored to your target roles.",
                  icon: <Bot className="text-indigo-500" size={24} />,
                  align: "left",
                },
                {
                  step: "02",
                  title: "Optimize for ATS",
                  description:
                    "Select from our library of premium, ATS-friendly templates. Fine-tune typography, spacing, and order with the drag-and-drop layout builder.",
                  icon: <Shield className="text-indigo-500" size={24} />,
                  align: "right",
                },
                {
                  step: "03",
                  title: "Track & Apply",
                  description:
                    "Use the built-in Kanban board to manage applications. Generate specific resume versions and targeted cover letters for each opportunity with one click.",
                  icon: <Briefcase className="text-indigo-500" size={24} />,
                  align: "left",
                },
                {
                  step: "04",
                  title: "Prep & Ace",
                  description:
                    "Identify skill gaps and practice with the AI Interview Coach. Get real-time feedback on your answers before you face the real hiring manager.",
                  icon: <Trophy className="text-indigo-500" size={24} />,
                  align: "right",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`relative flex flex-col md:flex-row items-center justify-between w-full ${item.align === "left" ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  {/* Content Box */}
                  <div className="w-full md:w-5/12 z-10 mb-8 md:mb-0">
                    <div className="p-8 rounded-2xl border border-border/50 bg-card/50 glass hover:bg-card/80 transition-colors group">
                      <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-6 border border-indigo-500/20 group-hover:scale-110 transition-transform">
                        {item.icon}
                      </div>
                      <div className="text-sm font-bold text-indigo-500 mb-2">
                        STEP {item.step}
                      </div>
                      <h3 className="font-bold text-2xl mb-3">{item.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Center Node */}
                  <div className="hidden md:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-4 border-background bg-indigo-500 items-center justify-center z-20 shadow-[0_0_20px_rgba(99,102,241,0.5)]">
                    <div className="w-4 h-4 rounded-full bg-white animate-pulse" />
                  </div>

                  {/* Empty space for the other side */}
                  <div className="hidden md:block w-5/12" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Testimonials Section ===== */}
      <section className="relative py-28 overflow-hidden bg-background">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="text-center mb-16 px-5">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
            Loved by <span className="text-indigo-500">Professionals</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how CareerForge AI is transforming job searches across
            industries.
          </p>
        </div>

        <TestimonialMarquee />
      </section>

      {/* ===== CTA Section ===== */}
      <section className="relative py-28 px-5">
        <div className="max-w-5xl mx-auto text-center">
          <div className="relative p-12 md:p-20 rounded-[2.5rem] bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 overflow-hidden shadow-2xl animate-glow-pulse">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float" />
            <div
              className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full blur-2xl animate-float"
              style={{ animationDelay: "2s" }}
            />
            <FallingPattern
              className="absolute inset-0 opacity-20"
              color="rgba(255,255,255,0.5)"
              backgroundColor="transparent"
            />

            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-6 leading-tight">
                Your Next Career Move
                <br />
                Starts Here
              </h2>
              <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10">
                Join thousands of professionals who have already accelerated
                their careers. Build your ATS-optimized resume in minutes, not
                hours.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  asChild
                  size="lg"
                  className="h-14 px-10 text-base font-bold bg-white text-indigo-600 hover:bg-white/90 shadow-xl shadow-black/20 transition-all duration-300 gap-2 rounded-xl w-full sm:w-auto"
                >
                  <Link href="/sign-up">
                    Start Building for Free
                    <ArrowRight size="16px" />
                  </Link>
                </Button>
                <p className="text-white/60 text-sm mt-4 sm:mt-0 sm:ml-4 flex items-center gap-2">
                  <CheckCircle2 size={16} /> No credit card required
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Expanded Footer ===== */}
      <footer className="border-t border-border/50 bg-card/20 pt-20 pb-10 px-5">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-16">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6 group">
              <Image
                src="/CareerForge_ai_final.png"
                alt="CareerForge AI Logo"
                width={40}
                height={40}
                className="group-hover:scale-110 transition-all duration-300 drop-shadow-[0_0_12px_rgba(99,102,241,0.4)]"
              />
              <span className="font-display font-bold text-2xl tracking-tight bg-gradient-to-r from-indigo-500 to-indigo-400 bg-clip-text text-transparent">
                CareerForge AI
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mb-6">
              The ultimate AI-powered career platform. Craft stunning resumes,
              ace your interviews, and land your dream job faster than ever.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://www.linkedin.com/in/himanshu-guptaa"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-500 hover:bg-indigo-500 hover:text-white transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://www.github.com/devhimanshuu"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-500 hover:bg-indigo-500 hover:text-white transition-colors"
              >
                <Github size={20} />
              </a>
              <a
                href="https://himanshuguptaa.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-500 hover:bg-indigo-500 hover:text-white transition-colors"
              >
                <Globe size={20} />
              </a>
              <a
                href="https://x.com/devhimanshuu"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-500 hover:bg-indigo-500 hover:text-white transition-colors"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-foreground">Platform</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link
                  href="#"
                  className="hover:text-indigo-500 transition-colors"
                >
                  Resume Builder
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-indigo-500 transition-colors"
                >
                  Cover Letters
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-indigo-500 transition-colors"
                >
                  Job Tracker
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-indigo-500 transition-colors"
                >
                  Interview Coach
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-foreground">Resources</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link
                  href="#"
                  className="hover:text-indigo-500 transition-colors"
                >
                  Career Blog
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-indigo-500 transition-colors"
                >
                  ATS Templates
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-indigo-500 transition-colors"
                >
                  Interview Questions
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-indigo-500 transition-colors"
                >
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-foreground">Company</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link
                  href="#"
                  className="hover:text-indigo-500 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-indigo-500 transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-indigo-500 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-indigo-500 transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-6xl mx-auto pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-muted-foreground md:flex-1 text-center md:text-left">
            © {new Date().getFullYear()} CareerForge AI. All rights reserved.
          </p>
          
          <div className="md:flex-1 flex justify-center">
            <div className="flex items-center gap-2 text-sm font-mono text-muted-foreground bg-indigo-500/5 px-4 py-1.5 rounded-full border border-indigo-500/20 hover:border-indigo-500/40 hover:bg-indigo-500/10 transition-all">
              <span className="text-indigo-500 font-bold">&lt;/&gt;</span>
              <span>crafted_by:</span>
              <a href="https://himanshuguptaa.vercel.app" target="_blank" rel="noopener noreferrer" className="font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
                himanshu_gupta
              </a>
            </div>
          </div>

          <div className="md:flex-1 flex justify-center md:justify-end">
            <div className="flex items-center gap-2 text-sm text-muted-foreground bg-background px-3 py-1.5 rounded-full border border-border">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
              All systems operational
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
