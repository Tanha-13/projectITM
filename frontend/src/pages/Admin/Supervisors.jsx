import { useState } from "react";
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
  DialogTrigger,
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

const mockSupervisors = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    designation: "Senior Supervisor",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    designation: "Team Lead",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    designation: "Department Manager",
  },
  {
    id: 4,
    name: "Alice Brown",
    email: "alice@example.com",
    designation: "Project Supervisor",
  },
  {
    id: 5,
    name: "Charlie Davis",
    email: "charlie@example.com",
    designation: "Assistant Manager",
  },
  {
    id: 6,
    name: "John Doe",
    email: "john@example.com",
    designation: "Senior Supervisor",
  },
  {
    id: 7,
    name: "Jane Smith",
    email: "jane@example.com",
    designation: "Team Lead",
  },
  {
    id: 8,
    name: "Bob Johnson",
    email: "bob@example.com",
    designation: "Department Manager",
  },
  {
    id: 9,
    name: "Alice Brown",
    email: "alice@example.com",
    designation: "Project Supervisor",
  },
  {
    id: 10,
    name: "Charlie Davis",
    email: "charlie@example.com",
    designation: "Assistant Manager",
  },
];
function Supervisors() {
  const [supervisors, setSupervisors] = useState(mockSupervisors);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [supervisorPerPage, setSupervisorPerPage] = useState(5);
  const [editingSupervisor, setEditingSupervisor] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  //filter supervisor
  const filteredSupervisors = supervisors.filter(
    (supervisor) =>
      supervisor.name.toLowerCase().includes(search.toLowerCase()) ||
      supervisor.email.toLowerCase().includes(search.toLowerCase()) ||
      supervisor.designation.toLowerCase().includes(search.toLowerCase())
  );

  //pagination code
  const lastItem = currentPage * supervisorPerPage;
  const firstItem = lastItem - supervisorPerPage;
  const totalPages = Math.ceil(filteredSupervisors.length / supervisorPerPage);
  const currentSupervisors = filteredSupervisors.slice(firstItem, lastItem);

  const handleSearch = (event) => {
    setSearch(event.target.value);
    setCurrentPage(1);
  };

  const handleEdit = (supervisor) => {
    setEditingSupervisor({ ...supervisor });
    setIsEditDialogOpen(true);
  };
  const handleDelete = (id) => {
    setSupervisors(supervisors.filter((supervisor) => supervisor.id !== id));
  };
  const handleSaveEdit = () => {
    setSupervisors(
      supervisors.map((supervisor) =>
        supervisor.id === editingSupervisor.id ? editingSupervisor : supervisor
      )
    );
    setEditingSupervisor(null);
    setIsEditDialogOpen(false);
  };

  const handleCancelEdit = () => {
    setEditingSupervisor(null);
    setIsEditDialogOpen(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditingSupervisor({ ...editingSupervisor, [name]: value });
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleItemsPerPageChange = (value) => {
    setSupervisorPerPage(Number(value));
    setCurrentPage(1);
  };
  return (
    <div className="p-1 lg:p-10 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-semibold md:text-4xl">Add Supervisor</h1>
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
        <Button className="hidden md:flex" variant="internalBtn">
          Add Supervisor
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>S.No</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Designation</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentSupervisors.map((supervisor, index) => (
            <TableRow key={supervisor.id}>
              <TableCell>
                {(currentPage - 1) * supervisorPerPage + index + 1}
              </TableCell>
              <TableCell>{supervisor.name}</TableCell>
              <TableCell>{supervisor.email}</TableCell>
              <TableCell>{supervisor.designation}</TableCell>
              <TableCell>
                <div className="flex items-center justify-center">
                  <Dialog
                    open={isEditDialogOpen}
                    onOpenChange={setIsEditDialogOpen}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="secondary"
                        className="bg-primary text-white"
                        size="sm"
                        onClick={() => handleEdit(supervisor)}
                      >
                        <FaUserPen />
                      </Button>
                    </DialogTrigger>
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
                            Name
                          </Label>
                          <Input
                            id="name"
                            name="name"
                            value={editingSupervisor?.name || ""}
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
                            value={editingSupervisor?.email || ""}
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
                            value={editingSupervisor?.designation || ""}
                            onChange={handleInputChange}
                            className="col-span-3"
                          />
                        </div>
                      </div>
                      <div className="flex justify-between w-full space-x-2">
                        <Button
                          className="w-1/2"
                          variant=""
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
                  <Button
                    variant="destructive"
                    size="sm"
                    className="ml-2"
                    onClick={() => handleDelete(supervisor.id)}
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
            value={supervisorPerPage.toString()}
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
                  className="disabled:bg-gray-400"
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink>{currentPage}</PaginationLink>
              </PaginationItem>
              {totalPages > 2 && (
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
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}

export default Supervisors;
