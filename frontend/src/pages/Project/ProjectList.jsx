import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import StatusBadge from "@/components/StatusBadge";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import PropTypes from "prop-types"

const projectsData = {
  "Spring 2020": [
    {
      id: 1,
      type: "Project",
      title: "Smart Home Automation",
      description:"This is Smart Home Automation",
      studentId: "S001",
      status: "Not started",
      semester: "Spring 2020",
      year: 2020,
      supervisor: "Dr. Smith",
    },
    {
      id: 2,
      type: "Project",
      title: "AI Chat Application",
      description:"This is AI Chat Application",
      studentId: "S002",
      status: "In progress",
      semester: "Spring 2020",
      year: 2020,
      supervisor: "Dr. Johnson",
    },
    {
      id: 3,
      type: "Thesis",
      title: "Machine Learning in Healthcare",
      studentId: "S003",
      status: "Completed",
      semester: "Spring 2020",
      year: 2020,
      supervisor: "Dr. Brown",
    },
  ],
  "Fall 2021": [
    {
      id: 4,
      type: "Project",
      title: "Mobile Payment System",
      studentId: "S004",
      status: "In progress",
      semester: "Fall 2021",
      year: 2021,
      supervisor: "Dr. Davis",
    },
    {
      id: 5,
      type: "Thesis",
      title: "Blockchain in Supply Chain",
      studentId: "S005",
      status: "Completed",
      semester: "Fall 2021",
      year: 2021,
      supervisor: "Dr. Wilson",
    },
  ],
};

function ProjectList({ semester, onEditProject }) {
  const [projects, setProjects] = useState(projectsData[semester.name]);

  const handleStatusChange = (projectId, newStatus) => {
    setProjects(
      projects.map((project) =>
        project.id === projectId ? { ...project, status: newStatus } : project
      )
    );
  };

  const handleDelete = (projectId) => {
    setProjects(projects.filter((project) => project.id !== projectId));
  };

  return (
    <div className="overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4">
        {semester.name}
      </h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">S.No</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Student ID</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Semester</TableHead>
            <TableHead>Supervisor</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project, index) => (
            <TableRow key={project.id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{project.type}</TableCell>
              <TableCell>{project.title}</TableCell>
              <TableCell>{project.studentId}</TableCell>
              <TableCell>
                <StatusBadge
                  status={project.status}
                  onStatusChange={(newStatus) =>
                    handleStatusChange(project.id, newStatus)
                  }
                />
              </TableCell>
              <TableCell>{`${project.semester}`}</TableCell>
              <TableCell>{project.supervisor}</TableCell>
              <TableCell className="flex items-center justify-center">
                <Button
                  variant="secondary"
                  className="bg-primary text-white"
                  size="sm"
                  onClick={() => onEditProject(project)}
                >
                  <FaEdit />
                </Button>

                <Button
                  variant="destructive"
                  size="sm"
                  className="ml-2"
                  onClick={() => handleDelete(project.id)}
                >
                  <FaTrash />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default ProjectList;

ProjectList.propTypes = {
  semester: PropTypes.object,
  onEditProject: PropTypes.function
}