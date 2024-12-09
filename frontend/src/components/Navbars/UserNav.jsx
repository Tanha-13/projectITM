import { BadgeCheck, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function UserNav() {
  const user = {
    name: "Nusrat",
    email: "nusrat@gmail.com",
    avatar: "#",
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex justify-center items-center gap-4 outline-none cursor-pointer pe-1">
          <Avatar className="h-11 w-11 rounded-full">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="rounded-full">CN</AvatarFallback>
          </Avatar>
          <div className="hidden lg:grid flex-1 text-left text-sm">
            <span className="font-semibold">{user.name}</span>
            <span className="text-xs">{user.email}</span>
          </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className=" min-w-56 rounded-lg"
        side="bottom"
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="rounded-lg">CN</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">{user.name}</span>
              <span className="truncate text-xs">{user.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
          <DropdownMenuItem>
            <BadgeCheck />
            Profile
          </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserNav;
