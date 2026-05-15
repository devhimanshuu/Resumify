"use client";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  text: string;
  rating: number;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Sarah Chen",
    role: "Software Engineer",
    company: "Google",
    text: "CareerForge AI helped me craft the perfect resume that got me callbacks from 8 out of 10 companies I applied to. The AI suggestions were incredibly on-point.",
    rating: 5,
    avatar: "SC",
  },
  {
    name: "Marcus Johnson",
    role: "Product Manager",
    company: "Meta",
    text: "The Interview Coach feature is a game-changer. I practiced for my PM interviews and felt completely prepared. Landed my dream role within 3 weeks!",
    rating: 5,
    avatar: "MJ",
  },
  {
    name: "Priya Sharma",
    role: "Data Analyst",
    company: "Amazon",
    text: "The Skill Gap Analyzer showed me exactly which certifications would make my profile stand out. Went from zero callbacks to multiple offers.",
    rating: 5,
    avatar: "PS",
  },
  {
    name: "David Kim",
    role: "UX Designer",
    company: "Apple",
    text: "Beautiful resume templates that actually pass ATS systems. The real-time preview is incredibly smooth. Best career tool I have ever used.",
    rating: 5,
    avatar: "DK",
  },
  {
    name: "Emma Rodriguez",
    role: "Marketing Lead",
    company: "Spotify",
    text: "The AI Cover Letter generator saved me hours of writing. Each letter felt personalized and professional. Got compliments from recruiters!",
    rating: 5,
    avatar: "ER",
  },
  {
    name: "Alex Turner",
    role: "DevOps Engineer",
    company: "Netflix",
    text: "The Kanban job tracker keeps my entire search organized. No more messy spreadsheets. I can see my pipeline at a glance and never miss a follow-up.",
    rating: 5,
    avatar: "AT",
  },
];

const avatarColors = [
  "from-indigo-500 to-purple-600",
  "from-emerald-500 to-teal-600",
  "from-pink-500 to-rose-600",
  "from-amber-500 to-orange-600",
  "from-cyan-500 to-blue-600",
  "from-violet-500 to-fuchsia-600",
];

function TestimonialCard({ testimonial, index }: { testimonial: Testimonial; index: number }) {
  return (
    <div className="flex-shrink-0 w-[380px] p-6 rounded-2xl border border-border/50 bg-card/50 glass mx-3 group hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-center gap-1 mb-4">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} size="14px" className="fill-yellow-400 text-yellow-400" />
        ))}
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed mb-6">
        &ldquo;{testimonial.text}&rdquo;
      </p>
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "w-10 h-10 rounded-full bg-gradient-to-br flex items-center justify-center text-white text-xs font-bold",
            avatarColors[index % avatarColors.length]
          )}
        >
          {testimonial.avatar}
        </div>
        <div>
          <div className="font-semibold text-sm">{testimonial.name}</div>
          <div className="text-xs text-muted-foreground">
            {testimonial.role} at {testimonial.company}
          </div>
        </div>
      </div>
    </div>
  );
}

export function TestimonialMarquee() {
  const row1 = testimonials.slice(0, 3);
  const row2 = testimonials.slice(3, 6);

  return (
    <div className="w-full overflow-hidden py-4">
      {/* Row 1 - scrolls left */}
      <div className="flex animate-marquee-left mb-6">
        {[...row1, ...row1, ...row1].map((t, i) => (
          <TestimonialCard key={`r1-${i}`} testimonial={t} index={i} />
        ))}
      </div>
      {/* Row 2 - scrolls right */}
      <div className="flex animate-marquee-right">
        {[...row2, ...row2, ...row2].map((t, i) => (
          <TestimonialCard key={`r2-${i}`} testimonial={t} index={i + 3} />
        ))}
      </div>
    </div>
  );
}
