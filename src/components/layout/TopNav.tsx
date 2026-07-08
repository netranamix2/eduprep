import { NavLink } from "react-router-dom";
import { Bell, MessageSquare, Search, Sparkles } from "lucide-react";
import { NAV_ITEMS } from "@/routes/config";
import { useUIStore } from "@/lib/store/ui";
import { cn } from "@/lib/utils";

// Shared top nav. Mirrors the bar present on every screen in the designs.
// Dropdowns (Tools / More) are stubbed as links for now.
export function TopNav() {
  const grade = useUIStore((s) => s.gradeLevel);
  const unread = useUIStore((s) => s.unreadNotifications);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-[1400px] items-center gap-4 px-4">
        {/* Logo */}
        <div className="grid h-8 w-8 place-items-center rounded-[10px] bg-brand">
          <Sparkles size={18} className="text-white" />
        </div>

        {/* Primary nav */}
        <nav className="flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                cn(
                  "rounded-[10px] px-3 py-1.5 text-sm font-medium transition",
                  isActive ? "bg-bg-elevated text-ink" : "text-ink-muted hover:text-ink"
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
          <NavLink to="/tools" className="rounded-[10px] px-3 py-1.5 text-sm font-medium text-ink-muted hover:text-ink">
            Tools
          </NavLink>
          <NavLink to="/leaderboard" className="rounded-[10px] px-3 py-1.5 text-sm font-medium text-ink-muted hover:text-ink">
            More
          </NavLink>
        </nav>

        {/* Search */}
        <div className="relative ml-auto hidden w-72 items-center md:flex">
          <Search size={15} className="absolute left-3 text-ink-faint" />
          <input
            placeholder="Search courses, topics…"
            className="w-full rounded-pill border border-border bg-bg-input py-1.5 pl-9 pr-3 text-sm outline-none placeholder:text-ink-faint"
          />
        </div>

        {/* Grade pill */}
        <span className="rounded-pill border border-brand-muted px-3 py-1 text-xs font-medium text-brand">
          Grade {grade}
        </span>

        {/* Icons */}
        <button className="relative text-ink-muted hover:text-ink">
          <Bell size={18} />
          {unread > 0 && (
            <span className="absolute -right-1 -top-1 grid h-4 w-4 place-items-center rounded-full bg-brand text-[10px] text-white">
              {unread}
            </span>
          )}
        </button>
        <button className="text-ink-muted hover:text-ink">
          <MessageSquare size={18} />
        </button>
        <div className="h-8 w-8 rounded-full bg-bg-elevated" />
      </div>
    </header>
  );
}
