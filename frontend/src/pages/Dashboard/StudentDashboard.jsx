import { CustomTrigger } from "@/components/CustomTrigger";
import SideNav from "@/components/Navbars/SideNav";
import UserNav from "@/components/Navbars/UserNav";
import {  SidebarProvider } from "@/components/ui/sidebar";
import { FaProjectDiagram,FaTasks,FaFolderOpen ,FaCheckSquare,FaBell,FaCloud,FaUserAlt,FaChartBar,FaUserCog, FaHome  } from "react-icons/fa";
import { Outlet } from "react-router-dom";


export default function StudentDashboard() {

  const navItems = [
    {
      id:1,
      title: "Dashboard",
      url: "",
      icon: FaHome,
    },
    {
      id:2,
      title: "Project Overview",
      url: "projectDetails",
      icon: FaProjectDiagram,
    },
    {
    id:3,
      title: "Task List",
      url: "#",
      icon: FaTasks ,
    },
    {
      id:4,
      title: "Todo List",
      url: "#",
      icon: FaCheckSquare ,
    },
    {
      id:5,
      title: "Resources",
      url: "#",
      icon: FaFolderOpen ,
    },
    {
      id:6,
      title: "Notifications",
      url: "#",
      icon: FaBell,
    },
    {
      id:7,
      title: "Guidelines",
      url: "#",
      icon: FaUserCog,
    },
    {
      id:8,
      title: "Supervisor",
      url: "#",
      icon: FaUserAlt,
    },
    {
      id:9,
      title: "Reports",
      url: "#",
      icon: FaChartBar ,
    },
    {
      id:10,
      title: "Activity",
      url: "#",
      icon: FaCloud ,
    },

  ];


  return (
    // <DashboardNav/>
    <SidebarProvider>
      <SideNav navItems = {navItems} />
      <menu className="w-full">
        <nav className="shadow-sm py-5">
          <div className="container flex justify-between items-center">
              <CustomTrigger />
              <UserNav/>
            {/* <div className="hidden md:flex items-center space-x-4">
            </div> */}
          </div>
        </nav>
        <Outlet/>
      </menu>
    </SidebarProvider>
  );
}
