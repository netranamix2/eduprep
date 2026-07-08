// Route table — single source of truth for navigation.
// Tools is ONE route; its 4 designs are sub-tabs handled inside the feature.

export const ROUTES = {
  home: "/",
  journey: "/journey",
  tutor: "/tutor",
  courses: "/courses",
  examPrep: "/exam-prep",
  tools: "/tools",
  leaderboard: "/leaderboard",
  applications: "/applications",
} as const;

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];

// Primary nav items rendered in the top bar (matches the mockups).
export const NAV_ITEMS = [
  { label: "Dashboard", path: ROUTES.home, icon: "LayoutDashboard" },
  { label: "My Journey", path: ROUTES.journey, icon: "Compass" },
  { label: "Courses", path: ROUTES.courses, icon: "BookOpen" },
  { label: "Exam Prep", path: ROUTES.examPrep, icon: "GraduationCap" },
  { label: "AI Tutor", path: ROUTES.tutor, icon: "Sparkles" },
] as const;

// Items grouped under the "Tools" and "More" dropdowns.
export const TOOLS_MENU = [
  { label: "Photo Solver", path: `${ROUTES.tools}?tab=photo-solver` },
  { label: "Flashcards", path: `${ROUTES.tools}?tab=flashcards` },
  { label: "Study Planner", path: `${ROUTES.tools}?tab=study-planner` },
  { label: "Notes", path: `${ROUTES.tools}?tab=notes` },
] as const;

export const MORE_MENU = [
  { label: "Leaderboard", path: ROUTES.leaderboard },
  { label: "University Applications", path: ROUTES.applications },
] as const;
