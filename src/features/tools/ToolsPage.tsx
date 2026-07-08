import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Camera, Layers, Calendar, FileText } from "lucide-react";
import { useUIStore } from "@/lib/store/ui";
import { PageHeader } from "@/components/ui";
import { cn } from "@/lib/utils";
import { PhotoSolver } from "./PhotoSolver";
import { Flashcards } from "./Flashcards";
import { StudyPlanner } from "./StudyPlanner";
import { Notes } from "./Notes";

const TABS = [
  { id: "photo-solver", label: "Photo Solver", icon: Camera },
  { id: "flashcards", label: "Flashcards", icon: Layers },
  { id: "study-planner", label: "Study Planner", icon: Calendar },
  { id: "notes", label: "Notes", icon: FileText },
] as const;

export default function ToolsPage() {
  const [params, setParams] = useSearchParams();
  const tab = useUIStore((s) => s.toolsTab);
  const setTab = useUIStore((s) => s.setToolsTab);

  // URL is source of truth; sync into store.
  useEffect(() => {
    const urlTab = params.get("tab") as typeof tab | null;
    if (urlTab && urlTab !== tab) setTab(urlTab);
  }, [params, tab, setTab]);

  const select = (id: (typeof TABS)[number]["id"]) => {
    setTab(id);
    setParams({ tab: id });
  };

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-8">
      <PageHeader title="Learning Tools" subtitle="Powerful tools to enhance your learning experience" />

      <div className="mb-6 flex gap-1 rounded-card border border-border bg-bg-card p-1">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => select(t.id)}
            className={cn(
              "flex flex-1 items-center justify-center gap-2 rounded-[12px] px-4 py-2.5 text-sm font-medium transition",
              tab === t.id ? "bg-bg-elevated text-ink" : "text-ink-muted hover:text-ink"
            )}
          >
            <t.icon size={15} /> {t.label}
          </button>
        ))}
      </div>

      {tab === "photo-solver" && <PhotoSolver />}
      {tab === "flashcards" && <Flashcards />}
      {tab === "study-planner" && <StudyPlanner />}
      {tab === "notes" && <Notes />}
    </div>
  );
}
