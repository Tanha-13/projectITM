import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ProjectList from "./ProjectList";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ProjectModal from "@/components/project/ProjectModal";
import ThesisModal from "@/components/project/ThesisModal";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FaArrowLeft } from "react-icons/fa6";

// Sample data
const semesters = [
  { id: 1, name: "Spring 2020", projects: 3, thesis: 2, batch: "1st" },
  { id: 2, name: "Fall 2021", projects: 2, thesis: 2, batch: "2nd" },
  { id: 3, name: "Spring 2021", projects: 4, thesis: 2, batch: "3rd" },
  { id: 4, name: "Fall 2022", projects: 3, thesis: 1, batch: "4th" },
  { id: 5, name: "Spring 2022", projects: 5, thesis: 3, batch: "5th" },
  { id: 6, name: "Fall 2023", projects: 2, thesis: 2, batch: "6th" },
  { id: 7, name: "Spring 2023", projects: 4, thesis: 2, batch: "7th" },
];

function SemesterProjects() {
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentSemesters, setCurrentSemesters] = useState([]);

  useEffect(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    setCurrentSemesters(semesters.slice(indexOfFirstItem, indexOfLastItem));
  }, [currentPage, itemsPerPage]);

  const handleSemesterClick = (semester) => {
    setSelectedSemester(semester);
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setIsEditModalOpen(true);
  };

  const handleUpdateProject = (updatedData) => {
    // Here you would typically update the project in your data store
    console.log("Updated project:", updatedData);
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setEditingProject(null);
  };

  // Pagination logic
  const totalPages = Math.ceil(semesters.length / itemsPerPage);

  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto p-2 md:p-4">
        {!selectedSemester ? (
          <div className="">
            <h1 className="text-3xl text-center font-bold my-4">
              Semester List
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 min-h-40">
              {currentSemesters.map((semester) => (
                <Card
                  key={semester.id}
                  className={`cursor-pointer hover:shadow-md transition-shadow rounded-md border-t-4 ${
                    semester.name.toLowerCase().includes("spring")
                      ? "border-t-secondary"
                      : "border-t-primary"
                  } bg-[linear-gradient(to_bottom,_#fff,#dbeafe)] flex flex-col`}
                  onClick={() => handleSemesterClick(semester)}
                >
                  <CardHeader className="flex items-center">
                    <CardTitle className="text-2xl font-bold">
                      {semester.name}
                    </CardTitle>
                    <CardDescription className="text-base">{`${semester.batch} Batch`}</CardDescription>
                  </CardHeader>
                  <div className="flex-grow "></div>
                  <CardContent
                    className={`overflow-hidden ${
                      semester.name.toLowerCase().includes("spring")
                        ? "bg-primary"
                        : "bg-third"
                    } text-gray-50 font-medium flex items-center justify-around min-h-12 rounded-b-md`}
                  >
                    <p className="text-sm ">Project: {semester.SemesterProjects}</p>
                    <p className="text-sm ">Thesis: {semester.thesis}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="md:flex w-full justify-between items-center md:mt-5">
              <div className="flex items-center gap-5 mt-2 md:mt-0 mb-5 md:mb-0">
                <Label htmlFor="items-per-page">Show Semesters:</Label>
                <Select
                  value={itemsPerPage.toString()}
                  onValueChange={handleItemsPerPageChange}
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
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <h1 className="text-3xl text-center font-bold my-4">
                Project List
              </h1>
              <Button
                onClick={() => setSelectedSemester(null)}
                className="mb-4"
              >
                <FaArrowLeft/>
                Back to Semesters
              </Button>
            </div>
            <ProjectList
              semester={selectedSemester}
              onEditProject={handleEditProject}
            />
          </>
        )}
        {isEditModalOpen && editingProject && (
          <Dialog open={true} onOpenChange={handleCloseModal}>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle className="text-xl">
                  Edit {editingProject.type}
                </DialogTitle>
              </DialogHeader>
              {editingProject.type === "Project" ? (
                <div>
                  <ProjectModal
                    formDetails={editingProject}
                    isOpen={isEditModalOpen}
                    onClose={handleCloseModal}
                    onUpdate={handleUpdateProject}
                  />
                </div>
              ) : (
                <ThesisModal
                  formDetails={editingProject}
                  isOpen={isEditModalOpen}
                  onClose={handleCloseModal}
                  onUpdate={handleUpdateProject}
                />
              )}
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}

export default SemesterProjects;

