import { useState } from "react";
import { FileText, Plus, Search } from "lucide-react";
import { Card, Button } from "@/components/ui";
import { cn } from "@/lib/utils";

interface Note {
  id: string;
  title: string;
  subject: string;
  preview: string;
  updated: string;
}

const SEED_NOTES: Note[] = [
  { id: "n1", title: "Quadratic Formula Derivation", subject: "Math", preview: "Starting from ax² + bx + c = 0, divide through by a…", updated: "2h ago" },
  { id: "n2", title: "IELTS Writing Task 2 Structure", subject: "English", preview: "Introduction → paraphrase the prompt, state position…", updated: "Yesterday" },
  { id: "n3", title: "Cellular Respiration Stages", subject: "Biology", preview: "Glycolysis, Krebs cycle, electron transport chain…", updated: "3 days ago" },
];

export function Notes() {
  const [notes] = useState(SEED_NOTES);
  const [activeId, setActiveId] = useState("n1");
  const [search, setSearch] = useState("");

  const filtered = notes.filter((n) => n.title.toLowerCase().includes(search.toLowerCase()));
  const active = notes.find((n) => n.id === activeId);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[320px_1fr]">
      {/* List */}
      <Card className="p-5">
        <div className="flex items-center justify-between">
          <h3 className="flex items-center gap-2 font-semibold"><FileText size={16} /> Study Notes</h3>
          <Button size="sm"><Plus size={14} /> New</Button>
        </div>
        <div className="relative mt-4">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search notes..."
            className="w-full rounded-card border border-border bg-bg-subtle py-2 pl-9 pr-3 text-sm outline-none placeholder:text-ink-faint"
          />
        </div>
        <div className="mt-4 space-y-2">
          {filtered.map((n) => (
            <button
              key={n.id}
              onClick={() => setActiveId(n.id)}
              className={cn(
                "w-full rounded-card border p-3 text-left transition",
                activeId === n.id ? "border-brand bg-brand-soft" : "border-border bg-bg-subtle hover:border-border-strong"
              )}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{n.title}</span>
              </div>
              <p className="mt-1 line-clamp-1 text-xs text-ink-muted">{n.preview}</p>
              <div className="mt-2 flex items-center justify-between text-[11px] text-ink-faint">
                <span className="rounded-pill bg-bg-elevated px-2 py-0.5">{n.subject}</span>
                <span>{n.updated}</span>
              </div>
            </button>
          ))}
        </div>
      </Card>

      {/* Editor */}
      <Card className="p-6">
        {active && (
          <>
            <input
              defaultValue={active.title}
              className="w-full bg-transparent text-2xl font-bold outline-none"
            />
            <div className="mt-2 flex items-center gap-2 text-xs text-ink-muted">
              <span className="rounded-pill bg-bg-elevated px-2 py-0.5">{active.subject}</span>
              <span>Updated {active.updated}</span>
            </div>
            <textarea
              defaultValue={`${active.preview}\n\n(Start typing your notes here…)`}
              className="mt-5 min-h-[400px] w-full resize-none bg-transparent text-sm leading-relaxed outline-none placeholder:text-ink-faint"
            />
          </>
        )}
      </Card>
    </div>
  );
}
