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

function ProjectForm() {
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    description: "",
    semester: "",
    year: new Date().getFullYear(),
    status: "Not started",
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

  const validateForm = () => {
    let newErrors = {};
    Object.keys(formData).forEach((key) => {
      console.log(key);
      if (!formData[key]) {
        newErrors[key] = `${
          key.charAt(0).toUpperCase() + key.slice(1)
        } is required`;
      }
    });
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
          <Label htmlFor="name">Project Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`${errors.name ? "border-red-600" : ""}`}
          />
          {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
        </div>
        <div>
          <Label htmlFor="title">Project Title</Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`${errors.name ? "border-red-600" : ""}`}
          />
          {errors.title && (
            <p className="text-sm text-red-600">{errors.title}</p>
          )}
        </div>
        <div>
          <Label htmlFor="description">Project Description</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={`${errors.description ? "border-red-600" : ""}`}
          />
          {errors.description && (
            <p className="text-sm text-red-600">{errors.description}</p>
          )}
        </div>
        <div>
          <Label htmlFor="semester">Semester</Label>
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
        <div>
          <Label htmlFor="status">Status</Label>
          <Input id="status" name="status" value={formData.status} disabled />
        </div>
        <div>
          <Label htmlFor="assignee">Assignee Student</Label>
          <Select
            name="assignee"
            onValueChange={(value) => handleSelectChange("assignee", value)}
            
          >
            <SelectTrigger className={`${errors.assignee ? "border-red-500" : ""}`}>
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
