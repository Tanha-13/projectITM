import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register/Register.jsx";
import LandingPageLayout from "./layout/LandingPageLayout.jsx";
import ForgetPassword from "./pages/Login/ForgetPassword.jsx";
import StudentDashboard from "./pages/Dashboard/StudentDashboard";
import SupervisorDashboard from "./pages/Dashboard/SupervisorDashboard";
import AdminDashboard from "./pages/Dashboard/AdminDashboard";
import Projects from "./pages/Project/Projects";
import Tasks from "./pages/Task/Tasks";

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
        path: "/register",
        element: <Register />,
      },
      {
        path: "/studentDashboard",
        element: <StudentDashboard/>,
      },
      {
        path: "/supervisorDashboard",
        element: <SupervisorDashboard/>,
      },
      {
        path: "/admin",
        element: <AdminDashboard/>,
      },
      {
        path: "/projects",
        element: <Projects/>,
      },
      {
        path: "/tasks",
        element: <Tasks/>,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>
);
