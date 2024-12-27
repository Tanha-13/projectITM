import { FaPlus } from "react-icons/fa6";
import { Button } from "../ui/button";
import InfoCardSupervisor from "./InfoCardSupervisor";
import ProjectByType from "./ProjectByType";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

function SupervisorContent() {
  const [infoCard, setInfoCard] = useState({});
  const currentUser = useSelector((state) => state.auth.user);
  const {userId} = useParams();
  useEffect(()=> {
    const fetchSupervisorInfo = async() => {
      try{
        const res = await fetch(`http://localhost:3000/api/${currentUser.role}/${userId}/profile`);

        if(!res.ok){
          throw new Error('Error in fetching supervisor info');
        }
        const data = await res.json();
        setInfoCard(data);
      }catch(err){
        console.log(err);
      }
    }

    fetchSupervisorInfo();
  },[currentUser.role, userId]);
  console.log(infoCard);
  return (
    <div className="p-2 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-xl md:text-3xl text-left my-4">
        {`Welcome Back, ${currentUser.firstName} ${currentUser.gender === 'female' ? "Ma'am" : 'Sir'}`}
        </h1>
        <Link to="/supervisor/create-project">
          <Button className="xl:me-10 hidden" variant="internalBtn">
            <FaPlus />
            Create Project
          </Button>
        </Link>
      </div>
      <div>
        <InfoCardSupervisor infoCard = {infoCard} />
        <div className="my-10">
          <h1></h1>
        </div>
        <ProjectByType />
      </div>
    </div>
  );
}

export default SupervisorContent;
