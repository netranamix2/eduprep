import { useState } from "react";
import {
  Search, SlidersHorizontal, LayoutGrid, List, TrendingUp, Sparkles,
  Users2, Star, Clock, BookOpen,
} from "lucide-react";
import { useCourses } from "@/lib/query/hooks";
import { Badge, Button, PageHeader } from "@/components/ui";
import { cn } from "@/lib/utils";
import type { Course, CourseSort } from "@/types";

const FILTER_TABS: { id: CourseSort; label: string; icon: typeof TrendingUp }[] = [
  { id: "trending", label: "Trending", icon: TrendingUp },
  { id: "new", label: "New Releases", icon: Sparkles },
  { id: "popular", label: "Most Popular", icon: Users2 },
  { id: "rated", label: "Highest Rated", icon: Star },
  { id: "free", label: "Free Courses", icon: BookOpen },
];

function fmtCount(n: number) {
  return n.toLocaleString("en-US").replace(/,/g, " ");
}

function CourseCard({ course }: { course: Course }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-card border border-border bg-bg-card transition hover:border-border-strong">
      {/* Thumbnail */}
      <div className="relative h-44 bg-gradient-to-br from-bg-elevated to-bg-input">
        <Badge variant="brand" className="absolute left-3 top-3 backdrop-blur">
          {course.level}
        </Badge>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <Badge className="w-fit">{course.category}</Badge>
        <h3 className="mt-3 font-semibold leading-snug text-ink">{course.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-ink-muted">{course.description}</p>

        {/* Instructor */}
        <div className="mt-4 flex items-center gap-2">
          <span className="grid h-6 w-6 place-items-center rounded-full bg-brand-soft text-[10px] font-semibold text-brand">
            {course.instructor.initials}
          </span>
          <span className="text-sm text-ink-muted">{course.instructor.name}</span>
        </div>

        {/* Meta row */}
        <div className="mt-4 flex items-center gap-4 border-t border-border-subtle pt-4 text-xs text-ink-muted">
          <span className="flex items-center gap-1">
            <Clock size={13} />
            {course.durationHours}h {String(course.durationMinutes).padStart(2, "0")}m
          </span>
          <span className="flex items-center gap-1">
            <Users2 size={13} />
            {fmtCount(course.students)}
          </span>
          <span className="flex items-center gap-1">
            <Star size={13} className="fill-warning text-warning" />
            <span className="font-medium text-ink">{course.rating}</span>
            ({fmtCount(course.ratingCount)})
          </span>
        </div>

        {/* Price + CTA */}
        <div className="mt-5 flex items-center justify-between">
          {course.price === "free" ? (
            <Badge variant="success">Free</Badge>
          ) : (
            <span className="text-xl font-extrabold">${course.price}</span>
          )}
          <Button size="sm">
            <BookOpen size={14} /> Enroll Now
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function CoursesPage() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<CourseSort>("trending");
  const [view, setView] = useState<"grid" | "list">("grid");
  const { data: courses, isLoading } = useCourses(search, sort);

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-8">
      <PageHeader title="Explore Courses" subtitle="Discover over 15,000 courses taught by expert instructors" />

      {/* Search + dropdowns */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative min-w-64 flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search courses..."
            className="w-full rounded-card border border-border bg-bg-card py-2.5 pl-10 pr-3 text-sm outline-none placeholder:text-ink-faint focus:border-brand-muted"
          />
        </div>
        {["All", "All Levels", "Most Popular"].map((label) => (
          <button
            key={label}
            className="rounded-card border border-border bg-bg-card px-4 py-2.5 text-sm text-ink-muted hover:text-ink"
          >
            {label}
          </button>
        ))}
        <Button variant="outline">
          <SlidersHorizontal size={15} /> Filters
        </Button>
      </div>

      {/* Result count + view toggle */}
      <div className="mt-5 flex items-center justify-between">
        <span className="text-sm text-ink-muted">
          Showing {courses?.length ?? 0} courses
        </span>
        <div className="flex items-center gap-1 rounded-pill border border-border bg-bg-card p-1">
          {(["grid", "list"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={cn(
                "flex items-center gap-1.5 rounded-pill px-3 py-1 text-xs font-medium capitalize transition",
                view === v ? "bg-bg-elevated text-ink" : "text-ink-muted"
              )}
            >
              {v === "grid" ? <LayoutGrid size={13} /> : <List size={13} />}
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* Filter tabs */}
      <div className="mt-5 flex flex-wrap gap-2">
        {FILTER_TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setSort(t.id)}
            className={cn(
              "flex items-center gap-1.5 rounded-pill border px-3.5 py-1.5 text-sm font-medium transition",
              sort === t.id
                ? "border-brand-muted bg-brand-soft text-brand"
                : "border-border bg-bg-card text-ink-muted hover:text-ink"
            )}
          >
            <t.icon size={14} /> {t.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-96 animate-pulse rounded-card bg-bg-card" />
          ))}
        </div>
      ) : courses && courses.length > 0 ? (
        <div
          className={cn(
            "mt-8 grid gap-6",
            view === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
          )}
        >
          {courses.map((c) => (
            <CourseCard key={c.id} course={c} />
          ))}
        </div>
      ) : (
        <div className="mt-16 text-center text-ink-muted">
          No courses match your search. Try a different term.
        </div>
      )}
    </div>
  );
}
