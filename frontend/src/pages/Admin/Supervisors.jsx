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
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function Supervisors() {
  const [supervisors, setSupervisors] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [supervisorPerPage, setSupervisorPerPage] = useState(5);
  const [editingSupervisor, setEditingSupervisor] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  console.log(editingSupervisor);

  useEffect(() => {
    fetchSupervisors();
  }, []);

  const fetchSupervisors = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/admin/supervisors"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch supervisors");
      }
      const data = await response.json();
      console.log(data);
      setSupervisors(data);
    } catch (error) {
      console.error("Error fetching supervisors:", error);
    }
  };

  const filteredSupervisors = supervisors.filter(
    (supervisor) =>
      supervisor.user.firstName.toLowerCase().includes(search.toLowerCase()) ||
      supervisor.user.lastName.toLowerCase().includes(search.toLowerCase()) ||
      supervisor.user.email.toLowerCase().includes(search.toLowerCase()) ||
      supervisor.designation.toLowerCase().includes(search.toLowerCase())
  );

  const lastItem = currentPage * supervisorPerPage;
  const firstItem = lastItem - supervisorPerPage;
  const totalPages = Math.ceil(filteredSupervisors.length / supervisorPerPage);
  const currentSupervisors = filteredSupervisors.slice(firstItem, lastItem);
  console.log(currentSupervisors);

  const handleSearch = (event) => {
    setSearch(event.target.value);
    setCurrentPage(1);
  };

  const handleEdit = (supervisor) => {
    setEditingSupervisor({ ...supervisor });
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

  const handleSaveEdit = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/admin/supervisor/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editingSupervisor),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update supervisor");
      }
      fetchSupervisors();
      setEditingSupervisor(null);
      setIsEditDialogOpen(false);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Supervisor details has been updated",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Error updating supervisor:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditingSupervisor(null);
    setIsEditDialogOpen(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditingSupervisor((prev) => {
      if (name === "designation") {
        return {
          ...prev,
          designation: value,
        };
      }
      return{
        ...prev,
        user:{
          ...prev.user,
          [name]:value,
        }
      }
    });
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
      <h1 className="text-3xl font-semibold md:text-4xl">All Supervisors</h1>
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
        <Link to="/admin/supervisor/add">
          <Button className="hidden md:flex" variant="internalBtn">
            Add Supervisor
          </Button>
        </Link>
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
            <TableRow key={supervisor.user._id}>
              <TableCell>
                {(currentPage - 1) * supervisorPerPage + index + 1}
              </TableCell>
              <TableCell>{`${supervisor.user.firstName} ${supervisor.user.lastName}`}</TableCell>
              <TableCell>{supervisor.user.email}</TableCell>
              <TableCell>{supervisor.designation}</TableCell>
              <TableCell>
                <div className="flex items-center justify-center">
                  <Button
                    variant="secondary"
                    className="bg-primary text-white"
                    size="sm"
                    onClick={() => handleEdit(supervisor)}
                  >
                    <FaUserPen />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="ml-2"
                    onClick={() => handleDelete(supervisor._id)}
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
            <DialogTitle className="text-3xl text-center" autoFocus>
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
                value={editingSupervisor?.user?.firstName || ""}
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
                value={editingSupervisor?.user?.lastName || ""}
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
                value={editingSupervisor?.user?.email || ""}
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
              onClick={() => handleSaveEdit(editingSupervisor._id)}
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

export default Supervisors;
