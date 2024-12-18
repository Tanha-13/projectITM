import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { FaUserPen, FaTrash } from "react-icons/fa6";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Swal from "sweetalert2";
import { Badge } from "@/components/ui/badge";

// const mockSupervisors = [
//   {
//     id: 1,
//     name: "John Doe",
//     email: "john@example.com",
//     designation: "Senior Supervisor",
//   },
//   {
//     id: 2,
//     name: "Jane Smith",
//     email: "jane@example.com",
//     designation: "Team Lead",
//   },
//   {
//     id: 3,
//     name: "Bob Johnson",
//     email: "bob@example.com",
//     designation: "Department Manager",
//   },
//   {
//     id: 4,
//     name: "Alice Brown",
//     email: "alice@example.com",
//     designation: "Project Supervisor",
//   },
//   {
//     id: 5,
//     name: "Charlie Davis",
//     email: "charlie@example.com",
//     designation: "Assistant Manager",
//   },
//   {
//     id: 6,
//     name: "Eva Wilson",
//     email: "eva@example.com",
//     designation: "Senior Supervisor",
//   },
//   {
//     id: 7,
//     name: "Frank Miller",
//     email: "frank@example.com",
//     designation: "Team Lead",
//   },
//   {
//     id: 8,
//     name: "Grace Lee",
//     email: "grace@example.com",
//     designation: "Department Manager",
//   },
//   {
//     id: 9,
//     name: "Henry Taylor",
//     email: "henry@example.com",
//     designation: "Project Supervisor",
//   },
//   {
//     id: 10,
//     name: "Ivy Chen",
//     email: "ivy@example.com",
//     designation: "Assistant Manager",
//   },
// ];

function StudentsAdmin() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [studentPerPage, setStudentPerPage] = useState(5);
  const [editingStudent, setEditingStudent] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  // console.log(editingStudent);

  useEffect(() => {
    fetchAllStudents();
  }, []);

  const fetchAllStudents = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/admin/all-students"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch supervisors");
      }
      const data = await response.json();
      console.log(data);
      setStudents(data);
    } catch (error) {
      console.error("Error fetching supervisors:", error);
    }
  };
  console.log(students);
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
  console.log(currentStudents);

  const handleSearch = (event) => {
    setSearch(event.target.value);
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
          fetchSupervisors();
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

  // const handleSaveEdit = async (id) => {
  //   try {
  //     const response = await fetch(
  //       `http://localhost:3000/api/admin/supervisor/${id}`,
  //       {
  //         method: "PUT",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(editingSupervisor),
  //       }
  //     );
  //     if (!response.ok) {
  //       throw new Error("Failed to update supervisor");
  //     }
  //     fetchSupervisors();
  //     setEditingSupervisor(null);
  //     setIsEditDialogOpen(false);
  //     Swal.fire({
  //       position: "center",
  //       icon: "success",
  //       title: "Supervisor details has been updated",
  //       showConfirmButton: false,
  //       timer: 1500,
  //     });
  //   } catch (error) {
  //     console.error("Error updating supervisor:", error);
  //   }
  // };

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
            <TableHead>Supervisor</TableHead>
            <TableHead>Semester</TableHead>
            <TableHead>Batch</TableHead>
            <TableHead>Student Status</TableHead>
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
              <TableCell>{`${student.supervisor.user.firstName} ${student.supervisor.user.lastName}`}</TableCell>
              <TableCell>{student.semester}</TableCell>
              <TableCell>{student.batch}</TableCell>
              <TableCell>
                <Badge className={`${student.studentStatus === "pending" ? "bg-gray-200 text-gray-800 hover:bg-gray-500 hover:text-gray-50" : student.studentStatus === "approved" ? "bg-green-200 text-green-800 hover:bg-green-500 hover:text-green-50" : "bg-red-200 text-red-800 hover:bg-red-500 hover:text-red-50"}`}>
                  {student.studentStatus}
                </Badge>
              </TableCell>
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
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="designation" className="text-right">
                Designation
              </Label>
              <Input
                id="designation"
                name="designation"
                value={editingStudent?.designation || ""}
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

export default StudentsAdmin;
