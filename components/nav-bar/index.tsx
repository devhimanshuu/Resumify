"use client";
import { Sparkles, Zap, FileText, ArrowRight } from "lucide-react";
import {
  SignInButton,
  SignUpButton,
} from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const NavBar = () => {
  return (
    <nav className="w-full sticky top-0 z-[9999] glass">
      <div className="w-full mx-auto max-w-7xl px-5 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:shadow-indigo-500/40 transition-all duration-300">
            <FileText size="16px" className="text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
            Resumify
          </span>
        </Link>

        {/* Nav Links */}
        <div className="hidden lg:flex">
          <ul className="flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <li>
              <Link
                href="#features"
                className="hover:text-foreground transition-colors duration-200"
              >
                Features
              </Link>
            </li>
            <li>
              <Link
                href="#how-it-works"
                className="hover:text-foreground transition-colors duration-200"
              >
                How it Works
              </Link>
            </li>
            <li>
              <Link
                href="#pricing"
                className="hover:text-foreground transition-colors duration-200"
              >
                Pricing
              </Link>
            </li>
          </ul>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          <SignInButton mode="modal">
            <Button
              variant="ghost"
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Sign In
            </Button>
          </SignInButton>
          <SignUpButton mode="modal">
            <Button className="text-sm font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-300 gap-1.5">
              <Sparkles size="14px" />
              Get Started Free
            </Button>
          </SignUpButton>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
