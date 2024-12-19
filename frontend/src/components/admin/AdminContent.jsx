import { useSelector } from "react-redux";
import InfoCardAdmin from "./InfoCardAdmin";
import StudentChart from "./StudentChart";

function AdminContent() {
  const currentUser = useSelector((state) => state.auth.user);
  return (
    <div className="p-2 bg-gray-50 min-h-screen">
      <p className="text-3xl my-4 font-medium">{`Welcome ${currentUser.firstName} ${currentUser.lastName}`}</p>
      <InfoCardAdmin></InfoCardAdmin>
      <StudentChart />
    </div>
  );
}

export default AdminContent;
