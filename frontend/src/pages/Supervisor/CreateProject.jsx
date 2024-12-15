import ProjectForm from "@/components/project/ProjectForm";
import ThesisForm from "@/components/project/ThesisForm";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

function CreateProject() {
  const [projectType, setProjectType] = useState(null);
  return (
    <div className="p-2 md:p-10 min-h-screen bg-gray-50">
      <Card className="p-10 max-w-7xl mx-auto w-full">
        <h1 className="text-3xl font-semibold md:text-4xl">Create Project</h1>
        <Separator />
        <CardContent>
          <div className="my-6 text-center">
            <h2 className="text-xl font-semibold mb-2">Select Project Type</h2>
            <RadioGroup
              onValueChange={setProjectType}
              className="flex space-x-4 justify-around border p-2 rounded-sm shadow-sm"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="project" id="project" />
                <Label htmlFor="project">Project</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="thesis" id="thesis" />
                <Label htmlFor="thesis">Thesis</Label>
              </div>
            </RadioGroup>
          </div>
          {projectType === "project" && <ProjectForm />}
          {projectType === "thesis" && <ThesisForm />}
        </CardContent>
      </Card>
    </div>
  );
}

export default CreateProject;
