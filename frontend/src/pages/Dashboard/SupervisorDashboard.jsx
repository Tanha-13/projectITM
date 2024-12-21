import { CustomTrigger } from "@/components/CustomTrigger";
import SideNav from "@/components/Navbars/SideNav";
import UserNav from "@/components/Navbars/UserNav";
import SearchInput from "@/components/SearchInput";
import { SidebarProvider } from "@/components/ui/sidebar";
import {
  FaBell,
  FaCalendarAlt,
  FaChartBar,
  FaFolderOpen,
  FaHome,
  FaMinus,
  FaProjectDiagram,
  FaUserCog,
  FaUserGraduate,
} from "react-icons/fa";
import { Outlet } from "react-router-dom";

function SupervisorDashboard() {
  const navItems = [
    {
      id: 1,
      title: "Home",
      url: "",
      icon: FaHome,
    },
    {
      id: 2,
      title: "Projects",
      url: "semester-projects",
      icon: FaProjectDiagram,
      subItems: [
        {
          id: 2.1,
          title: "Create",
          url: "create-project",
          icon: FaMinus,
        },
        {
          id: 2.2,
          title: "All",
          url: "semester-projects",
          icon: FaMinus,
        },
      ],
    },
    {
      id: 3,
      title: "Student",
      url: "#",
      icon: FaUserGraduate,
      subItems: [
        {
          id: 3.1,
          title: "View",
          url: "#",
          icon: FaMinus,
        },
      ],
    },
    {
      id: 4,
      title: "Resources",
      url: "#",
      icon: FaFolderOpen,
    },
    {
      id: 5,
      title: "Notifications",
      url: "#",
      icon: FaBell,
    },
    {
      id: 6,
      title: "Calendar",
      url: "#",
      icon: FaCalendarAlt,
    },
    {
      id: 7,
      title: "Guidelines",
      url: "#",
      icon: FaUserCog,
    },
    {
      id: 8,
      title: "Reporting",
      url: "#",
      icon: FaChartBar,
    },
  ];

  //card details
  /**
   * <div>
          <Card className="rounded-md text-left flex items-center justify-center gap-5 p-2 md:p-8 min-h-44">
            <img
              src={theses}
              className="w-20 h-20 rounded-full p-2 bg-gray-200"
            />
            <div>
              <div className="flex items-center text-third">
                <CardTitle className="text-xl">
                  Total Theses
                </CardTitle>
                <CardContent className="text-2xl font-bold text-right">
                56
              </CardContent>
              </div>
              <CardDescription className="text-sm">
                the total number of theses of the system
              </CardDescription>
            </div>
          </Card>
        </div>
   */
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

export default SupervisorDashboard;
