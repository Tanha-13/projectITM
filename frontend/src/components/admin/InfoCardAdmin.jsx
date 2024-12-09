import { Card, CardContent, CardTitle } from "../ui/card";
import students from "../../assets/icons/students.png";
import supervisors from "../../assets/icons/supervisors.png";
import projects from "../../assets/icons/projects.png";
import theses from "../../assets/icons/thesis.png";

function InfoCardAdmin() {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
        <div>
          <Card className="rounded-md text-left flex items-center justify-center gap-5 p-2 md:p-8 min-h-40 ">
            <img
              src={students}
              className="w-20 h-20 rounded-full p-2  bg-gray-200"
            />
            <div className="text-center">
              <CardTitle className="text-xl text-secondary">
                Total Students
              </CardTitle>
              <CardContent className="text-2xl text-third font-bold">
                2000
              </CardContent>
            </div>
          </Card>
        </div>
        <div>
          <Card className="rounded-md text-left flex items-center justify-center gap-5 p-2 md:p-8 min-h-40">
            <img
              src={supervisors}
              className="w-20 h-20 rounded-full p-2 bg-gray-200"
            />
            <div className="text-center">
              <CardTitle className="text-xl text-secondary">
                Total Supervisors
              </CardTitle>
              <CardContent className="text-2xl text-third font-bold">
                200
              </CardContent>
            </div>
          </Card>
        </div>
        <div>
          <Card className="rounded-md text-left flex items-center justify-center gap-5 p-2 md:p-8 min-h-40">
            <img
              src={projects}
              className="w-20 h-20 rounded-full p-2 bg-gray-200"
            />
            <div className="text-center">
              <CardTitle className="text-xl text-secondary">
                Total Projects
              </CardTitle>
              <CardContent className="text-2xl text-third font-bold">
                89
              </CardContent>
            </div>
          </Card>
        </div>
        <div>
          <Card className="rounded-md text-left flex items-center justify-center gap-5 p-2 md:p-8 min-h-40">
            <img
              src={theses}
              className="w-20 h-20 rounded-full p-2 bg-gray-200"
            />
            <div className="text-center">
              <CardTitle className="text-xl text-secondary">
                Total Theses
              </CardTitle>
              <CardContent className="text-2xl text-third font-bold">
                56
              </CardContent>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}

export default InfoCardAdmin;
