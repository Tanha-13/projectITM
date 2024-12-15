import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { generateTemporaryPassword } from "@/lib/generatePassword";
import { useState } from "react";

function AddSupervisor() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    designation: "",
    gender: "",
    tempPassword: "",
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: ''
    }));
  };

  const handleSelectChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      gender: value,
    }));
    setErrors(prevErrors => ({
      ...prevErrors,
      gender: ''
    }));
  };

  const handleGeneratePassword = () => {
    const newPassword = generateTemporaryPassword();
    setFormData((prev) => ({
      ...prev,
      tempPassword: newPassword,
    }));
    setErrors(prevErrors => ({
      ...prevErrors,
      tempPassword: ''
    }));
  };

  const validateForm = () => {
    let newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = `${
          key.charAt(0).toUpperCase()+key.slice(1)
        } is required`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
      // send data to backend
    }
  };
  /**
   * 
   */

  return (
    <div className="p-2 md:p-10 min-h-screen bg-gray-50">
      <Card className="p-5 max-w-7xl mx-auto w-full">
        <CardHeader>
        <h1 className="text-3xl font-semibold md:text-4xl">Add Supervisor</h1>
        <Separator />
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="enter first name"
                  className={`${errors.firstName ? "border-red-600" : ""}`}
                />
                {errors.firstName && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.firstName}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="enter last name"
                  className={`${errors.lastName ? "border-red-600" : ""}`}
                />
                {errors.lastName && (
                  <p className="text-red-600 text-sm mt-1">{errors.lastName}</p>
                )}
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="enter email"
                  className={`${errors.email ? "border-red-600" : ""}`}
                />
                {errors.email && (
                  <p className="text-red-600 text-sm mt-1">{errors.email}</p>
                )}
              </div>
              <div>
                <Label htmlFor="designation">Designation</Label>
                <Input
                  id="designation"
                  name="designation"
                  value={formData.designation}
                  onChange={handleInputChange}
                  placeholder="enter designation"
                  className={`${errors.designation ? "border-red-500" : ""}`}
                />
                {errors.designation && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.designation}
                  </p>
                )}
              </div>

            <div>
              <Label htmlFor="gender">Gender</Label>
              <Select
                onValueChange={handleSelectChange}
                value={formData.gender}
              >
                <SelectTrigger
                  className={`${errors.gender ? "border-red-500" : ""}`}
                >
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.gender && (
                <p className="text-red-600 text-sm mt-1">{errors.gender}</p>
              )}
            </div>

            <div>
              <Label htmlFor="tempPassword">Temporary Password</Label>
              <div className="flex flex-col md:flex-row justify-center items-center space-x-2">
                <Input
                  id="tempPassword"
                  name="tempPassword"
                  value={formData.tempPassword}
                  onChange={handleInputChange}
                  readOnly
                  placeholder="temporary password"
                  className={`${errors.tempPassword ? "border-red-500" : ""}`}
                />
                <Button onClick={handleGeneratePassword} type="button">
                  Generate Password
                </Button>
              </div>
              {errors.tempPassword && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.tempPassword}
                </p>
              )}
            </div>

            <Button variant="internalBtn" type="submit" className="w-full">
              Add Supervisor
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default AddSupervisor;
