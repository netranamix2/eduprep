// Data hooks. Components import ONLY from here — never call api directly,
// never touch query keys directly. This keeps the data layer swappable and
// the cache coherent.

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api/client";
import { qk } from "./keys";
import type { ChatMessage, CourseSort } from "@/types";

export const useJourney = () =>
  useQuery({ queryKey: qk.journey, queryFn: api.getJourney });

export const useCourses = (search?: string, sort?: CourseSort) =>
  useQuery({
    queryKey: qk.courses(search, sort),
    queryFn: () => api.getCourses({ search, sort }),
  });

export const useExamScores = () =>
  useQuery({ queryKey: qk.examScores, queryFn: api.getExamScores });

export const usePracticeSections = (examId: string) =>
  useQuery({
    queryKey: qk.practiceSections(examId),
    queryFn: () => api.getPracticeSections(examId),
    enabled: !!examId,
  });

export const useQuickQuestion = () =>
  useQuery({ queryKey: qk.quickQuestion, queryFn: api.getQuickQuestion });

export const useFlashcards = () =>
  useQuery({ queryKey: qk.flashcards, queryFn: api.getFlashcards });

export const useStudyTasks = () =>
  useQuery({ queryKey: qk.studyTasks, queryFn: api.getStudyTasks });

export const useWeeklyGoals = () =>
  useQuery({ queryKey: qk.weeklyGoals, queryFn: api.getWeeklyGoals });

export const useWeekStudy = () =>
  useQuery({ queryKey: qk.weekStudy, queryFn: api.getWeekStudy });

export const useRecentSolutions = () =>
  useQuery({ queryKey: qk.recentSolutions, queryFn: api.getRecentSolutions });

export const useLeaderboard = (period: "weekly" | "monthly" | "all") =>
  useQuery({
    queryKey: qk.leaderboard(period),
    queryFn: () => api.getLeaderboard(period),
  });

export const useWeeklyChallenge = () =>
  useQuery({ queryKey: qk.weeklyChallenge, queryFn: api.getWeeklyChallenge });

export const useUniversities = () =>
  useQuery({ queryKey: qk.universities, queryFn: api.getUniversities });

export const useTutorHistory = () =>
  useQuery({ queryKey: qk.tutorHistory, queryFn: api.getTutorHistory });

// Mutation: send a tutor message, optimistically append, then reconcile.
export const useSendTutorMessage = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (content: string) => api.sendTutorMessage(content),
    onMutate: async (content: string) => {
      await qc.cancelQueries({ queryKey: qk.tutorHistory });
      const prev = qc.getQueryData<ChatMessage[]>(qk.tutorHistory) ?? [];
      const optimistic: ChatMessage = {
        id: crypto.randomUUID(),
        role: "user",
        content,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      qc.setQueryData<ChatMessage[]>(qk.tutorHistory, [...prev, optimistic]);
      return { prev };
    },
    onError: (_e, _v, ctx) => {
      if (ctx?.prev) qc.setQueryData(qk.tutorHistory, ctx.prev);
    },
    onSuccess: (reply) => {
      qc.setQueryData<ChatMessage[]>(qk.tutorHistory, (cur) => [...(cur ?? []), reply]);
    },
  });
};
