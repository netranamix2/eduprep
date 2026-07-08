import { Link } from "react-router-dom";
import { ArrowRight, Play, Sparkles, Users, BookOpen, Award } from "lucide-react";
import { Button } from "@/components/ui";
import { ROUTES } from "@/routes/config";

const STATS = [
  { icon: Users, value: "2M+", label: "Active Learners" },
  { icon: BookOpen, value: "15K+", label: "Expert Courses" },
  { icon: Award, value: "500K+", label: "Certificates Issued" },
];

export default function LandingPage() {
  return (
    <div className="relative overflow-hidden">
      <div className="mx-auto max-w-4xl px-6 pb-20 pt-20 text-center">
        <span className="inline-flex items-center gap-2 rounded-pill border border-border bg-bg-card px-4 py-1.5 text-sm text-ink-muted">
          <Sparkles size={14} className="text-brand" />
          AI-Powered Learning Platform
        </span>

        <h1 className="mt-8 text-6xl font-extrabold leading-[1.05] tracking-tight">
          Master Any Skill with
          <br />
          <span className="gradient-text">Intelligent Learning</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-ink-muted">
          Personalized courses, AI tutoring, exam prep for SAT, IELTS, TOEFL, and career
          roadmaps. Join millions of learners transforming their futures.
        </p>

        <div className="mt-10 flex items-center justify-center gap-3">
          <Link
            to={ROUTES.courses}
            className="inline-flex items-center justify-center gap-2 rounded-[12px] bg-brand px-6 py-3 text-base font-semibold text-white transition hover:bg-brand-hover"
          >
            Start Learning Free <ArrowRight size={18} />
          </Link>
          <Button variant="secondary" size="lg">
            <Play size={16} /> Watch Demo
          </Button>
        </div>

        <div className="mx-auto mt-20 grid max-w-2xl grid-cols-3 gap-8">
          {STATS.map((s) => (
            <div key={s.label} className="flex flex-col items-center">
              <div className="grid h-12 w-12 place-items-center rounded-[14px] bg-bg-card text-brand">
                <s.icon size={22} />
              </div>
              <div className="mt-3 text-3xl font-extrabold">{s.value}</div>
              <div className="mt-1 text-sm text-ink-muted">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
