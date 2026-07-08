import { Upload, Camera, Calculator, FlaskConical, Atom, Languages, History, CheckCircle2 } from "lucide-react";
import { useRecentSolutions } from "@/lib/query/hooks";
import { Card, Badge, Button, SectionTitle } from "@/components/ui";

const SUBJECTS = [
  { label: "Math", icon: Calculator, color: "text-brand" },
  { label: "Chemistry", icon: FlaskConical, color: "text-[#c084fc]" },
  { label: "Physics", icon: Atom, color: "text-warning" },
  { label: "Languages", icon: Languages, color: "text-success" },
];

const TIPS = [
  "Ensure good lighting and clear focus",
  "Capture the complete problem",
  "Avoid shadows and glare",
];

export function PhotoSolver() {
  const { data: solutions } = useRecentSolutions();

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* Upload zone */}
      <Card className="p-6 lg:col-span-2">
        <SectionTitle
          icon={<Camera size={18} />}
          title="Photo Problem Solver"
          subtitle="Upload or take a photo of any math, physics, or chemistry problem"
        />
        <div className="flex flex-col items-center justify-center rounded-card border-2 border-dashed border-border py-16">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-bg-elevated text-ink-muted">
            <Upload size={24} />
          </span>
          <p className="mt-4 font-semibold">Upload a problem image</p>
          <p className="mt-1 text-sm text-ink-muted">Drag and drop an image here, or click to browse</p>
          <div className="mt-5 flex gap-3">
            <Button>
              <Upload size={15} /> Browse Files
            </Button>
            <Button variant="secondary">
              <Camera size={15} /> Take Photo
            </Button>
          </div>
          <p className="mt-4 text-xs text-ink-faint">Supports JPG, PNG, HEIC. Max 10MB.</p>
        </div>
      </Card>

      {/* Sidebar */}
      <div className="space-y-6">
        <Card className="p-5">
          <h3 className="font-semibold">Supported Subjects</h3>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {SUBJECTS.map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-2 rounded-card border border-border bg-bg-subtle py-4">
                <s.icon size={18} className={s.color} />
                <span className="text-sm">{s.label}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="flex items-center gap-2 font-semibold">
            <History size={16} /> Recent Solutions
          </h3>
          <div className="mt-4 space-y-3">
            {solutions?.map((s) => (
              <div key={s.id} className="rounded-card border border-border bg-bg-subtle p-3">
                <div className="flex items-center justify-between">
                  <Badge>{s.subject}</Badge>
                  <span className="text-xs text-ink-faint">{s.time}</span>
                </div>
                <p className="mt-2 text-sm">{s.problem}</p>
                <p className="mt-1 text-sm text-brand">{s.solution}</p>
              </div>
            ))}
          </div>
          <button className="mt-3 w-full text-center text-sm text-brand hover:underline">
            View All History
          </button>
        </Card>

        <Card className="p-5">
          <h3 className="font-semibold">Tips for Better Results</h3>
          <div className="mt-3 space-y-2">
            {TIPS.map((t) => (
              <p key={t} className="flex items-center gap-2 text-sm text-ink-muted">
                <CheckCircle2 size={14} className="text-success" /> {t}
              </p>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
