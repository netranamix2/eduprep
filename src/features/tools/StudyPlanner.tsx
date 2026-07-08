import { useState } from "react";
import { Calendar, ChevronLeft, ChevronRight, Flame, Target, TrendingUp, BookOpen, FileQuestion } from "lucide-react";
import { useStudyTasks, useWeeklyGoals, useWeekStudy } from "@/lib/query/hooks";
import { Card, Button, ProgressBar, SectionTitle } from "@/components/ui";
import { cn } from "@/lib/utils";
import {
  BarChart, Bar, XAxis, ResponsiveContainer, Cell,
} from "recharts";

const WEEK = [
  { day: "Mon", date: 6 }, { day: "Tue", date: 7 }, { day: "Wed", date: 8 },
  { day: "Thu", date: 9 }, { day: "Fri", date: 10 }, { day: "Sat", date: 11 }, { day: "Sun", date: 12 },
];

export function StudyPlanner() {
  const { data: tasks } = useStudyTasks();
  const { data: goals } = useWeeklyGoals();
  const { data: week } = useWeekStudy();
  const [activeDay, setActiveDay] = useState(10);
  const [completed, setCompleted] = useState<Set<string>>(new Set());

  const toggle = (id: string) =>
    setCompleted((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const isDone = (id: string, seed: boolean) => completed.has(id) || (seed && !completed.has(id));
  const doneCount = tasks?.filter((t) => isDone(t.id, t.done)).length ?? 0;
  const totalHours = week?.reduce((sum, d) => sum + d.hours, 0) ?? 0;

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* Schedule */}
      <Card className="p-6 lg:col-span-2">
        <div className="flex items-center justify-between">
          <SectionTitle icon={<Calendar size={18} />} title="Study Schedule" subtitle="Friday, April 10" />
          <div className="flex items-center gap-1">
            <button className="rounded-card border border-border p-1.5 text-ink-muted hover:text-ink"><ChevronLeft size={15} /></button>
            <button className="rounded-card border border-border px-3 py-1.5 text-sm">Today</button>
            <button className="rounded-card border border-border p-1.5 text-ink-muted hover:text-ink"><ChevronRight size={15} /></button>
          </div>
        </div>

        {/* Week strip */}
        <div className="mt-4 grid grid-cols-7 gap-2">
          {WEEK.map((d) => (
            <button
              key={d.date}
              onClick={() => setActiveDay(d.date)}
              className={cn(
                "flex flex-col items-center rounded-card border py-2.5 text-sm transition",
                activeDay === d.date ? "border-brand bg-brand text-white" : "border-border bg-bg-subtle text-ink-muted hover:text-ink"
              )}
            >
              <span className="text-xs">{d.day}</span>
              <span className="text-lg font-bold">{d.date}</span>
              <Flame size={11} className={activeDay === d.date ? "text-white" : "text-warning"} />
            </button>
          ))}
        </div>

        {/* Day stats */}
        <div className="mt-4 grid grid-cols-3 gap-3">
          {[
            { value: `${doneCount}/${tasks?.length ?? 0}`, label: "Tasks Done" },
            { value: "1h 45m", label: "Time Studied" },
            { value: "5", label: "Day Streak", flame: true },
          ].map((s) => (
            <div key={s.label} className="rounded-card border border-border bg-bg-subtle p-4 text-center">
              <p className="flex items-center justify-center gap-1 text-xl font-bold">
                {s.flame && <Flame size={16} className="text-warning" />}{s.value}
              </p>
              <p className="text-xs text-ink-muted">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Tasks */}
        <div className="mt-5 space-y-2">
          {tasks?.map((t) => {
            const done = isDone(t.id, t.done);
            return (
              <div key={t.id} className="flex items-center gap-3 rounded-card border border-border bg-bg-subtle px-4 py-3">
                <input
                  type="checkbox"
                  checked={done}
                  onChange={() => toggle(t.id)}
                  className="h-4 w-4 accent-brand"
                />
                <span className="h-8 w-1 rounded-full" style={{ backgroundColor: t.colorBar }} />
                <div className="flex-1">
                  <p className={cn("text-sm font-medium", done && "text-ink-muted line-through")}>
                    {t.title} <span className="ml-1 rounded-pill bg-bg-elevated px-2 py-0.5 text-xs text-ink-muted">{t.type}</span>
                  </p>
                  <p className="text-xs text-ink-muted">{t.time} · {t.durationMin} min</p>
                </div>
                <Button variant={done ? "secondary" : "primary"} size="sm">
                  {done ? "Review" : "Start"}
                </Button>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Right column */}
      <div className="space-y-6">
        <Card className="p-5">
          <h3 className="flex items-center gap-2 font-semibold"><Target size={16} className="text-brand" /> Weekly Goals</h3>
          <div className="mt-4 space-y-4">
            {goals?.map((g) => (
              <div key={g.id}>
                <p className="text-sm">{g.label}</p>
                <div className="mt-1.5 flex items-center gap-2">
                  <ProgressBar value={(g.current / g.total) * 100} className="flex-1" />
                  <span className="text-xs text-ink-muted">{g.current}/{g.total}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="flex items-center gap-2 font-semibold"><TrendingUp size={16} className="text-brand" /> This Week</h3>
          <div className="mt-3 h-32">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={week}>
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#5f6878", fontSize: 11 }} />
                <Bar dataKey="hours" radius={[4, 4, 0, 0]}>
                  {week?.map((d, i) => (
                    <Cell key={i} fill={d.hours > 0 ? "#5b6cff" : "#1f2430"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-ink-muted">Total this week</span>
            <span className="font-bold">{totalHours.toFixed(1)} hrs</span>
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="font-semibold">Quick Start</h3>
          <div className="mt-3 space-y-2">
            <button className="flex w-full items-center gap-2 rounded-card border border-border bg-bg-subtle px-3 py-2.5 text-sm hover:text-ink">
              <BookOpen size={15} className="text-brand" /> Continue Course
            </button>
            <button className="flex w-full items-center gap-2 rounded-card border border-border bg-bg-subtle px-3 py-2.5 text-sm hover:text-ink">
              <FileQuestion size={15} className="text-success" /> Practice Test
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
