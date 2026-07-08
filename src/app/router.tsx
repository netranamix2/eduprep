import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { ROUTES } from "@/routes/config";
import LandingPage from "@/features/landing/LandingPage";
import JourneyPage from "@/features/journey/JourneyPage";
import TutorPage from "@/features/tutor/TutorPage";
import CoursesPage from "@/features/courses/CoursesPage";
import ExamPrepPage from "@/features/exam-prep/ExamPrepPage";
import ToolsPage from "@/features/tools/ToolsPage";
import LeaderboardPage from "@/features/leaderboard/LeaderboardPage";
import ApplicationsPage from "@/features/applications/ApplicationsPage";

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: ROUTES.home, element: <LandingPage /> },
      { path: ROUTES.journey, element: <JourneyPage /> },
      { path: ROUTES.tutor, element: <TutorPage /> },
      { path: ROUTES.courses, element: <CoursesPage /> },
      { path: ROUTES.examPrep, element: <ExamPrepPage /> },
      { path: ROUTES.tools, element: <ToolsPage /> },
      { path: ROUTES.leaderboard, element: <LeaderboardPage /> },
      { path: ROUTES.applications, element: <ApplicationsPage /> },
    ],
  },
]);
