import { useSidebar } from "@/components/ui/sidebar"
import { FaBars } from "react-icons/fa6";

export function CustomTrigger() {
  const { toggleSidebar } = useSidebar()

  return (
    <FaBars className="text-xl text-gray-700 cursor-pointer ms-2" onClick={toggleSidebar} />
  )
}
