import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";

function ProjectForm() {
  const [formData, setFormData] = useState({
    projectName: "",
    projectTitle: "",
    projectDescription: "",
    semester: "",
    year: new Date().getFullYear(),
    status: "Not started",
    startDate: null,
    endDate: null,
    assignee: "",
  });

  const [errors, setErrors] = useState({});

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
    if (!formData.projectName)
      newErrors.projectName = "Project Name is required";
    if (!formData.projectTitle)
      newErrors.projectTitle = "Project Title is required";
    if (!formData.projectDescription)
      newErrors.projectDescription = "Project Description is required";
    if (!formData.semester) newErrors.semester = "Semester is required";
    if (!formData.startDate) {
      newErrors.startDate = "Start Date is required";
    }

    if (!formData.endDate) {
      newErrors.endDate = "End Date is required";
    } else {
      if (new Date(formData.startDate) < new Date()) {
        newErrors.startDate = "Start Date cannot be in the past";
      } else {
        const startDate = new Date(formData.startDate);
        const endDate = new Date(formData.endDate);

        if (isNaN(startDate) || isNaN(endDate)) {
          newErrors.endDate = "Invalid dates provided";
        } else if (differenceInMonths(startDate, endDate) < 6) {
          newErrors.endDate =
            "End Date must be at least 6 months after Start Date";
        }
      }
    }
    if (!formData.assignee)
      newErrors.assignee = "Student assignment is required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Project form submitted:", formData);
      // Here you would typically send the data to your backend
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="projectName">Project Name</Label>
          <Input
            id="projectName"
            name="projectName"
            value={formData.projectName}
            onChange={handleChange}
            className={`${errors.projectName ? "border-red-600" : ""}`}
          />
          {errors.projectName && (
            <p className="text-sm text-red-600">{errors.projectName}</p>
          )}
        </div>
        <div>
          <Label htmlFor="projectTitle">Project Title</Label>
          <Input
            id="projectTitle"
            name="projectTitle"
            value={formData.projectTitle}
            onChange={handleChange}
            className={`${errors.projectTitle ? "border-red-600" : ""}`}
          />
          {errors.projectTitle && (
            <p className="text-sm text-red-600">{errors.projectTitle}</p>
          )}
        </div>
        <div>
          <Label htmlFor="projectDescription">Project Description</Label>
          <Textarea
            id="projectDescription"
            name="projectDescription"
            value={formData.projectDescription}
            onChange={handleChange}
            className={`${errors.projectDescription ? "border-red-600" : ""}`}
          />
          {errors.projectDescription && (
            <p className="text-sm text-red-600">{errors.projectDescription}</p>
          )}
        </div>
        <div>
          <Label htmlFor="semester">Project Semester</Label>
          <Select
            name="semester"
            onValueChange={(value) => handleSelectChange("semester", value)}
          >
            <SelectTrigger
              className={`${errors.semester ? "border-red-500" : ""}`}
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
            className={`${errors.year ? "border-red-500" : ""}`}
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
                  variant={"defaultBtn"}
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
            <Label htmlFor="startDate">End Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"defaultBtn"}
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
          <Input id="status" name="status" value={formData.status} disabled />
        </div>
        <div>
          <Label htmlFor="assignee">Assign Student</Label>
          <Select
            name="assignee"
            onValueChange={(value) => handleSelectChange("assignee", value)}
          >
            <SelectTrigger
              className={`${errors.assignee ? "border-red-500" : ""}`}
            >
              <SelectValue placeholder="Select student" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="student1">John Doe</SelectItem>
              <SelectItem value="student2">Jane Smith</SelectItem>
              <SelectItem value="student3">Mike Johnson</SelectItem>
            </SelectContent>
          </Select>
          {errors.assignee && (
            <p className="text-red-600 text-sm mt-1">{errors.assignee}</p>
          )}
        </div>
        <Button variant="internalBtn" type="submit" className="w-full">
          Create Project
        </Button>
      </form>
    </div>
  );
}

export default ProjectForm;
