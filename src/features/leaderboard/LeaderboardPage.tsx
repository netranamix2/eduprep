import { useState } from "react";
import { Trophy, Crown, Flame, Zap, ChevronUp, ChevronDown, Minus } from "lucide-react";
import { useLeaderboard, useWeeklyChallenge } from "@/lib/query/hooks";
import { Card, Badge, Avatar, ProgressBar, PageHeader } from "@/components/ui";
import { cn } from "@/lib/utils";
import type { LeaderboardEntry } from "@/types";

function fmt(n: number) {
  return n.toLocaleString("en-US").replace(/,/g, " ");
}

const PODIUM_STYLE = {
  1: { ring: "#fbbf24", border: "border-warning", order: "order-2", lift: "-mt-4" },
  2: { ring: "#9aa3b2", border: "border-border-strong", order: "order-1", lift: "mt-0" },
  3: { ring: "#fb923c", border: "border-[#fb923c]", order: "order-3", lift: "mt-0" },
} as const;

function PodiumCard({ entry }: { entry: LeaderboardEntry }) {
  const style = PODIUM_STYLE[entry.rank as 1 | 2 | 3];
  return (
    <div className={cn("flex flex-col items-center", style.order, style.lift)}>
      <div className={cn("w-full rounded-card border-t-2 bg-bg-card p-6 text-center", style.border)}>
        <div className="relative mx-auto w-fit">
          <Avatar initials={entry.initials} size="lg" ring={style.ring} />
          {entry.rank === 1 && (
            <Crown size={20} className="absolute -right-1 -top-1 fill-warning text-warning" />
          )}
          <span
            className="absolute -bottom-1 -right-1 grid h-6 w-6 place-items-center rounded-full text-xs font-bold text-bg"
            style={{ backgroundColor: style.ring }}
          >
            {entry.rank}
          </span>
        </div>
        <p className="mt-3 text-xs text-ink-muted">{entry.countryCode}</p>
        <h3 className="font-bold">{entry.name}</h3>
        <p className="text-sm text-ink-muted">Level {entry.level}</p>
        <div className="mt-3 flex items-center justify-center gap-4">
          <span className="text-brand">
            <span className="font-bold">{fmt(entry.xp)}</span>
            <span className="ml-1 text-xs text-ink-muted">XP</span>
          </span>
          <span className="flex items-center gap-1 text-danger">
            <Flame size={14} />
            <span className="font-bold">{entry.streak}</span>
          </span>
        </div>
        <div className="mt-3 flex flex-wrap justify-center gap-1.5">
          {entry.badges.map((b) => (
            <Badge key={b}>{b}</Badge>
          ))}
        </div>
      </div>
    </div>
  );
}

function TrendIcon({ trend }: { trend?: LeaderboardEntry["trend"] }) {
  if (trend === "up") return <ChevronUp size={14} className="text-success" />;
  if (trend === "down") return <ChevronDown size={14} className="text-danger" />;
  return <Minus size={14} className="text-ink-faint" />;
}

export default function LeaderboardPage() {
  const [period, setPeriod] = useState<"weekly" | "monthly" | "all">("weekly");
  const { data: entries } = useLeaderboard(period);
  const { data: challenge } = useWeeklyChallenge();

  const top3 = entries?.slice(0, 3) ?? [];
  const rest = entries?.slice(3) ?? [];
  const me = entries?.find((e) => e.isCurrentUser);

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-8">
      <div className="flex items-start justify-between">
        <PageHeader title="Rankings & Leaderboard" subtitle="Compete with learners worldwide and earn achievements" />
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value as typeof period)}
          className="rounded-card border border-border bg-bg-card px-4 py-2 text-sm outline-none"
        >
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="all">All Time</option>
        </select>
      </div>

      {/* Podium */}
      <div className="grid grid-cols-3 items-end gap-4">
        {top3.map((e) => (
          <PodiumCard key={e.userId} entry={e} />
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Global list */}
        <Card className="p-6 lg:col-span-2">
          <h2 className="mb-4 flex items-center gap-2 font-semibold">
            <Trophy size={18} className="text-warning" /> Global Leaderboard
          </h2>
          <div className="space-y-2">
            {rest.map((e) => (
              <div
                key={e.userId}
                className={cn(
                  "flex items-center gap-3 rounded-card border px-4 py-3",
                  e.isCurrentUser ? "border-brand bg-brand-soft" : "border-transparent hover:bg-bg-subtle"
                )}
              >
                <span className="flex w-10 items-center gap-1 text-sm font-medium text-ink-muted">
                  #{e.rank}
                  <TrendIcon trend={e.trend} />
                </span>
                <Avatar initials={e.initials} size="sm" />
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    <span className="mr-1.5 text-xs text-ink-faint">{e.countryCode}</span>
                    {e.name} {e.isCurrentUser && <span className="text-brand">You</span>}
                  </p>
                  <p className="text-xs text-ink-muted">Level {e.level}</p>
                </div>
                <span className="flex items-center gap-1 text-sm text-danger">
                  <Flame size={13} /> {e.streak}
                </span>
                <span className="w-24 text-right text-sm font-semibold">{fmt(e.xp)} XP</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Right column */}
        <div className="space-y-6">
          {challenge && (
            <Card className="border-brand-muted bg-brand-soft p-6">
              <h2 className="flex items-center gap-2 font-semibold text-brand">
                <Zap size={18} /> Weekly Challenge
              </h2>
              <h3 className="mt-3 font-bold">{challenge.title}</h3>
              <p className="text-sm text-ink-muted">{challenge.description}</p>
              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="text-ink-muted">Progress</span>
                <span className="font-semibold">{challenge.current}/{challenge.total}</span>
              </div>
              <ProgressBar value={(challenge.current / challenge.total) * 100} className="mt-2" />
              <div className="mt-3 flex items-center justify-between text-xs text-ink-muted">
                <span>{fmt(challenge.joined)} joined</span>
                <span>Ends in {challenge.endsIn}</span>
              </div>
              <div className="mt-4 rounded-card border border-border bg-bg-card p-3">
                <p className="text-xs text-ink-muted">Reward</p>
                <p className="text-sm font-medium">{challenge.reward}</p>
              </div>
            </Card>
          )}

          {me && (
            <Card className="p-6">
              <h2 className="font-semibold">Your Stats</h2>
              <div className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-ink-muted">Global Rank</span>
                  <span className="font-bold">#{me.rank}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-muted">Total XP</span>
                  <span className="font-bold">{me.xp.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-muted">Current Streak</span>
                  <span className="flex items-center gap-1 font-bold text-danger">
                    <Flame size={14} /> {me.streak} days
                  </span>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
