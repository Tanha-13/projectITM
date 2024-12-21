import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";

function StudentReview() {
  const [students, setStudents] = useState([]);
  const [activeTab, setActiveTab] = useState("pending");

  useEffect(() => {
    fetchStudents(activeTab);
  }, [activeTab]);

  const fetchStudents = async (status) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/admin/students?status=${status}`
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setStudents(data);
      }
    } catch (error) {
      console.error(`Error fetching ${status} students:`, error);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    Swal.fire({
            title: `${newStatus === "pending" ? "Back to pending tab?" : newStatus === "approved" ? "Do you want to approve and send email to supervisor?" : "Declined Student Details?"}`,
            icon: "question",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: `${newStatus === "declined" ? "Decline" : newStatus.charAt(0).toUpperCase().slice()+newStatus.slice(1)}`,
            denyButtonText: `Don't ${newStatus === "declined" ? "Decline" : newStatus.charAt(0).toUpperCase().slice()+newStatus.slice(1)}`,
          }).then(async (result) => {
            if (result.isConfirmed) {
              try {
                const response = await fetch(
                  `http://localhost:3000/api/admin/student/${id}`,
                  {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ status: newStatus }),
                  }
                );
                if (response.ok) {
                  fetchStudents(activeTab);
                }
                
                Swal.fire(
                  `${newStatus === "declined" ? "Decline" : newStatus.charAt(0).toUpperCase().slice()+newStatus.slice(1)}`,
                  `${newStatus === "pending" ? "Details added to pending section" : newStatus === "approved" ? "Student account created successfully" : "Declined"}`,
                  "success"
                );
              } catch (error) {
                console.log("error", error);
                Swal.fire(
                  "Error!",
                  "There was an issue creating the account.",
                  "error"
                );
              }
            } else if (result.isDenied) {
              Swal.fire("Changes are not added", "", "info");
            }
          });
  };
  console.log(students);

  const renderStudentTable = () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Student ID</TableHead>
          <TableHead>Supervisor</TableHead>
          <TableHead>Semester</TableHead>
          <TableHead>Batch</TableHead>
          <TableHead>Gender</TableHead>
          <TableHead>Registration for Project/Thesis</TableHead>
          <TableHead>Approved Proposal</TableHead>
          <TableHead>Actions</TableHead>
          {/* {activeTab === "pending" && <TableHead>Actions</TableHead>} */}
        </TableRow>
      </TableHeader>
      <TableBody>
        {students.map((student) => (
          <TableRow key={student._id}>
            <TableCell>{`${student.user.firstName} ${student.user.lastName}`}</TableCell>
            <TableCell>{student.user.email}</TableCell>
            <TableCell>{student.studentId}</TableCell>
            <TableCell>
            {/* {`${student.supervisor.user.firstName} ${student.supervisor.user.lastName}`} */}
            </TableCell>
            <TableCell>{student.semester}</TableCell>
            <TableCell>{student.batch}</TableCell>
            <TableCell>{student.user.gender}</TableCell>
            <TableCell>{`${student.registeredForProject ? 'Yes' : 'No'}`}</TableCell>
            <TableCell>{`${student.proposalAccepted ? 'Yes' : 'No'}`}</TableCell>
            {activeTab === "pending" && (
              <TableCell className="flex">
                <Button
                  onClick={() => handleStatusChange(student._id, "approved")}
                  className="mr-2"
                >
                  Approve
                </Button>
                <Button
                  onClick={() => handleStatusChange(student._id, "declined")}
                  variant="destructive"
                >
                  Decline
                </Button>
              </TableCell>
            )}
            {activeTab === "approved" && (
              <TableCell className="flex">
                <Button
                  onClick={() => handleStatusChange(student._id, "pending")}
                  className="mr-2"
                >
                  Pending
                </Button>
                <Button
                  onClick={() => handleStatusChange(student._id, "declined")}
                  variant="destructive"
                >
                  Decline
                </Button>
              </TableCell>
            )}
            {activeTab === "declined" && (
              <TableCell className="flex">
                <Button
                  onClick={() => handleStatusChange(student._id, "pending")}
                  className="mr-2"
                >
                  Pending
                </Button>
                <Button
                  onClick={() => handleStatusChange(student._id, "approved")}
                  variant="destructive"
                >
                  Approved
                </Button>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Student Review</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger className="text-primary" value="pending">Pending Students</TabsTrigger>
          <TabsTrigger value="approved">Approved Students</TabsTrigger>
          <TabsTrigger value="declined">Declined Students</TabsTrigger>
        </TabsList>
        <TabsContent value="pending">
          <h2 className="text-xl font-semibold mb-2">Pending Students</h2>
          {renderStudentTable()}
        </TabsContent>
        <TabsContent value="approved">
          <h2 className="text-xl font-semibold mb-2">Approved Students</h2>
          {renderStudentTable()}
        </TabsContent>
        <TabsContent value="declined">
          <h2 className="text-xl font-semibold mb-2">Declined Students</h2>
          {renderStudentTable()}
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default StudentReview;
