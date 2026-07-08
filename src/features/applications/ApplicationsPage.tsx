import { useState } from "react";
import type { ReactNode } from "react";
import {
  Building2, CheckCircle2, Clock, Award, MapPin, Star, Calendar,
  Heart, TrendingUp, DollarSign, Circle, ExternalLink,
} from "lucide-react";
import { useUniversities } from "@/lib/query/hooks";
import { Card, Badge, Button, ProgressBar, PageHeader } from "@/components/ui";
import { cn } from "@/lib/utils";
import type { University, AppTier, AppStatus } from "@/types";

const TIER_VARIANT: Record<AppTier, "brand" | "warning" | "success"> = {
  dream: "brand", target: "warning", safety: "success",
};
const STATUS_VARIANT: Record<AppStatus, "default" | "warning" | "brand" | "success"> = {
  "not started": "default", "in progress": "warning", submitted: "brand", accepted: "success",
};

function StatTile({ icon, value, label }: { icon: ReactNode; value: string; label: string }) {
  return (
    <Card className="flex items-center gap-3 p-4">
      <span className="grid h-10 w-10 place-items-center rounded-[12px] bg-bg-elevated">{icon}</span>
      <div>
        <p className="text-2xl font-extrabold">{value}</p>
        <p className="text-xs text-ink-muted">{label}</p>
      </div>
    </Card>
  );
}

export default function ApplicationsPage() {
  const { data: universities } = useUniversities();
  const [filter, setFilter] = useState<"all" | AppTier>("all");
  const [selectedId, setSelectedId] = useState("mit");

  const filtered = universities?.filter((u) => filter === "all" || u.tier === filter) ?? [];
  const selected = universities?.find((u) => u.id === selectedId);

  const counts = {
    total: universities?.length ?? 0,
    submitted: universities?.filter((u) => u.status === "submitted").length ?? 0,
    inProgress: universities?.filter((u) => u.status === "in progress").length ?? 0,
    accepted: universities?.filter((u) => u.status === "accepted").length ?? 0,
  };

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-8">
      <PageHeader title="University Applications" subtitle="Track and manage your university applications worldwide" />

      {/* Stat tiles */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatTile icon={<Building2 size={18} className="text-brand" />} value={String(counts.total)} label="Universities" />
        <StatTile icon={<CheckCircle2 size={18} className="text-success" />} value={String(counts.submitted)} label="Submitted" />
        <StatTile icon={<Clock size={18} className="text-warning" />} value={String(counts.inProgress)} label="In Progress" />
        <StatTile icon={<Award size={18} className="text-brand" />} value={String(counts.accepted)} label="Accepted" />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* University list */}
        <div className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold">My University List</h2>
            <div className="flex gap-1 rounded-pill border border-border bg-bg-card p-1">
              {(["all", "dream", "target", "safety"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={cn(
                    "rounded-pill px-3 py-1 text-xs font-medium capitalize transition",
                    filter === f ? "bg-brand text-white" : "text-ink-muted hover:text-ink"
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {filtered.map((u) => (
              <button
                key={u.id}
                onClick={() => setSelectedId(u.id)}
                className={cn(
                  "w-full rounded-card border bg-bg-card p-5 text-left transition",
                  selectedId === u.id ? "border-brand ring-1 ring-brand" : "border-border hover:border-border-strong"
                )}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold">{u.name}</h3>
                    <Badge variant={TIER_VARIANT[u.tier]}>{u.tier}</Badge>
                  </div>
                  <Badge variant={STATUS_VARIANT[u.status]}>{u.status}</Badge>
                </div>
                <div className="mt-2 flex items-center gap-4 text-xs text-ink-muted">
                  <span className="flex items-center gap-1"><MapPin size={12} /> {u.location}</span>
                  <span className="flex items-center gap-1"><Star size={12} /> #{u.worldRank} World</span>
                  <span className="flex items-center gap-1"><Calendar size={12} /> {u.deadline}</span>
                </div>
                <div className="mt-4 flex items-center justify-between text-xs">
                  <span className="text-ink-muted">Application Progress</span>
                  <span className="font-semibold">{u.progress}%</span>
                </div>
                <ProgressBar value={u.progress} className="mt-2" />
              </button>
            ))}
          </div>
        </div>

        {/* Detail panel */}
        {selected && <DetailPanel university={selected} />}
      </div>
    </div>
  );
}

function DetailPanel({ university: u }: { university: University }) {
  return (
    <Card className="h-fit p-6">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-bold leading-snug">{u.name}</h3>
          <p className="mt-1 flex items-center gap-1 text-xs text-ink-muted">
            <MapPin size={12} /> {u.location}
          </p>
        </div>
        <button className="text-ink-muted hover:text-danger"><Heart size={18} /></button>
      </div>

      {/* Quick facts */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        {[
          { icon: <Star size={14} className="text-warning" />, value: `#${u.worldRank}`, label: "World Rank" },
          { icon: <TrendingUp size={14} className="text-success" />, value: `${u.acceptanceRate}%`, label: "Acceptance" },
          { icon: <DollarSign size={14} className="text-brand" />, value: `$${(u.tuitionPerYear / 1000).toFixed(0)},${String(u.tuitionPerYear % 1000).padStart(3, "0")}/year`, label: "Tuition" },
          { icon: <Calendar size={14} className="text-danger" />, value: u.deadline, label: "Deadline" },
        ].map((f) => (
          <div key={f.label} className="rounded-card border border-border bg-bg-subtle p-3 text-center">
            <div className="flex justify-center">{f.icon}</div>
            <p className="mt-1 text-sm font-bold">{f.value}</p>
            <p className="text-[11px] text-ink-muted">{f.label}</p>
          </div>
        ))}
      </div>

      {/* Checklist */}
      <h4 className="mt-5 flex items-center gap-1.5 text-sm font-semibold">
        Application Checklist
      </h4>
      <div className="mt-3 space-y-2">
        {u.checklist.length === 0 && (
          <p className="text-sm text-ink-faint">No checklist items yet for this application.</p>
        )}
        {u.checklist.map((item) => (
          <div
            key={item.id}
            className={cn(
              "flex items-center justify-between rounded-card border px-3 py-2.5 text-sm",
              item.done ? "border-success/30 bg-success/5" : "border-border"
            )}
          >
            <span className="flex items-center gap-2">
              {item.done ? (
                <CheckCircle2 size={16} className="text-success" />
              ) : (
                <Circle size={16} className="text-ink-faint" />
              )}
              <span className={item.done ? "text-ink-muted line-through" : ""}>{item.label}</span>
            </span>
            {item.due && <span className="text-xs text-ink-muted">{item.due}</span>}
          </div>
        ))}
      </div>

      <Button className="mt-5 w-full">
        <ExternalLink size={15} /> View Application Portal
      </Button>
    </Card>
  );
}
