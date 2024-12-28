import { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import StatusBadge from "@/components/StatusBadge";
import { FaEdit, FaTrash } from "react-icons/fa";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import Swal from "sweetalert2";
import { Textarea } from "@/components/ui/textarea";
import { setCurrentProject } from "@/redux/slice/projectSlice";


function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage, setProjectsPerPage] = useState(5);
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [editingProject, setEditingProject] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const location = useLocation();
  const semesterData = location.state?.semesterData;
  const currentUser = useSelector((state) => state.auth.user);
  const {semester} = useParams();
  
  const dispatch = useDispatch();

  useEffect(() => {
    if (semesterData?.projects) {
      setProjects(semesterData.projects);
      setFilteredProjects(semesterData.projects);
    }
  }, [semesterData]);
  console.log(projects[0])

  useEffect(() => {
    const filtered = projects.filter(
      (project) =>
        (project.name.toLowerCase().includes(search.toLowerCase()) ||
          project.title.toLowerCase().includes(search.toLowerCase()) ||
          project.student.studentId.includes(search) || 
          project.student.email.toLowerCase().includes(search.toLowerCase())) 
          &&
        (filterType === "all" || project.projectType === filterType) &&
        (filterStatus === "all" || project.status === filterStatus)
    );
    setFilteredProjects(filtered);
  }, [projects, search, filterType, filterStatus]);

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(
    indexOfFirstProject,
    indexOfLastProject
  );
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleProjectsPerPageChange = (value) => {
    setProjectsPerPage(Number(value));
    setCurrentPage(1);
  };

  const handleEdit = (project) => {
    setEditingProject({ ...project });
    setIsEditDialogOpen(true);
  };

  const handleDelete = async (projectId) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure about deleting?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        const response = await fetch(
          `http://localhost:3000/api/supervisor/${currentUser.id}/projects/${projectId}`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to delete project");
        }

        const data = await response.json();
        console.log(data);
        setProjects(projects.filter((project) => project._id !== projectId));
        Swal.fire({
          title: "Deleted!",
          text: "Project has been deleted",
          icon: "success",
        });
      }
    } catch (error) {
      console.error("Error deleting project:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to delete project",
        icon: "error",
      });
    }
  };

  const handleStatusChange = async (projectId, newStatus) => {
    try {
      // Optimistically update the UI
      const updatedProjects = projects.map(project =>
        project._id === projectId ? { ...project, status: newStatus } : project
      );
      setProjects(updatedProjects);
      setFilteredProjects(prevFilteredProjects =>
        prevFilteredProjects.map(project =>
          project._id === projectId ? { ...project, status: newStatus } : project
        )
      );

      const res = await fetch(
        `http://localhost:3000/api/supervisor/${currentUser.id}/projects/${projectId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );
      if (!res.ok) {
        throw new Error("Failed to update project status");
      }
      const updatedProject = await res.json();
      console.log("Updated project:", updatedProject);

      Swal.fire({
        title: "Success",
        text: "Project status updated successfully",
        icon: "success",
      });
    } catch (error) {
      console.error("Error updating project status:", error);
      // Revert the changes if the API call fails
      setProjects(prevProjects => prevProjects.map(project =>
        project._id === projectId ? { ...project, status: project.status } : project
      ));
      setFilteredProjects(prevFilteredProjects => prevFilteredProjects.map(project =>
        project._id === projectId ? { ...project, status: project.status } : project
      ));
      Swal.fire({
        title: "Error",
        text: "Failed to update project status",
        icon: "error",
      });
    }
  };

  const handleSaveEdit = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/supervisor/${currentUser.id}/projects/${editingProject._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editingProject),
        }
      );
      if (!res.ok) {
        throw new Error("Failed to update project");
      }
      const data = await res.json();
      console.log(data);
      setProjects(
        projects.map((project) =>
          project._id === editingProject._id ? editingProject : project
        )
      );
      setIsEditDialogOpen(false);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Project has been updated",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Error updating project:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to update project",
        icon: "error",
      });
    }
  };

  const handleCancelEdit = () => {
    setEditingProject(null);
    setIsEditDialogOpen(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditingProject((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleViewProject = (project) => {
    dispatch(setCurrentProject(project));

  };

  return (
    <div className="p-1 lg:p-10 min-h-screen bg-gray-50">
      <h2 className="text-3xl font-semibold mb-4">
        {semesterData?.semester} - {semesterData?.batch}
      </h2>
      <div className="md:flex items-center justify-between gap-3 my-10">
        <Input
          type="text"
          placeholder="Search projects..."
          value={search}
          onChange={handleSearch}
          className="max-w-sm w-full mb-4 md:mb-0"
        />
        <div className="flex gap-4">
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Project">Project</SelectItem>
              <SelectItem value="Thesis">Thesis</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Not started">Not started</SelectItem>
              <SelectItem value="In progress">In progress</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">S.No</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Project Type</TableHead>
            <TableHead>Student ID</TableHead>
            <TableHead>Student Email</TableHead>
            <TableHead>Student Batch</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Final Year Semester</TableHead>
            <TableHead>View Project</TableHead>
            {currentUser.role === "admin" && <TableHead>Supervisor</TableHead>}
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentProjects.map((project, index) => (
            <TableRow key={project._id}>
              <TableCell className="font-medium">
                {indexOfFirstProject + index + 1}
              </TableCell>
              <TableCell>{project.name}</TableCell>
              <TableCell>{project.title}</TableCell>
              <TableCell>{project.projectType}</TableCell>
              <TableCell>{project.student.studentId}</TableCell>
              <TableCell>{project.student.email}</TableCell>
              <TableCell>{project.student.studentId}</TableCell>
              <TableCell>
                <StatusBadge
                  status={project.status}
                  onStatusChange={(newStatus) =>
                    handleStatusChange(project._id, newStatus)
                  }
                />
              </TableCell>
              <TableCell>{`${project.semester} ${project.year}`}</TableCell>
              <TableCell className="flex justify-center">
                <Link to={`/${currentUser.role}/${currentUser.id}/projects/${semester}/${project._id}`}>
                  <Button
                    variant="internalBtn"
                    onClick={() => handleViewProject(project)}
                  >
                    View
                  </Button>
                </Link>
              </TableCell>
              {currentUser.role === "admin" && (
                <TableCell>
                  {project.supervisor?.firstName || "N/A"}{" "}
                  {project.supervisor?.lastName || ""}
                </TableCell>
              )}
              <TableCell>
                <div className="flex items-center justify-center">
                  <Button
                    variant="secondary"
                    className="bg-primary text-white"
                    size="sm"
                    onClick={() => handleEdit(project)}
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="ml-2"
                    onClick={() => handleDelete(project._id)}
                  >
                    <FaTrash />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="md:flex items-center justify-between md:mt-5">
        <div className="flex items-center gap-5 mt-2 md:mt-0 mb-5 md:mb-0">
          <Label htmlFor="items-per-page">Show Projects:</Label>
          <Select
            value={projectsPerPage.toString()}
            onValueChange={handleProjectsPerPageChange}
          >
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="cursor-pointer disabled:opacity-50"
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink>{currentPage}</PaginationLink>
              </PaginationItem>
              {totalPages > 2 && currentPage < totalPages - 1 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              {currentPage < totalPages && (
                <PaginationItem>
                  <PaginationLink onClick={() => handlePageChange(totalPages)}>
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>
              )}
              <PaginationItem>
                <PaginationNext
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="cursor-pointer disabled:opacity-50"
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-3xl text-center">
              Edit Details
            </DialogTitle>
            <Separator />
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Project Name
              </Label>
              <Input
                id="name"
                name="name"
                value={editingProject?.name || ""}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Project Title
              </Label>
              <Textarea
                id="title"
                name="title"
                value={editingProject?.title || ""}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                value={editingProject?.description || ""}
                onChange={handleInputChange}
                className="col-span-3"
                rows={5}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="semester" className="text-right">
                Semester
              </Label>
              <Select
                name="semester"
                value={editingProject?.semester || ""}
                onValueChange={(value) =>
                  handleInputChange({ target: { name: "semester", value } })
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select project type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Project">Spring</SelectItem>
                  <SelectItem value="Thesis">Fall</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* Start Date */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="startDate" className="text-right">
                Start Date
              </Label>
              <Input
                id="startDate"
                name="startDate"
                type="date"
                value={
                  editingProject?.startDate
                    ? new Date(editingProject.startDate)
                        .toISOString()
                        .split("T")[0]
                    : new Date().toISOString().split("T")[0]
                }
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>

            {/* End Date */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="endDate" className="text-right">
                End Date
              </Label>
              <Input
                id="endDate"
                name="endDate"
                type="date"
                value={
                  editingProject?.endDate
                    ? new Date(editingProject.endDate)
                        .toISOString()
                        .split("T")[0]
                    : new Date().toISOString().split("T")[0]
                }
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
          </div>
          <div className="flex justify-between w-full space-x-2">
            <Button
              className="w-1/2"
              variant="default"
              onClick={handleSaveEdit}
            >
              Save changes
            </Button>
            <Button
              className="w-1/2"
              variant="destructive"
              onClick={handleCancelEdit}
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ProjectList;

