import { CustomTrigger } from "@/components/CustomTrigger"
import SideNav from "@/components/Navbars/SideNav"
import { SidebarProvider } from "@/components/ui/sidebar"
import { FaBell, FaCalendarAlt, FaChartBar, FaFolderOpen, FaMinus, FaProjectDiagram, FaUserCog, FaUserGraduate } from "react-icons/fa"


function SupervisorDashboard() {
  const navItems = [
    {
      id:1,
      title: "Projects",
      url: "#",
      icon: FaProjectDiagram,
      subItems:[
        {
          id:1.1,
          title: "Create",
          url: "#",
          icon:FaMinus 
        },
        {
          id:1.2,
          title: "All",
          url: "#",
          icon:FaMinus  
        },
      ]
    },
    {
    id:2,
      title: "Student",
      url: "#",
      icon: FaUserGraduate ,
      subItems:[
        {
          id:2.1,
          title: "View",
          url: "#",
          icon:FaMinus 
        },
      ]
    },
    {
      id:3,
      title: "Resources",
      url: "#",
      icon: FaFolderOpen ,
    },
    {
      id:4,
      title: "Notifications",
      url: "#",
      icon: FaBell,
    },
    {
      id:5,
      title: "Calendar",
      url: "#",
      icon: FaCalendarAlt,
    },
    {
      id:6,
      title: "Guidelines",
      url: "#",
      icon: FaUserCog,
    },
    {
      id:7,
      title: "Reporting",
      url: "#",
      icon: FaChartBar ,
    },

  ]
  return (
    <SidebarProvider>
      <SideNav navItems = {navItems} />
      <menu className="w-full">
        <nav className="shadow-sm py-5">
          <div className="container flex justify-between items-center">
              <CustomTrigger />
            {/* <div className="hidden md:flex items-center space-x-4">
            </div> */}
          </div>
        </nav>
      </menu>
    </SidebarProvider>
  )
}

export default SupervisorDashboard