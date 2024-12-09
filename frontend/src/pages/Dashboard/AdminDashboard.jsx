import { CustomTrigger } from "@/components/CustomTrigger";
import SideNav from "@/components/Navbars/SideNav";
import UserNav from "@/components/Navbars/UserNav";
import SearchInput from "@/components/SearchInput";

import { SidebarProvider } from "@/components/ui/sidebar";
import {
  FaUsersCog,
  FaUserPlus,
  FaUsers,
  FaUserFriends,
  FaProjectDiagram,
  FaBell,
  FaUserCog,
  FaCog,
  FaHome,
} from "react-icons/fa";
import { Outlet } from "react-router-dom";

function AdminDashboard() {
  const navItems = [
    {
      id:1,
      title:"Overview",
      url:"/admin",
      icon:FaHome

    },
    {
      id: 2,
      title: "Supervisors",
      url: "/admin/supervisor/all",
      icon: FaUsersCog,
      subItems: [
        {
          id: 2.1,
          title: "Add",
          url: "/admin/supervisor/add",
          icon: FaUserPlus,
        },
        {
          id: 2.2,
          title: "View",
          url: "/admin/supervisor/all",
          icon: FaUsers,
        },
      ],
    },
    {
      id: 3,
      title: "Students",
      url: "#",
      icon: FaUserFriends,
      subItems: [
        {
          id: 3.1,
          title: "Review",
          url: "#",
          icon: FaUserPlus,
        },
        {
          id: 3.2,
          title: "View",
          url: "#",
          icon: FaUsers,
        },
      ],
    },
    {
      id: 4,
      title: "Projects",
      url: "#",
      icon: FaProjectDiagram,
    },
    {
      id: 5,
      title: "Notifications",
      url: "#",
      icon: FaBell,
    },
    {
      id: 6,
      title: "Supports",
      url: "#",
      icon: FaUserCog,
    },
    {
      id: 7,
      title: "Settings",
      url: "#",
      icon: FaCog,
    },
  ];

  return (
    <SidebarProvider>
      <SideNav navItems={navItems} />
      <menu className="w-full">
        <nav className="shadow-sm py-5">
          <div className="container flex items-center justify-between gap-7">
            <div className="flex items-center gap-2 lg:gap-5">
              <CustomTrigger />
              <SearchInput />
            </div>
            <UserNav />
          </div>
        </nav>
        <Outlet/>
      </menu>
    </SidebarProvider>
  );
}

export default AdminDashboard
