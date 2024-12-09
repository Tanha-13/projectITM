import { FaPlus } from "react-icons/fa6";
import { Button } from "../ui/button";
import InfoCardSupervisor from "./InfoCardSupervisor";
import ProjectByType from "./ProjectByType";


function SupervisorContent() {
  return (
    <div className="p-2 bg-gray-50 min-h-screen">
    <div className="flex items-center justify-between gap-4">
      <h1 className="text-xl md:text-3xl text-left my-4">Welcome <span className="hidden md:inline">Back</span>, <span className="font-bold block lg:inline">Nusrat Jahan</span></h1>
      <Button className="xl:me-10" variant="internalBtn">
      <FaPlus/>
      Create Project</Button>
    </div>
      <div>
        <InfoCardSupervisor/>
        <div className="my-10">
          <h1></h1>
        </div>
        <ProjectByType/>
      </div>
    </div>
  );
}

export default SupervisorContent;
