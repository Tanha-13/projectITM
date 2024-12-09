import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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

  const validateForm = () => {
    let newErrors = {};
    Object.keys(formData).forEach(key => {
      if(!formData[key]){
        newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`
      }
    })
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if(validateForm()){
      console.log('Form submitted:', formData);
      // send data to backend
    }
  };
  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setFormData((prev) => ({
      ...prev, [name]:value
    }))
  };
  const handleSelectChange = (value) => {
    setFormData((prev) => ({
      ...prev, 
      gender:value
    }))
  };

  const handleGeneratePassword = () => {
    const newPassword = generateTemporaryPassword();
    setFormData((prev) => ({
      ...prev,
      tempPassword: newPassword,
    }));
  };
  return (
    <div className="p-2 min-h-screen bg-gray-50">
      <Card className="p-5">
        <h1 className="text-3xl font-semibold md:text-4xl">Add Supervisor</h1>
      <Separator/>
      <CardContent className="my-10">
        <form onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                placeholder="Enter First Name"
                value={formData.firstName}
                onChange={handleInputChange}
                className={`rounded-none ${errors.firstName ? "border-red-500" : ""}`}
              />
              {errors.firstName && (
                <p className="text-red-600 text-sm mt-1">{errors.firstName}</p>
              )}
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Enter last name"
                className={`rounded-none ${errors.lastName ? "border-red-500" : ""}`}
              />
              {errors.lastName && (
                <p className="text-red-600 text-sm mt-1">{errors.lastName}</p>
              )}
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter email"
                className={` rounded-none ${errors.email ? "border-red-500" : ""}`}
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
                placeholder="Enter designation"
                className={` rounded-none ${errors.designation ? "border-red-500" : ""}`}
              />
              {errors.designation && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.designation}
                </p>
              )}
            </div>
          </div>
          <div>
            <Label htmlFor="gender">Gender</Label>
            <Select onValueChange={handleSelectChange} value={formData.gender}>
              <SelectTrigger
                className={`rounded-none ${errors.gender ? "border-red-500" : ""}`}
              >
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent className="text-black">
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
            <div className="flex flex-col lg:flex-row justify-center items-center gap-3">
              <Input
                id="tempPassword"
                name="tempPassword"
                placeholder="temporary password"
                value={formData.tempPassword}
                onChange={handleInputChange}
                readOnly
                className={` rounded-none w-full lg:w-4/5 ${errors.tempPassword ? "border-red-500" : ""}`}
              />
              <Button className="lg:w-1/5 px-3 py-4 rounded-full bg-gray-800 text-white hover:bg-secondary hover:text-white" variant="outline" onClick={handleGeneratePassword}>
                Generate Password
              </Button>
            </div>
            {errors.tempPassword && <p className="text-red-600 text-sm mt-1">{errors.tempPassword}</p>}
          </div>
        </form>
        <Button type="submit" className="w-full py-5 mt-10 text-base rounded-none">Add Supervisor<span className="hidden md:inline">& Send Credentials</span></Button>
      </CardContent>
    </Card>
    </div>
  );
}

export default AddSupervisor;
