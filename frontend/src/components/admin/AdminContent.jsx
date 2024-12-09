import InfoCardAdmin from "./InfoCardAdmin";
import StudentChart from "./StudentChart";

function AdminContent() {
  return (
    <div className="p-2 bg-gray-50 min-h-screen">
      <p className="text-3xl my-4 font-medium">Welcome Mr. Shark</p>
      <InfoCardAdmin></InfoCardAdmin>
      <StudentChart />
    </div>
  );
}

export default AdminContent;
