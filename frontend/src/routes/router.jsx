
import AdminContent from "@/components/admin/AdminContent";
import StudentContent from "@/components/student/StudentContent";
import SupervisorContent from "@/components/supervisor/SupervisorContent";
import LandingPageLayout from "@/layout/LandingPageLayout";
import AddSupervisor from "@/pages/Admin/AddSupervisor";
import Supervisors from "@/pages/Admin/Supervisors";
import AdminDashboard from "@/pages/Dashboard/AdminDashboard";
import StudentDashboard from "@/pages/Dashboard/StudentDashboard";
import SupervisorDashboard from "@/pages/Dashboard/SupervisorDashboard";
import Home from "@/pages/Home/Home";
import ForgetPassword from "@/pages/Login/ForgetPassword";
import Login from "@/pages/Login/Login";
import ProjectDetails from "@/pages/Project/ProjectDetails";
import Projects from "@/pages/Project/Projects";
import Register from "@/pages/Register/Register";
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
          path: "/register",
          element: <Register />,
        },
      ],
    },
    {
        path:"/admin",
        element:<AdminDashboard/>,
        children:[
              {
                path: "/admin",
                element: <AdminContent/>,
              },
                  {
                    path:"/admin/supervisor/add",
                    element:<AddSupervisor/>
                  },
                  {
                    path:"/admin/supervisor/all",
                    element:<Supervisors/>
                  },
                ]
              
    },
    {
        path:"/supervisor",
        element:<SupervisorDashboard/>,
        children:[
            {
                path:'/supervisor',
                element:<SupervisorContent/>
            },
            {
                path:"/supervisor/projects",
                element:<Projects/>
            }
        ]
    },
    {
        path:"/student",
        element:<StudentDashboard/>,
        children:[
            {
                path:'/student',
                element:<StudentContent/>
            },
            {
                path:"/student/projectDetails",
                element:<ProjectDetails/>
            }
        ]
    }
  ]);

  export default router;
  