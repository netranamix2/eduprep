import { useState } from "react";
import { Brain, ChevronLeft, ChevronRight, Shuffle, X, Check } from "lucide-react";
import { useFlashcards } from "@/lib/query/hooks";
import { Badge, ProgressBar } from "@/components/ui";
import { cn } from "@/lib/utils";

export function Flashcards() {
  const { data: cards } = useFlashcards();
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [mastered, setMastered] = useState<Set<string>>(new Set());

  if (!cards || cards.length === 0) return null;

  const card = cards[index];
  const masteredCount = cards.filter((c) => mastered.has(c.id) || c.mastered).length;

  const go = (dir: 1 | -1) => {
    setFlipped(false);
    setIndex((i) => (i + dir + cards.length) % cards.length);
  };

  const markMastered = () => {
    setMastered((prev) => new Set(prev).add(card.id));
    go(1);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Flashcard Study</h2>
          <p className="text-sm text-ink-muted">{masteredCount} of {cards.length} cards mastered</p>
        </div>
        <div className="flex gap-2">
          <button className="rounded-card bg-brand px-3 py-1.5 text-sm font-medium text-white">All Cards</button>
          <button className="rounded-card border border-border px-3 py-1.5 text-sm text-ink-muted hover:text-ink">Need Review</button>
        </div>
      </div>

      <ProgressBar value={(masteredCount / cards.length) * 100} className="mt-4 h-2" />

      {/* Card */}
      <div className="mt-6 flex items-center gap-4">
        <button onClick={() => go(-1)} className="text-ink-faint hover:text-ink">
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={() => setFlipped((f) => !f)}
          className="flex min-h-[280px] flex-1 flex-col items-center justify-center rounded-card border border-border bg-bg-card p-8 text-center transition hover:border-border-strong"
        >
          <div className="flex w-full items-center justify-between">
            <div className="flex gap-2">
              <Badge>{card.topic}</Badge>
              <Badge variant={card.difficulty === "easy" ? "success" : card.difficulty === "medium" ? "warning" : "danger"}>
                {card.difficulty}
              </Badge>
            </div>
            <span className="text-sm text-ink-faint">{index + 1} / {cards.length}</span>
          </div>
          <Brain size={28} className="mt-8 text-brand" />
          <p className="mt-4 text-xl font-semibold">{flipped ? card.answer : card.question}</p>
          <p className="mt-3 text-sm text-ink-muted">{flipped ? "Click to see question" : "Click to reveal answer"}</p>
        </button>

        <button onClick={() => go(1)} className="text-ink-faint hover:text-ink">
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Controls */}
      <div className="mt-5 flex flex-col items-center gap-3">
        <div className="flex gap-3">
          <button
            onClick={() => go(1)}
            className="flex items-center gap-2 rounded-card border border-danger/40 bg-danger/10 px-4 py-2 text-sm font-medium text-danger"
          >
            <X size={15} /> Still Learning
          </button>
          <button
            onClick={markMastered}
            className="flex items-center gap-2 rounded-card border border-success/40 bg-success/10 px-4 py-2 text-sm font-medium text-success"
          >
            <Check size={15} /> Got It!
          </button>
        </div>
        <div className="flex items-center gap-4 text-sm text-ink-muted">
          <button onClick={() => go(-1)} className="flex items-center gap-1 hover:text-ink"><ChevronLeft size={14} /> Previous</button>
          <button onClick={() => setIndex(Math.floor(Math.random() * cards.length))} className="flex items-center gap-1 hover:text-ink"><Shuffle size={14} /> Shuffle</button>
          <button onClick={() => go(1)} className="flex items-center gap-1 hover:text-ink">Next <ChevronRight size={14} /></button>
        </div>
      </div>

      {/* Overview */}
      <div className="mt-6 rounded-card border border-border bg-bg-card p-5">
        <h3 className="font-semibold">Card Overview</h3>
        <p className="text-sm text-ink-muted">Click any card to jump to it</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {cards.map((c, i) => {
            const isMastered = mastered.has(c.id) || c.mastered;
            return (
              <button
                key={c.id}
                onClick={() => { setIndex(i); setFlipped(false); }}
                className={cn(
                  "grid h-9 w-9 place-items-center rounded-card text-sm font-medium transition",
                  i === index
                    ? "bg-brand text-white ring-2 ring-brand/40"
                    : isMastered
                      ? "bg-success/20 text-success"
                      : "bg-bg-elevated text-ink-muted hover:text-ink"
                )}
              >
                {i + 1}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
