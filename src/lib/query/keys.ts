// Centralized query keys. Never inline keys in components — reference these,
// so invalidation stays consistent and refactors are safe.
export const qk = {
  journey: ["journey"] as const,
  courses: (search?: string, sort?: string) => ["courses", { search, sort }] as const,
  examScores: ["exam", "scores"] as const,
  practiceSections: (examId: string) => ["exam", "sections", examId] as const,
  quickQuestion: ["exam", "quick-question"] as const,
  flashcards: ["tools", "flashcards"] as const,
  studyTasks: ["tools", "study-tasks"] as const,
  weeklyGoals: ["tools", "weekly-goals"] as const,
  weekStudy: ["tools", "week-study"] as const,
  recentSolutions: ["tools", "recent-solutions"] as const,
  leaderboard: (period: string) => ["leaderboard", period] as const,
  weeklyChallenge: ["leaderboard", "challenge"] as const,
  universities: ["applications", "universities"] as const,
  tutorHistory: ["tutor", "history"] as const,
};
