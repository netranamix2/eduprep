import { useState, useRef, useEffect } from "react";
import {
  Brain, Calculator, Languages, FlaskConical, Code2, Camera, History,
  Layers, FileText, Paperclip, Mic, Send,
} from "lucide-react";
import { useTutorHistory, useSendTutorMessage } from "@/lib/query/hooks";
import { useUIStore } from "@/lib/store/ui";
import { Card, PageHeader } from "@/components/ui";
import { cn } from "@/lib/utils";
import type { TutorSubject } from "@/types";

const SUBJECTS: { id: TutorSubject; label: string; icon: typeof Calculator }[] = [
  { id: "math", label: "Math", icon: Calculator },
  { id: "english", label: "English", icon: Languages },
  { id: "science", label: "Science", icon: FlaskConical },
  { id: "coding", label: "Coding", icon: Code2 },
];

const FEATURES = [
  { label: "Photo Solver", icon: Camera },
  { label: "Chat History", icon: History },
  { label: "Flashcards", icon: Layers },
  { label: "Study Notes", icon: FileText },
];

const SUGGESTIONS = [
  "Explain this concept simply",
  "Give me practice problems",
  "What are common mistakes?",
  "Show step-by-step solution",
];

export default function TutorPage() {
  const { data: messages } = useTutorHistory();
  const send = useSendTutorMessage();
  const subject = useUIStore((s) => s.tutorSubject);
  const setSubject = useUIStore((s) => s.setTutorSubject);
  const [draft, setDraft] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const submit = (text: string) => {
    if (text.trim()) {
      send.mutate(text.trim());
      setDraft("");
    }
  };

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-8">
      <PageHeader title="AI Learning Assistant" subtitle="Get instant help with any subject. Upload photos, ask questions, and learn smarter." />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[300px_1fr]">
        {/* Sidebar */}
        <Card className="h-fit p-5">
          <h2 className="flex items-center gap-2 font-semibold text-brand">
            <Brain size={18} /> AI Tutor
          </h2>

          <p className="mt-5 text-sm font-medium text-ink-muted">Select Subject</p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {SUBJECTS.map((s) => (
              <button
                key={s.id}
                onClick={() => setSubject(s.id)}
                className={cn(
                  "flex flex-col items-center gap-2 rounded-card border py-4 text-sm font-medium transition",
                  subject === s.id
                    ? "border-brand bg-brand-soft text-brand"
                    : "border-border bg-bg-subtle text-ink-muted hover:text-ink"
                )}
              >
                <s.icon size={20} />
                {s.label}
              </button>
            ))}
          </div>

          <p className="mt-6 text-sm font-medium text-ink-muted">Features</p>
          <div className="mt-3 space-y-1">
            {FEATURES.map((f) => (
              <button
                key={f.label}
                className="flex w-full items-center gap-3 rounded-card px-3 py-2 text-sm text-ink-muted transition hover:bg-bg-subtle hover:text-ink"
              >
                <f.icon size={16} /> {f.label}
              </button>
            ))}
          </div>

          <div className="mt-6 rounded-card border border-border bg-bg-subtle p-4">
            <p className="text-sm font-medium">Today's Progress</p>
            <div className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-ink-muted">Questions Asked</span><span className="font-semibold">12</span></div>
              <div className="flex justify-between"><span className="text-ink-muted">Problems Solved</span><span className="font-semibold">8</span></div>
              <div className="flex justify-between"><span className="text-ink-muted">Study Time</span><span className="font-semibold">45 min</span></div>
            </div>
          </div>
        </Card>

        {/* Chat */}
        <Card className="flex h-[640px] flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border p-5">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-[12px] bg-brand text-white">
                <Brain size={20} />
              </span>
              <div>
                <h3 className="font-semibold">AI Learning Assistant</h3>
                <p className="text-xs text-ink-muted">Ask anything, upload problems, get instant help</p>
              </div>
            </div>
            <span className="flex items-center gap-1.5 text-xs text-success">
              <span className="h-2 w-2 rounded-full bg-success" /> Online
            </span>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-5">
            {messages?.map((m) => (
              <div key={m.id} className={cn("flex gap-3", m.role === "user" && "flex-row-reverse")}>
                {m.role === "assistant" && (
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[10px] bg-brand text-white">
                    <Brain size={16} />
                  </span>
                )}
                <div
                  className={cn(
                    "max-w-[75%] rounded-card px-4 py-3 text-sm",
                    m.role === "user" ? "bg-brand text-white" : "bg-bg-elevated text-ink"
                  )}
                >
                  <p className="whitespace-pre-wrap leading-relaxed">{m.content}</p>
                  <p className={cn("mt-1.5 text-[11px]", m.role === "user" ? "text-white/70" : "text-ink-faint")}>
                    {m.timestamp}
                  </p>
                </div>
              </div>
            ))}
            {send.isPending && (
              <div className="flex gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[10px] bg-brand text-white">
                  <Brain size={16} />
                </span>
                <div className="rounded-card bg-bg-elevated px-4 py-3">
                  <span className="flex gap-1">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-ink-faint [animation-delay:-0.3s]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-ink-faint [animation-delay:-0.15s]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-ink-faint" />
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Suggestions */}
          <div className="flex flex-wrap gap-2 px-5 pb-3">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => submit(s)}
                className="rounded-card border border-border bg-bg-subtle px-3 py-1.5 text-xs text-ink-muted transition hover:text-ink"
              >
                {s}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 border-t border-border p-4">
            <button className="text-ink-muted hover:text-ink"><Camera size={18} /></button>
            <button className="text-ink-muted hover:text-ink"><Paperclip size={18} /></button>
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && submit(draft)}
              placeholder="Ask me anything..."
              className="flex-1 rounded-card border border-border bg-bg-input px-4 py-2.5 text-sm outline-none placeholder:text-ink-faint focus:border-brand-muted"
            />
            <button className="text-ink-muted hover:text-ink"><Mic size={18} /></button>
            <button
              onClick={() => submit(draft)}
              className="grid h-10 w-10 place-items-center rounded-card bg-brand text-white transition hover:bg-brand-hover"
            >
              <Send size={16} />
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
