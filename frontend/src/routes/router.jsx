import AdminContent from "@/components/admin/AdminContent";
import StudentContent from "@/components/student/StudentContent";
import SupervisorContent from "@/components/supervisor/SupervisorContent";
import LandingPageLayout from "@/layout/LandingPageLayout";
import AddSupervisor from "@/pages/Admin/AddSupervisor";
import AdminNotifications from "@/pages/Admin/AdminNotifications";
import StudentReview from "@/pages/Admin/StudentReview";
import StudentsAdmin from "@/pages/Admin/StudentsAdmin";
import Supervisors from "@/pages/Admin/Supervisors";
import AdminDashboard from "@/pages/Dashboard/AdminDashboard";
import StudentDashboard from "@/pages/Dashboard/StudentDashboard";
import SupervisorDashboard from "@/pages/Dashboard/SupervisorDashboard";
import Home from "@/pages/Home/Home";
import ForgetPassword from "@/pages/Login/ForgetPassword";
import Login from "@/pages/Login/Login";
import ResetPassword from "@/pages/Login/ResetPassword";
import ProfilePage from "@/pages/Profile/ProfilePage";
import ProjectDetails from "@/pages/Project/ProjectDetails";
import ProjectList from "@/pages/Project/ProjectList";
import Projects from "@/pages/Project/SemesterProjects";
import Register from "@/pages/Register/Register";
import CreateProject from "@/pages/Supervisor/CreateProject";
import TotalStudents from "@/pages/Supervisor/TotalStudents";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPageLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/forgetPassword",
        element: <ForgetPassword />,
      },
      {
        path: "/reset-password",
        element: <ResetPassword />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/admin/:userId",
    element: <AdminDashboard />,
    children: [
      {
        path: "",
        element: <AdminContent />,
      },
      {
        path: "supervisor/add",
        element: <AddSupervisor />,
      },
      {
        path: "supervisor/all",
        element: <Supervisors />,
      },
      {
        path: "student/review",
        element: <StudentReview />,
      },
      {
        path: "student/all",
        element: <StudentsAdmin />,
      },
      {
        path: "semester-projects",
        element: <Projects />,
      },
      {
        path:"projects/:semester",
        element:<ProjectList/>
      },
      {
        path:"projects/:semester/:projectId",
        element:<ProjectDetails/>
      },
      {
        path: "notifications",
        element: <AdminNotifications />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
    ],
  },
  {
    path: "/supervisor/:userId",
    element: <SupervisorDashboard />,
    children: [
      {
        path: "",
        element: <SupervisorContent />,
      },
      {
        path: "semester-projects",
        element: <Projects />,
      },
      {
        path: "create-project",
        element: <CreateProject />,
      },
      {
        path:"projects/:semester",
        element:<ProjectList/>
      },
      {
        path: "projects/:semester/:projectId",
        element: <ProjectDetails />,
      },
      {
        path: "students/all",
        element: <TotalStudents />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
    ],
  },
  {
    path: "/student/:userId",
    element: <StudentDashboard />,
    children: [
      {
        path: "",
        element: <StudentContent />,
      },
      {
        path: "projects/:semester/:projectId",
        element: <ProjectDetails />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
    ],
  },
]);

export default router;
