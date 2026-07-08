import type {
  Journey,
  Course,
  ExamScore,
  PracticeSection,
  QuickQuestion,
  Flashcard,
  StudyTask,
  WeeklyGoal,
  DayStudy,
  SolvedProblem,
  LeaderboardEntry,
  WeeklyChallenge,
  University,
  ChatMessage,
} from "@/types";

export const journey: Journey = {
  currentStageId: "6-8",
  stageTitle: "Middle School",
  stageMeta: "Grade 6-8 | Ages 11-14 years",
  overallProgress: 65,
  coreSubjects: ["Pre-Algebra/Algebra", "Literature", "Biology/Chemistry", "World History"],
  milestones: [
    { id: "m1", order: 1, label: "Algebraic Thinking" },
    { id: "m2", order: 2, label: "Critical Analysis" },
    { id: "m3", order: 3, label: "Lab Skills" },
  ],
  stages: [
    { id: "K", label: "K", unlocked: true, active: false },
    { id: "1-2", label: "1-2", unlocked: true, active: false },
    { id: "3-5", label: "3-5", unlocked: true, active: false },
    { id: "6-8", label: "6-8", unlocked: true, active: true },
    { id: "9-10", label: "9-10", unlocked: false, active: false },
    { id: "11-12", label: "11-12", unlocked: false, active: false },
  ],
  subjects: [
    { id: "math", name: "Mathematics", grade: "A-", percent: 72, color: "#5b6cff" },
    { id: "eng", name: "English Language", grade: "A", percent: 85, color: "#34d399" },
    { id: "sci", name: "Science", grade: "B+", percent: 68, color: "#c084fc" },
    { id: "hist", name: "History", grade: "A-", percent: 78, color: "#fb923c" },
    { id: "lang", name: "Foreign Language", grade: "B", percent: 62, color: "#f472b6" },
    { id: "arts", name: "Arts", grade: "A+", percent: 90, color: "#fbbf24" },
  ],
};

export const courses: Course[] = [
  {
    id: "c1",
    title: "Full-Stack Web Development Bootcamp",
    description: "Build complete web applications with React, Node.js, PostgreSQL, and deploy to the cloud.",
    category: "Web Development",
    level: "Intermediate",
    thumbnailUrl: "",
    instructor: { name: "Emma Wilson", initials: "EW" },
    durationHours: 68,
    durationMinutes: 45,
    students: 67800,
    rating: 4.7,
    ratingCount: 18340,
    price: 119.99,
  },
  {
    id: "c2",
    title: "IELTS Academic: Band 8+ Strategy",
    description: "Master all IELTS sections with proven strategies. Includes 10 full practice tests with feedback.",
    category: "Test Prep",
    level: "Intermediate",
    thumbnailUrl: "",
    instructor: { name: "British Council Expert", initials: "BCE" },
    durationHours: 40,
    durationMinutes: 0,
    students: 52100,
    rating: 4.8,
    ratingCount: 14230,
    price: 79.99,
  },
  {
    id: "c3",
    title: "Business Analytics with Excel & Power BI",
    description: "Master data analysis and visualization tools for business decision making.",
    category: "Business",
    level: "Beginner",
    thumbnailUrl: "",
    instructor: { name: "Analytics Pro", initials: "AP" },
    durationHours: 32,
    durationMinutes: 45,
    students: 48700,
    rating: 4.5,
    ratingCount: 12340,
    price: "free",
  },
];

export const examScores: ExamScore[] = [
  { id: "sat", exam: "SAT", fullName: "Scholastic Assessment Test", score: 1420, scoreLabel: "1420", target: 1500, targetLabel: "1500", progress: 75, nextTest: "April 15" },
  { id: "ielts", exam: "IELTS", fullName: "International English Language Testing System", score: 7.5, scoreLabel: "7.5", target: 8.5, targetLabel: "8.5", progress: 80, nextTest: "May 2" },
  { id: "toefl", exam: "TOEFL", fullName: "Test of English as a Foreign Language", score: 98, scoreLabel: "98", target: 110, targetLabel: "110", progress: 82, nextTest: "April 28" },
  { id: "gre", exam: "GRE", fullName: "Graduate Record Examinations", score: 315, scoreLabel: "315", target: 330, targetLabel: "330", progress: 60, nextTest: "May 10" },
];

