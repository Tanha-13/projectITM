import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useEffect, useState } from "react";
import { FaTrash, FaUserPen } from "react-icons/fa6";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

function TotalStudents() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [studentPerPage, setStudentPerPage] = useState(5);
  const [editingStudent, setEditingStudent] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const currentUser = useSelector((state) => state.auth.user);

  useEffect(() => {

    studentsPerSupervisor();
  }, [currentUser.id]);

  const studentsPerSupervisor = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/supervisor/${currentUser.id}/students`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch supervisors");
      }
      const data = await response.json();
      console.log(data);
      setStudents(data);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredStudents = students.filter(
    (student) =>
      student.user.firstName.toLowerCase().includes(search.toLowerCase()) ||
      student.user.lastName.toLowerCase().includes(search.toLowerCase()) ||
      student.user.email.toLowerCase().includes(search.toLowerCase()) ||
      student.batch.toLowerCase().includes(search.toLowerCase()) ||
      student.studentId.includes(search) ||
      student.semester.toLowerCase().includes(search.toLowerCase())
  );
  const lastItem = currentPage * studentPerPage;
  const firstItem = lastItem - studentPerPage;
  const totalPages = Math.ceil(filteredStudents.length / studentPerPage);
  const currentStudents = filteredStudents.slice(firstItem, lastItem);

  const handleSearch = (event) => {
    setSearch(event.target.value);
    setCurrentPage(1);
  };


  const handleCancelEdit = () => {
    setEditingStudent(null);
    setIsEditDialogOpen(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditingStudent((prev) => ({
      ...prev,
      user: {
        ...prev.user,
        [name]: value,
      },
    }));
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleItemsPerPageChange = (value) => {
    setStudentPerPage(Number(value));
    setCurrentPage(1);
  };

  const handleEdit = (supervisor) => {
    setEditingStudent({ ...supervisor });
    setIsEditDialogOpen(true);
  };

    const handleDelete = async (id) => {
      try {
        Swal.fire({
          title: "Are you sure about deleting?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
          if (result.isConfirmed) {
            const response = await fetch(
              `http://localhost:3000/api/admin/supervisor/${id}`,
              {
                method: "DELETE",
              }
            );
            if (!response.ok) {
              throw new Error("Failed to delete supervisor");
            }
            studentsPerSupervisor();
            Swal.fire({
              title: "Deleted!",
              text: "Supervisor details has been deleted",
              icon: "success",
            });
          }
        });
      } catch (error) {
        console.error("Error deleting supervisor:", error);
      }
    };

  return (
    <div className="p-1 lg:p-10 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-semibold md:text-4xl">All Students</h1>
      <Separator />
      <div className="md:flex items-center justify-between gap-3 my-10">
        <Label className="md:hidden text-xl font-semibold" htmlFor="search">
          Search Supervisor
        </Label>
        <Input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={handleSearch}
          className="max-w-sm w-full"
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>S.No</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Student ID</TableHead>
            <TableHead>Semester</TableHead>
            <TableHead>Batch</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentStudents.map((student, index) => (
            <TableRow key={student.user._id}>
              <TableCell>
                {(currentPage - 1) * studentPerPage + index + 1}
              </TableCell>
              <TableCell>{`${student.user.firstName} ${student.user.lastName}`}</TableCell>
              <TableCell>{student.user.email}</TableCell>
              <TableCell>{student.studentId}</TableCell>
              <TableCell>{student.semester}</TableCell>
              <TableCell>{student.batch}</TableCell>
              
              <TableCell>
                <div className="flex items-center justify-center">
                  <Button
                    variant="secondary"
                    className="bg-primary text-white"
                    size="sm"
                    onClick={() => handleEdit(student)}
                  >
                    <FaUserPen />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="ml-2"
                    onClick={() => handleDelete(student._id)}
                  >
                    <FaTrash />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="md:flex w-full justify-between items-center md:mt-5">
        <div className="flex items-center gap-5 mt-2 md:mt-0 mb-5 md:mb-0">
          <Label htmlFor="items-per-page">Show Supervisor:</Label>
          <Select
            value={studentPerPage.toString()}
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
              <Label htmlFor="firstName" className="text-right">
                First Name
              </Label>
              <Input
                id="firstName"
                name="firstName"
                value={editingStudent?.user?.firstName || ""}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="lastName" className="text-right">
                Last Name
              </Label>
              <Input
                id="lastName"
                name="lastName"
                value={editingStudent?.user?.lastName || ""}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                value={editingStudent?.user?.email || ""}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
          </div>
          <div className="flex justify-between w-full space-x-2">
            <Button
              className="w-1/2"
              variant=""
              // onClick={() => handleSaveEdit(editingSupervisor._id)}
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

export default TotalStudents;
