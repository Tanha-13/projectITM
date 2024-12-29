import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format, addMonths } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

function CreateProject() {
  const [projectType, setProjectType] = useState(null);
  const [formData, setFormData] = useState({
    projectType: "",
    name: "",
    title: "",
    description: "",
    semester: "",
    year: new Date().getFullYear(),
    status: "Not started",
    startDate: null,
    endDate: null,
    assignee: "",
  });
  const [errors, setErrors] = useState({});
  const [students, setStudents] = useState([]);

  const { userId } = useParams();
  console.log(userId);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/supervisor/${userId}/students`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch students");
        }
        const data = await response.json();
        console.log(data);
        setStudents(data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    fetchStudents();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleDateChange = (name, date) => {
    setFormData((prevData) => ({ ...prevData, [name]: date }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const differenceInMonths = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start) || isNaN(end)) {
      return 0;
    }

    return (
      (end.getFullYear() - start.getFullYear()) * 12 +
      (end.getMonth() - start.getMonth())
    );
  };
  
  const validateForm = () => {
    let newErrors = {};
    if (!formData.name) newErrors.name = `${projectType} Name is required`;
    if (!formData.title) newErrors.title = `${projectType} Title is required`;
    if (!formData.description)
      newErrors.description = `${projectType} Description is required`;
    if (!formData.semester) newErrors.semester = "Semester is required";

    const startDate = new Date(formData.startDate);
    const endDate = new Date(formData.endDate);

    if (!formData.startDate) {
      newErrors.startDate = "Start Date is required";
    } else if (isNaN(startDate.getTime())) {
      newErrors.startDate = "Invalid Start Date";
    }

    if (!formData.endDate) {
      newErrors.endDate = "End Date is required";
    } else if (isNaN(endDate.getTime())) {
      newErrors.endDate = "Invalid End Date";
    } else if (endDate < startDate) {
      newErrors.endDate = "End Date must be after the Start Date";
    } else if (differenceInMonths(startDate, endDate) < 6) {
      newErrors.endDate = "End Date must be at least 6 months after Start Date";
    }

    if (!formData.assignee)
      newErrors.assignee = "Student assignment is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      Swal.fire({
        title: `Do you want to create new ${
          projectType === "Project" ? "Project" : "Thesis"
        }?`,
        icon: "question",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Create",
        denyButtonText: "Don't Create",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await fetch(
              `http://localhost:3000/api/supervisor/${userId}/create-project`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
              }
            );
            const data = await response.json();
            console.log(data);
            if (!response.ok) {
              throw new Error("Failed to add supervisor");
            }
            Swal.fire(
              "Created!",
              `The ${
                projectType === "Project" ? "Project" : "Thesis"
              } has been created successfully`,
              "success"
            );
            setFormData({
              projectType:'',
              name: "",
              title: "",
              description: "",
              semester: "",
              year: new Date().getFullYear(),
              status: "Not started",
              startDate: null,
              endDate: null,
              assignee: "",
            });
            setProjectType(null);
          } catch (error) {
            console.log("error", error);
            setErrors({
              submit:
                error.message || "Failed to add supervisor. Please try again.",
            });
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
    }
  };

  return (
    <div className="p-2 md:p-10 min-h-screen bg-gray-50">
      <Card className="p-2 md:p-10 max-w-7xl mx-auto w-full">
        <h1 className="text-3xl font-semibold md:text-4xl">
          Create {formData.projectType || "Project/Thesis"}
        </h1>
        <Separator className="my-4" />
        <CardContent>
          <div className="my-6 text-center">
            <h2 className="text-xl font-semibold mb-2">Select Type</h2>
            <RadioGroup
              onValueChange={(value) => {
                setProjectType(value);
                setFormData((prevData) => ({ ...prevData, projectType: value }));
              }}
              className="flex space-x-4 justify-around border p-2 rounded-sm shadow-sm"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Project" id="project" />
                <Label htmlFor="project">Project</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Thesis" id="thesis" />
                <Label htmlFor="thesis">Thesis</Label>
              </div>
            </RadioGroup>
          </div>
          {projectType && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">{projectType} Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={errors.name ? "border-red-600" : ""}
                />
                {errors.name && (
                  <p className="text-sm text-red-600">{errors.name}</p>
                )}
              </div>
              <div>
                <Label htmlFor="title">{projectType} Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={errors.title ? "border-red-600" : ""}
                />
                {errors.title && (
                  <p className="text-sm text-red-600">{errors.title}</p>
                )}
              </div>
              <div>
                <Label htmlFor="description">{projectType} Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className={errors.description ? "border-red-600" : ""}
                  rows={7}
                />
                {errors.description && (
                  <p className="text-sm text-red-600">{errors.description}</p>
                )}
              </div>
              <div>
                <Label htmlFor="semester">Semester</Label>
                <Select
                  name="semester"
                  onValueChange={(value) =>
                    handleSelectChange("semester", value)
                  }
                >
                  <SelectTrigger
                    className={errors.semester ? "border-red-500" : ""}
                  >
                    <SelectValue placeholder="Select semester" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Spring">Spring</SelectItem>
                    <SelectItem value="Fall">Fall</SelectItem>
                  </SelectContent>
                </Select>
                {errors.semester && (
                  <p className="text-red-600 text-sm mt-1">{errors.semester}</p>
                )}
              </div>
              <div>
                <Label htmlFor="year">Year</Label>
                <Input
                  id="year"
                  name="year"
                  type="number"
                  value={formData.year}
                  onChange={handleChange}
                  className={errors.year ? "border-red-500" : ""}
                />
                {errors.year && (
                  <p className="text-red-600 text-sm mt-1">{errors.year}</p>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startDate">Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="defaultBtn"
                        className={`w-full justify-start text-left font-normal ${
                          !formData.startDate && "text-muted-foreground"
                        }`}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.startDate ? (
                          format(formData.startDate, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.startDate}
                        onSelect={(date) => handleDateChange("startDate", date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  {errors.startDate && (
                    <p className="text-sm text-red-600">{errors.startDate}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="endDate">End Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="defaultBtn"
                        className={`w-full justify-start text-left font-normal ${
                          !formData.endDate && "text-muted-foreground"
                        }`}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.endDate ? (
                          format(formData.endDate, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.endDate}
                        onSelect={(date) => handleDateChange("endDate", date)}
                        initialFocus
                        disabled={(date) =>
                          date < addMonths(formData.startDate || new Date(), 6)
                        }
                      />
                    </PopoverContent>
                  </Popover>
                  {errors.endDate && (
                    <p className="text-sm text-red-600">{errors.endDate}</p>
                  )}
                </div>
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Input
                  id="status"
                  name="status"
                  value={formData.status}
                  disabled
                />
              </div>
              <div>
                <Label htmlFor="assignee">Assign Student</Label>
                <Select
                  name="assignee"
                  value={formData.assignee}
                  onValueChange={(value) =>
                    handleSelectChange("assignee", value)
                  }
                >
                  <SelectTrigger
                    className={errors.assignee ? "border-red-500" : ""}
                  >
                    <SelectValue placeholder="Select student" />
                  </SelectTrigger>
                  <SelectContent>
                    {students.map((student) => (
                      <SelectItem key={student._id} value={`${student._id}`}>
                        {`${student.user.firstName} ${student.user.lastName}`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.assignee && (
                  <p className="text-red-600 text-sm mt-1">{errors.assignee}</p>
                )}
              </div>
              <Button variant="default" type="submit" className="w-full">
                Create {projectType}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default CreateProject;