export const practiceSections: PracticeSection[] = [
  { id: "reading", title: "Reading", sets: 25, progress: 30 },
  { id: "writing", title: "Writing", sets: 20, progress: 85 },
  { id: "math-nc", title: "Math (No Calc)", sets: 16, progress: 50 },
  { id: "math-c", title: "Math (Calc)", sets: 13, progress: 90 },
];

export const quickQuestion: QuickQuestion = {
  id: "q1",
  subjectTag: "SAT Math",
  prompt: "If 3x + 5 = 17, what is the value of x?",
  options: [
    { id: "a", label: "A) 2" },
    { id: "b", label: "B) 3" },
    { id: "c", label: "C) 4" },
    { id: "d", label: "D) 5" },
  ],
  correctOptionId: "c",
};

export const flashcards: Flashcard[] = [
  { id: "f1", topic: "Algorithms", difficulty: "easy", question: "What is the time complexity of binary search?", answer: "O(log n) — the search space halves each step.", mastered: false },
  { id: "f2", topic: "Algorithms", difficulty: "medium", question: "What is the time complexity of quicksort (average)?", answer: "O(n log n).", mastered: false },
  { id: "f3", topic: "Data Structures", difficulty: "easy", question: "What does LIFO stand for?", answer: "Last In, First Out — a stack.", mastered: false },
  { id: "f4", topic: "Algorithms", difficulty: "medium", question: "Worst-case time of hash lookup?", answer: "O(n) under heavy collisions.", mastered: true },
  { id: "f5", topic: "Networking", difficulty: "hard", question: "What layer is TCP at in the OSI model?", answer: "Layer 4 — the transport layer.", mastered: false },
  { id: "f6", topic: "Data Structures", difficulty: "easy", question: "What does FIFO stand for?", answer: "First In, First Out — a queue.", mastered: false },
  { id: "f7", topic: "Algorithms", difficulty: "easy", question: "Best case for bubble sort?", answer: "O(n) when already sorted.", mastered: true },
  { id: "f8", topic: "Databases", difficulty: "medium", question: "What does ACID stand for?", answer: "Atomicity, Consistency, Isolation, Durability.", mastered: false },
];

export const studyTasks: StudyTask[] = [
  { id: "t1", title: "SAT Math Practice", type: "Practice", time: "09:00 AM", durationMin: 60, done: true, colorBar: "#5b6cff" },
  { id: "t2", title: "React Hooks Deep Dive", type: "Video", time: "10:30 AM", durationMin: 45, done: true, colorBar: "#c084fc" },
  { id: "t3", title: "IELTS Writing Task 2", type: "Exercise", time: "02:00 PM", durationMin: 90, done: false, colorBar: "#34d399" },
  { id: "t4", title: "Vocabulary Review", type: "Flashcards", time: "04:00 PM", durationMin: 30, done: false, colorBar: "#fbbf24" },
  { id: "t5", title: "Mock Test Review", type: "Review", time: "05:00 PM", durationMin: 60, done: false, colorBar: "#f472b6" },
];

export const weeklyGoals: WeeklyGoal[] = [
  { id: "g1", label: "Complete 5 SAT practice sets", current: 3, total: 5 },
  { id: "g2", label: "Study 20 hours", current: 14, total: 20 },
  { id: "g3", label: "Finish React course section", current: 8, total: 10 },
  { id: "g4", label: "Review 200 vocabulary words", current: 156, total: 200 },
];

export const weekStudy: DayStudy[] = [
  { day: "Mon", hours: 2.5 }, { day: "Tue", hours: 3 }, { day: "Wed", hours: 2 },
  { day: "Thu", hours: 4 }, { day: "Fri", hours: 3.5 }, { day: "Sat", hours: 0 }, { day: "Sun", hours: 0 },
];

export const recentSolutions: SolvedProblem[] = [
  { id: "s1", subject: "Math", problem: "Solve: 2x² + 5x - 3 = 0", solution: "x = 1/2 or x = -3", time: "17:52" },
  { id: "s2", subject: "Chemistry", problem: "Balance: Fe + O₂ → Fe₂O₃", solution: "4Fe + 3O₂ → 2Fe₂O₃", time: "16:22" },
];

