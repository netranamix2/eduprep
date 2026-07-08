import { Compass, BookOpen, Lock, Check, ArrowRight, GraduationCap } from "lucide-react";
import { useJourney } from "@/lib/query/hooks";
import { Card, Badge, Button, ProgressBar, PageHeader, SectionTitle } from "@/components/ui";
import { cn } from "@/lib/utils";

export default function JourneyPage() {
  const { data, isLoading } = useJourney();

  if (isLoading || !data)
    return (
      <div className="mx-auto max-w-[1400px] px-6 py-8">
        <div className="h-96 animate-pulse rounded-card bg-bg-card" />
      </div>
    );

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-8">
      <PageHeader title="My Academic Journey" subtitle="Track your progress from K-12 through university admission" />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main journey card */}
        <Card className="p-6 lg:col-span-2">
          <div className="flex items-start justify-between">
            <SectionTitle
              icon={<Compass size={18} />}
              title="Your Academic Journey"
              subtitle="K-12 progress tracking to university admission"
            />
            <Badge variant="brand">Grade 7 - Middle School</Badge>
          </div>

          {/* Stage pills */}
          <div className="flex flex-wrap gap-2">
            {data.stages.map((stage) => (
              <div
                key={stage.id}
                className={cn(
                  "flex items-center gap-1.5 rounded-card border px-3 py-1.5 text-sm font-medium",
                  stage.active
                    ? "border-brand bg-brand-soft text-brand"
                    : stage.unlocked
                      ? "border-border bg-bg-subtle text-ink-muted"
                      : "border-border bg-bg-subtle text-ink-faint"
                )}
              >
                {stage.label}
                {stage.unlocked ? (
                  <Check size={13} className={stage.active ? "text-brand" : "text-success"} />
                ) : (
                  <Lock size={12} />
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* Left: stage detail */}
            <div>
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-[14px] bg-success/20 text-success">
                  <GraduationCap size={22} />
                </div>
                <div>
                  <h3 className="font-bold">{data.stageTitle}</h3>
                  <p className="text-xs text-ink-muted">{data.stageMeta}</p>
                </div>
              </div>

              <div className="mt-5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-ink-muted">Overall Progress</span>
                  <span className="font-semibold">{data.overallProgress}%</span>
                </div>
                <ProgressBar value={data.overallProgress} className="mt-2" />
              </div>

              <div className="mt-5">
                <p className="text-sm font-medium">Core Subjects</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {data.coreSubjects.map((s) => (
                    <Badge key={s}>{s}</Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: milestones */}
            <div>
              <p className="text-sm font-medium">Key Milestones</p>
              <div className="mt-3 space-y-3">
                {data.milestones.map((m) => (
                  <div key={m.id} className="flex items-center gap-3">
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-bg-elevated text-xs font-semibold text-brand">
                      {m.order}
                    </span>
                    <span className="text-sm">{m.label}</span>
                  </div>
                ))}
              </div>
              <Button className="mt-6 w-full">
                Continue Learning <ArrowRight size={16} />
              </Button>
            </div>
          </div>
        </Card>

        {/* Subject performance */}
        <Card className="p-6">
          <SectionTitle
            icon={<BookOpen size={18} />}
            title="Subject Performance"
            subtitle="Track progress across all subjects"
          />
          <div className="space-y-4">
            {data.subjects.map((subj) => (
              <div key={subj.id}>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: subj.color }} />
                    {subj.name}
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="font-semibold">{subj.grade}</span>
                    <span className="text-ink-muted">{subj.percent}%</span>
                  </span>
                </div>
                <ProgressBar value={subj.percent} color={subj.color} className="mt-2" />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
