import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import lightlogo from "../../assets/logo/light-logo.png";

// data flow - data,item,items
function SideNav({ navItems }) {
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu className="mt-2 mb-10">
          <SidebarMenuItem>
            <Link to="/">
              <img src={lightlogo} className="w-44" alt="" />
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="flex justify-center">
              {navItems.map((items) => (
                <SidebarMenuItem className="mb-4" key={items.id}>
                  <Link to={`${items.url}`} className="flex items-center gap-4">
                    <SidebarMenuButton>
                      <items.icon className="text-primary md:text-xl" />
                      <span className="font-bold text-base">{items.title}</span>
                    </SidebarMenuButton>
                  </Link>
                  {/* <SidebarMenuBadge>24</SidebarMenuBadge> */}
                  {items.subItems?.length ? (
                    <SidebarMenuSub>
                      {items.subItems.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.id}>
                          <Link
                            to={subItem.url}
                            className="flex items-center gap-4"
                          >
                            <SidebarMenuButton>
                              <subItem.icon className="text-[#094074]" />
                              <span className="">{subItem.title}</span>
                            </SidebarMenuButton>
                          </Link>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  ) : null}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export default SideNav;

SideNav.propTypes = {
  navItems: PropTypes.array,
};
