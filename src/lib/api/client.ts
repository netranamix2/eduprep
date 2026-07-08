// THE DATA SEAM.
// Every function here returns a Promise, exactly as a real fetch would.
// Today they resolve mock data after a simulated delay. To go live, replace
// each body with a real request (see http() helper below) — nothing else in
// the app needs to change, because React Query hooks only depend on these
// function signatures.

import * as mock from "@/lib/mock/data";
import type {
  Journey, Course, CourseSort, ExamScore, PracticeSection, QuickQuestion,
  Flashcard, StudyTask, WeeklyGoal, DayStudy, SolvedProblem, LeaderboardEntry,
  WeeklyChallenge, University, ChatMessage,
} from "@/types";

const MOCK_DELAY = 350;
const USE_MOCK = true; // flip to false once endpoints exist

// Generic fetch helper for when you wire the real backend.
// const API_BASE = import.meta.env.VITE_API_BASE ?? "/api";
// async function http<T>(path: string, init?: RequestInit): Promise<T> {
//   const res = await fetch(`${API_BASE}${path}`, {
//     headers: { "Content-Type": "application/json" },
//     ...init,
//   });
//   if (!res.ok) throw new Error(`API ${res.status}: ${path}`);
//   return res.json() as Promise<T>;
// }

function mockResolve<T>(data: T): Promise<T> {
  return new Promise((resolve) =>
    setTimeout(() => resolve(structuredClone(data)), MOCK_DELAY)
  );
}

export const api = {
  // Journey --------------------------------------------------------------
  getJourney(): Promise<Journey> {
    if (USE_MOCK) return mockResolve(mock.journey);
    // return http<Journey>("/journey");
    throw new Error("not implemented");
  },

  // Courses --------------------------------------------------------------
  getCourses(params?: { search?: string; sort?: CourseSort }): Promise<Course[]> {
    if (USE_MOCK) {
      let list = mock.courses;
      if (params?.search) {
        const q = params.search.toLowerCase();
        list = list.filter(
          (c) => c.title.toLowerCase().includes(q) || c.category.toLowerCase().includes(q)
        );
      }
      if (params?.sort === "free") list = list.filter((c) => c.price === "free");
      if (params?.sort === "rated") list = [...list].sort((a, b) => b.rating - a.rating);
      return mockResolve(list);
    }
    // return http<Course[]>(`/courses?${new URLSearchParams(params as any)}`);
    throw new Error("not implemented");
  },

  // Exam Prep ------------------------------------------------------------
  getExamScores(): Promise<ExamScore[]> {
    if (USE_MOCK) return mockResolve(mock.examScores);
    throw new Error("not implemented");
  },
  getPracticeSections(examId: string): Promise<PracticeSection[]> {
    if (USE_MOCK) return mockResolve(mock.practiceSections);
    void examId;
    throw new Error("not implemented");
  },
  getQuickQuestion(): Promise<QuickQuestion> {
    if (USE_MOCK) return mockResolve(mock.quickQuestion);
    throw new Error("not implemented");
  },

  // Tools ----------------------------------------------------------------
  getFlashcards(): Promise<Flashcard[]> {
    if (USE_MOCK) return mockResolve(mock.flashcards);
    throw new Error("not implemented");
  },
  getStudyTasks(): Promise<StudyTask[]> {
    if (USE_MOCK) return mockResolve(mock.studyTasks);
    throw new Error("not implemented");
  },
  getWeeklyGoals(): Promise<WeeklyGoal[]> {
    if (USE_MOCK) return mockResolve(mock.weeklyGoals);
    throw new Error("not implemented");
  },
  getWeekStudy(): Promise<DayStudy[]> {
    if (USE_MOCK) return mockResolve(mock.weekStudy);
    throw new Error("not implemented");
  },
  getRecentSolutions(): Promise<SolvedProblem[]> {
    if (USE_MOCK) return mockResolve(mock.recentSolutions);
    throw new Error("not implemented");
  },

  // Leaderboard ----------------------------------------------------------
  getLeaderboard(period: "weekly" | "monthly" | "all" = "weekly"): Promise<LeaderboardEntry[]> {
    if (USE_MOCK) {
      void period;
      return mockResolve(mock.leaderboard);
    }
    throw new Error("not implemented");
  },
  getWeeklyChallenge(): Promise<WeeklyChallenge> {
    if (USE_MOCK) return mockResolve(mock.weeklyChallenge);
    throw new Error("not implemented");
  },

  // Applications ---------------------------------------------------------
  getUniversities(): Promise<University[]> {
    if (USE_MOCK) return mockResolve(mock.universities);
    throw new Error("not implemented");
  },

  // AI Tutor -------------------------------------------------------------
  getTutorHistory(): Promise<ChatMessage[]> {
    if (USE_MOCK) return mockResolve(mock.tutorSeedMessages);
    throw new Error("not implemented");
  },
  sendTutorMessage(content: string): Promise<ChatMessage> {
    if (USE_MOCK) {
      const reply: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: `(mock reply) You asked: "${content}". Wire this to the Anthropic API or your backend to get real answers.`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      return mockResolve(reply);
    }
    // POST to your AI endpoint
    throw new Error("not implemented");
  },
};
