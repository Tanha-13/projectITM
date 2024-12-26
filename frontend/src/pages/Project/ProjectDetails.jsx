import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaUpload } from "react-icons/fa6";

function ProjectDetails() {
  const [loading, setLoading] = useState(false);
  const [project, setProject] = useState({});

  const { projectId } = useParams();

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:3000/api/projects/${projectId}`
        );
        if (!response.ok) {
          throw new Error("Error fetching project");
        }
        const data = await response.json();
        setProject(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjectDetails();
  }, [projectId]);
  console.log(project);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="p-10">
        <div>
          <h1 className="text-4xl font-bold">{project.name}</h1>
          <h2 className="text-2xl font-bold">{project.title}</h2>
        </div>
        <div>
          <form>
            <Card className="min-h-40 max-w-3xl mx-auto">
              <CardContent className="flex flex-col justify-center items-center h-full">
                <span>
                  <FaUpload />
                </span>
                Choose file to upload
              </CardContent>
            </Card>


          </form>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetails;
