// Central domain types. Mock data and (later) the real API both conform to these,
// so swapping the data source is a one-file change in lib/api.

/* ---------- Journey ---------- */
export interface SubjectPerformance {
  id: string;
  name: string;
  grade: string; // "A-", "B+"
  percent: number; // 0-100
  color: string; // dot color
}

export interface GradeStage {
  id: string;
  label: string; // "K", "1-2", "6-8"
  unlocked: boolean;
  active: boolean;
}

export interface Journey {
  currentStageId: string;
  stageTitle: string; // "Middle School"
  stageMeta: string; // "Grade 6-8 | Ages 11-14 years"
  overallProgress: number;
  coreSubjects: string[];
  milestones: { id: string; order: number; label: string }[];
  stages: GradeStage[];
  subjects: SubjectPerformance[];
}

/* ---------- Courses ---------- */
export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  thumbnailUrl: string;
  instructor: { name: string; initials: string };
  durationHours: number;
  durationMinutes: number;
  students: number;
  rating: number;
  ratingCount: number;
  price: number | "free";
}

export type CourseSort = "trending" | "new" | "popular" | "rated" | "free";

/* ---------- AI Tutor ---------- */
export type TutorSubject = "math" | "english" | "science" | "coding";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

/* ---------- Exam Prep ---------- */
export interface ExamScore {
  id: string;
  exam: string; // "SAT"
  fullName: string;
  score: number;
  scoreLabel: string; // "1420" or "7.5"
  target: number;
  targetLabel: string;
  progress: number; // 0-100 toward target
  nextTest: string;
}

export interface PracticeSection {
  id: string;
  title: string;
  sets: number;
  progress: number;
}

export interface QuickQuestion {
  id: string;
  subjectTag: string;
  prompt: string;
  options: { id: string; label: string }[];
  correctOptionId: string;
}

/* ---------- Tools: Flashcards ---------- */
export interface Flashcard {
  id: string;
  topic: string;
  difficulty: "easy" | "medium" | "hard";
  question: string;
  answer: string;
  mastered: boolean;
}

/* ---------- Tools: Study Planner ---------- */
export interface StudyTask {
  id: string;
  title: string;
  type: string; // "Practice", "Video"
  time: string;
  durationMin: number;
  done: boolean;
  colorBar: string;
}

export interface WeeklyGoal {
  id: string;
  label: string;
  current: number;
  total: number;
}

export interface DayStudy {
  day: string;
  hours: number;
}

/* ---------- Tools: Photo Solver ---------- */
export interface SolvedProblem {
  id: string;
  subject: string;
  problem: string;
  solution: string;
  time: string;
}

/* ---------- Leaderboard ---------- */
export interface LeaderboardEntry {
  rank: number;
  userId: string;
  name: string;
  countryCode: string;
  initials: string;
  level: number;
  xp: number;
  streak: number;
  badges: string[];
  isCurrentUser?: boolean;
  trend?: "up" | "down" | "same";
}

export interface WeeklyChallenge {
  title: string;
  description: string;
  current: number;
  total: number;
  joined: number;
  endsIn: string;
  reward: string;
}

/* ---------- University Applications ---------- */
export type AppStatus = "not started" | "in progress" | "submitted" | "accepted";
export type AppTier = "dream" | "target" | "safety";

export interface ChecklistItem {
  id: string;
  label: string;
  done: boolean;
  due?: string;
}

export interface University {
  id: string;
  name: string;
  location: string;
  worldRank: number;
  acceptanceRate: number;
  tuitionPerYear: number;
  deadline: string;
  tier: AppTier;
  status: AppStatus;
  progress: number;
  checklist: ChecklistItem[];
}
