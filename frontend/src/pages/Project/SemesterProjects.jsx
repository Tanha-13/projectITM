import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation, Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import ProjectList from "./ProjectList";
import { useSelector } from "react-redux";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function SemesterProjects() {
  const [projects, setProjects] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [filteredSemesters, setFilteredSemesters] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  const { userId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const currentUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      try {
        let response;
        if (currentUser.role === "admin") {
          response = await fetch(
            `http://localhost:3000/api/admin/${userId}/semester-projects`
          );
        } else if (currentUser.role === "supervisor") {
          response = await fetch(
            `http://localhost:3000/api/supervisor/${userId}/semester-projects`
          );
        } else {
          throw new Error("Invalid user role");
        }
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
        // Handle error (e.g., show error message to user)
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, [userId, currentUser.role]);
  console.log(projects);
  useEffect(() => {
    const groupedSemesters = projects.reduce((acc, project) => {
      const key = `${project.student.semester}-${project.student.batch}`;
      const projectType = project.projectType;

      if (!acc[key]) {
        acc[key] = {
          semester: project.student.semester,
          batch: project.student.batch,
          projectCounts: {},
          projects: [],
        };
      }

      acc[key].projectCounts[projectType] =
        (acc[key].projectCounts[projectType] || 0) + 1;
      acc[key].projects.push(project);
      return acc;
    }, {});

    const groupedData = Object.values(groupedSemesters).map((group) => ({
      ...group,
      totalProjects: group.projects.length,
      projectTypeCounts: group.projectCounts,
    }));

    // Sort groupedData by batch in ascending order
    groupedData.sort((a, b) => {
      const batchA = parseInt(a.batch.match(/\d+/)?.[0] || "0", 10);
      const batchB = parseInt(b.batch.match(/\d+/)?.[0] || "0", 10);
      return batchA - batchB;
    });

    setSemesters(groupedData);
    setFilteredSemesters(groupedData);
  }, [projects]);
  console.log(semesters);

  useEffect(() => {
    const filtered = semesters.filter(
      (semester) =>
        semester.semester.toLowerCase().includes(searchTerm.toLowerCase()) ||
        semester.batch.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSemesters(filtered);
    setCurrentPage(1);
  }, [searchTerm, semesters]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSemesters.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  useEffect(() => {
    const totalPages = Math.ceil(filteredSemesters.length / itemsPerPage);
    setTotalPages(totalPages);
  }, [filteredSemesters, itemsPerPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1);
  };

  const handleSemesterClick = (semester) => {
    const formattedSemester = semester.semester.replace(/\s+/g, "-");
    navigate(`/supervisor/${userId}/projects/${formattedSemester}`, {
      state: { semesterData: semester },
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (projects.length === 0) {
    return (
      <div className="flex justify-center items-center h-[80%]">
        No projects and theses for any semester.{" "}
        <Link className="text-secondary text-base underline">
          Create Project
        </Link>
      </div>
    );
  }

  // Check if we're on a project list page
  const isProjectListPage = location.pathname.includes("/projects/");

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto p-4">
        {!isProjectListPage ? (
          <>
            <Input
              type="text"
              placeholder="Search semesters..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md mb-4 bg-white"
            />

            <h1 className="text-3xl mt-10 mb-2 font-bold">
              Project and Thesis List based on Semester
            </h1>
            <Separator className="mb-9" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 min-h-40">
              {currentItems.map((semester, index) => (
                <Card
                  key={index}
                  className={`cursor-pointer hover:shadow-md transition-shadow rounded-md border-t-4 ${
                    semester.semester.toLowerCase().includes("spring")
                      ? "border-t-secondary"
                      : "border-t-primary"
                  } bg-[linear-gradient(to_bottom,_#fff,#dbeafe)] flex flex-col`}
                  onClick={() => handleSemesterClick(semester)}
                >
                  <CardHeader className="flex items-center">
                    <CardTitle className="text-2xl font-bold">
                      {semester.semester}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {semester.batch}
                    </CardDescription>
                  </CardHeader>
                  <div className="flex-grow"></div>
                  <CardContent
                    className={`overflow-hidden ${
                      semester.semester.toLowerCase().includes("spring")
                        ? "bg-primary"
                        : "bg-third"
                    } text-gray-50 font-medium flex items-center justify-around min-h-12 rounded-b-md`}
                  >
                    <p>Projects: {semester.projectTypeCounts.Project || 0}</p>
                    <p>Theses: {semester.projectTypeCounts.Thesis || 0}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-4 flex justify-between items-center">
              <div className="flex items-center gap-5 mt-2 md:mt-0 mb-5 md:mb-0">
                <Label htmlFor="items-per-page">Show Semester:</Label>
                <Select
                  value={itemsPerPage.toString()}
                  onValueChange={handleItemsPerPageChange}
                >
                  <SelectTrigger className="w-[100px] ">
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
                      <PaginationLink>{currentPage}</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      {totalPages > 2 && currentPage < totalPages - 1 && (
                        <PaginationItem>
                          <PaginationEllipsis />
                        </PaginationItem>
                      )}
                      {currentPage < totalPages && (
                        <PaginationItem>
                          <PaginationLink
                            onClick={() => handlePageChange(totalPages)}
                          >
                            {totalPages}
                          </PaginationLink>
                        </PaginationItem>
                      )}
                      <PaginationNext
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </div>
          </>
        ) : (
          <ProjectList />
        )}
      </div>
    </div>
  );
}

export default SemesterProjects;
