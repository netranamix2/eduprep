import { useState } from "react";
import { Clock, BookOpen, Target, ChevronRight, Play, Crosshair } from "lucide-react";
import { useExamScores, usePracticeSections, useQuickQuestion } from "@/lib/query/hooks";
import { Card, Badge, Button, ProgressBar, PageHeader, SectionTitle } from "@/components/ui";
import { cn } from "@/lib/utils";

function ExamCard({
  exam, fullName, scoreLabel, targetLabel, progress, nextTest, active, onClick,
}: {
  exam: string; fullName: string; scoreLabel: string; targetLabel: string;
  progress: number; nextTest: string; active: boolean; onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-card border bg-bg-card p-5 text-left transition",
        active ? "border-brand ring-1 ring-brand" : "border-border hover:border-border-strong"
      )}
    >
      <div className="flex items-start justify-between">
        <Badge variant="brand">{exam}</Badge>
        <span className="text-3xl font-extrabold">{scoreLabel}</span>
      </div>
      <p className="mt-3 text-sm text-ink-muted">{fullName}</p>
      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="text-ink-muted">Target</span>
        <span className="font-semibold">{targetLabel}</span>
      </div>
      <ProgressBar value={progress} className="mt-2" />
      <div className="mt-4 flex items-center gap-1.5 text-xs text-ink-muted">
        <Clock size={12} /> Next test: {nextTest}
      </div>
    </button>
  );
}

export default function ExamPrepPage() {
  const { data: scores } = useExamScores();
  const [activeExam, setActiveExam] = useState("sat");
  const { data: sections } = usePracticeSections(activeExam);
  const { data: question } = useQuickQuestion();
  const [selected, setSelected] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-8">
      <PageHeader title="Exam Preparation" subtitle="Comprehensive preparation for standardized tests with AI-powered analytics" />

      {/* Score cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {scores?.map((s) => (
          <ExamCard
            key={s.id}
            {...s}
            active={activeExam === s.id}
            onClick={() => setActiveExam(s.id)}
          />
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Practice sections */}
        <Card className="p-6 lg:col-span-2">
          <SectionTitle
            icon={<BookOpen size={18} />}
            title={`${activeExam.toUpperCase()} Practice Sections`}
            subtitle="Complete practice sets to improve your score"
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {sections?.map((sec) => (
              <div key={sec.id} className="rounded-card border border-border bg-bg-subtle p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">{sec.title}</h4>
                    <p className="text-xs text-ink-muted">{sec.sets} practice sets</p>
                  </div>
                  <Button variant="secondary" size="sm">
                    Practice <ChevronRight size={14} />
                  </Button>
                </div>
                <ProgressBar value={sec.progress} className="mt-4" />
              </div>
            ))}
          </div>
          <Button className="mt-5 w-full" size="lg">
            <Play size={16} /> Start Full Mock Test (3h 15m)
          </Button>
        </Card>

        {/* Quick practice */}
        <Card className="p-6">
          <SectionTitle icon={<Crosshair size={18} />} title="Quick Practice" />
          {question && (
            <>
              <div className="rounded-card border border-border bg-bg-subtle p-4">
                <Badge variant="brand">{question.subjectTag}</Badge>
                <p className="mt-3 font-medium">{question.prompt}</p>
              </div>
              <div className="mt-4 space-y-2">
                {question.options.map((opt) => {
                  const isCorrect = checked && opt.id === question.correctOptionId;
                  const isWrong = checked && selected === opt.id && opt.id !== question.correctOptionId;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => !checked && setSelected(opt.id)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-card border px-4 py-3 text-left text-sm transition",
                        isCorrect && "border-success bg-success/10",
                        isWrong && "border-danger bg-danger/10",
                        !checked && selected === opt.id && "border-brand bg-brand-soft",
                        !checked && selected !== opt.id && "border-border hover:border-border-strong"
                      )}
                    >
                      <span
                        className={cn(
                          "h-4 w-4 rounded-full border",
                          selected === opt.id ? "border-brand bg-brand" : "border-border"
                        )}
                      />
                      {opt.label}
                    </button>
                  );
                })}
              </div>
              <Button
                className="mt-4 w-full"
                variant={checked ? "secondary" : "primary"}
                disabled={!selected}
                onClick={() => setChecked(true)}
              >
                {checked ? "Next Question" : "Check Answer"}
              </Button>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
