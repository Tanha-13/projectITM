import { CustomTrigger } from "@/components/CustomTrigger";
import SideNav from "@/components/Navbars/SideNav"
import { SidebarProvider } from "@/components/ui/sidebar";
import { FaUsersCog,FaUserPlus,FaUsers,FaUserFriends,FaProjectDiagram,FaBell,FaUserCog,FaCog } from "react-icons/fa";


function adminDashboard() {
  const navItems = [
    {
      id:1,
      title: "Supervisors",
      url: "#",
      icon: FaUsersCog,
      subItems:[
        {
          id:1.1,
          title: "Add",
          url: "#",
          icon:FaUserPlus 
        },
        {
          id:1.2,
          title: "View",
          url: "#",
          icon:FaUsers  
        },
      ]
    },
    {
    id:2,
      title: "Students",
      url: "#",
      icon: FaUserFriends,
      subItems:[
        {
          id:1.1,
          title: "Review",
          url: "#",
          icon:FaUserPlus 
        },
        {
          id:1.2,
          title: "View",
          url: "#",
          icon:FaUsers  
        },
      ]
    },
    {
      id:3,
      title: "Projects",
      url: "#",
      icon:  FaProjectDiagram,
    },
    {
      id:4,
      title: "Notifications",
      url: "#",
      icon: FaBell,
    },
    {
      id:6,
      title: "Supports",
      url: "#",
      icon: FaUserCog,
    },
    {
      id:7,
      title: "Settings",
      url: "#",
      icon: FaCog ,
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
          <p>Admin</p>
      </menu>
    </SidebarProvider>
  )
}

export default adminDashboard