export const leaderboard: LeaderboardEntry[] = [
  { rank: 1, userId: "u-alex", name: "Alex Johnson", countryCode: "US", initials: "A", level: 45, xp: 125400, streak: 156, badges: ["Top Learner", "Streak Master"] },
  { rank: 2, userId: "u-yuki", name: "Yuki Tanaka", countryCode: "JP", initials: "Y", level: 43, xp: 118900, streak: 134, badges: ["Rising Star", "Community Helper"] },
  { rank: 3, userId: "u-maria", name: "Maria Garcia", countryCode: "ES", initials: "M", level: 42, xp: 115200, streak: 98, badges: ["Exam Master", "Perfect Score"] },
  { rank: 4, userId: "u-david", name: "David Kim", countryCode: "KR", initials: "D", level: 40, xp: 108500, streak: 89, badges: [], trend: "same" },
  { rank: 5, userId: "u-emma", name: "Emma Wilson", countryCode: "GB", initials: "E", level: 39, xp: 102300, streak: 76, badges: [], trend: "up" },
  { rank: 6, userId: "u-ahmed", name: "Ahmed Hassan", countryCode: "EG", initials: "A", level: 38, xp: 98700, streak: 112, badges: [], trend: "down" },
  { rank: 7, userId: "u-sophie", name: "Sophie Martin", countryCode: "FR", initials: "S", level: 37, xp: 95400, streak: 67, badges: [], trend: "down" },
  { rank: 8, userId: "u-chen", name: "Chen Wei", countryCode: "CN", initials: "C", level: 36, xp: 91200, streak: 54, badges: [], trend: "up" },
  { rank: 9, userId: "u-john", name: "John Doe", countryCode: "US", initials: "J", level: 35, xp: 88900, streak: 45, badges: [], trend: "down", isCurrentUser: true },
];

export const weeklyChallenge: WeeklyChallenge = {
  title: "Speed Learner Challenge",
  description: "Complete 5 lessons in under 2 hours total",
  current: 3,
  total: 5,
  joined: 12450,
  endsIn: "2 days",
  reward: "500 XP + Speed Demon Badge",
};

export const universities: University[] = [
  {
    id: "mit", name: "Massachusetts Institute of Technology", location: "Cambridge, MA, USA",
    worldRank: 1, acceptanceRate: 4, tuitionPerYear: 57590, deadline: "Jan 1, 2025",
    tier: "dream", status: "in progress", progress: 45,
    checklist: [
      { id: "ck1", label: "SAT/ACT Scores", done: true },
      { id: "ck2", label: "Common App Essay", done: true },
      { id: "ck3", label: "MIT Essays", done: false, due: "Dec 15" },
      { id: "ck4", label: "Letters of Recommendation (2)", done: false, due: "Dec 20" },
      { id: "ck5", label: "Transcript", done: true },
      { id: "ck6", label: "Interview", done: false, due: "Jan 15" },
    ],
  },
  {
    id: "stanford", name: "Stanford University", location: "Stanford, CA, USA",
    worldRank: 3, acceptanceRate: 4, tuitionPerYear: 56169, deadline: "Jan 2, 2025",
    tier: "dream", status: "not started", progress: 20, checklist: [],
  },
  {
    id: "umich", name: "University of Michigan", location: "Ann Arbor, MI, USA",
    worldRank: 21, acceptanceRate: 20, tuitionPerYear: 52266, deadline: "Feb 1, 2025",
    tier: "target", status: "in progress", progress: 65, checklist: [],
  },
  {
    id: "cambridge", name: "University of Cambridge", location: "Cambridge, UK",
    worldRank: 2, acceptanceRate: 21, tuitionPerYear: 33000, deadline: "Oct 15, 2024",
    tier: "target", status: "submitted", progress: 100, checklist: [],
  },
];

export const tutorSeedMessages: ChatMessage[] = [
  { id: "msg1", role: "user", content: "Can you explain how to solve quadratic equations?", timestamp: "18:16" },
  {
    id: "msg2", role: "assistant", timestamp: "18:17",
    content:
      "Great question! A quadratic equation has the form ax² + bx + c = 0. There are several methods to solve them: factoring, the quadratic formula, and completing the square. Would you like me to walk through an example with any of these methods?",
  },
];
