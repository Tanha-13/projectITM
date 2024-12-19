import {  LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

function UserNav() {
  const currentUser = useSelector((state) => state.auth.user);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex justify-center items-center gap-4 outline-none cursor-pointer pe-1">
          <Avatar className="h-11 w-11 rounded-full">
            {/* <AvatarImage src={user.avatar} alt={user.name} /> */}
            <AvatarFallback className="rounded-full">ITM</AvatarFallback>
          </Avatar>
          <div className="hidden lg:grid flex-1 text-left text-sm">
            <span className="font-semibold">{`${currentUser.firstName} ${currentUser.lastName}`}</span>
            <span className="text-xs">{currentUser.email}</span>
          </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className=" min-w-56 rounded-lg"
        side="bottom"
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="h-8 w-8 rounded-lg">
              {/* <AvatarImage src={user.avatar} alt={user.name} /> */}
              <AvatarFallback className="rounded-lg">ITM</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">{`${currentUser.firstName} ${currentUser.lastName}`}</span>
              <span className="truncate text-xs">{currentUser.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link to="profile">
          <DropdownMenuItem className="cursor-pointer">
            < FaUserCircle />
            Profile
          </DropdownMenuItem>
          </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <LogOut />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserNav;
