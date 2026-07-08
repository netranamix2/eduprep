import { Outlet } from "react-router-dom";
import { TopNav } from "./TopNav";

// Shell wrapping all routed pages.
export function AppLayout() {
  return (
    <div className="min-h-screen bg-hero-glow">
      <TopNav />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
