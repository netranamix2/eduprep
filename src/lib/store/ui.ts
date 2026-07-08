// Global CLIENT state only (UI concerns that span components/pages).
// Server data lives in React Query, never here.
//
// This is what Redux would have managed. Note how little there actually is —
// that's the argument for Zustand over Redux on an app shaped like this.
// Add slices here as real cross-cutting client state emerges.

import { create } from "zustand";
import type { TutorSubject } from "@/types";

type ToolsTab = "photo-solver" | "flashcards" | "study-planner" | "notes";

interface UIState {
  // Active grade context shown in the nav ("Grade 7")
  gradeLevel: number;
  setGradeLevel: (g: number) => void;

  // Tools page active sub-tab (shared across the 4 tool views)
  toolsTab: ToolsTab;
  setToolsTab: (t: ToolsTab) => void;

  // AI Tutor selected subject
  tutorSubject: TutorSubject;
  setTutorSubject: (s: TutorSubject) => void;

  // Global notification count (badge in nav)
  unreadNotifications: number;
  setUnreadNotifications: (n: number) => void;
}

export const useUIStore = create<UIState>()((set) => ({
  gradeLevel: 7,
  setGradeLevel: (gradeLevel) => set({ gradeLevel }),

  toolsTab: "photo-solver",
  setToolsTab: (toolsTab) => set({ toolsTab }),

  tutorSubject: "math",
  setTutorSubject: (tutorSubject) => set({ tutorSubject }),

  unreadNotifications: 3,
  setUnreadNotifications: (unreadNotifications) => set({ unreadNotifications }),
}));
