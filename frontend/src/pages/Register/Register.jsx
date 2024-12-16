import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PersonalInfoForm from "../../components/Registration/PersonalInfoForm";
import AcademicInfoForm from "../../components/Registration/AcademicInfoForm";
import RegistrationInfoForm from "../../components/Registration/RegistrationInfoForm";
import { Separator } from "@/components/ui/separator";
import { studentIdCheck } from "@/lib/studentIdCheck";

const steps = [
  "Personal Information",
  "Academic Information",
  "Registration Info",
];

export default function Register() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    id: "",
    gender: "",
    semester: "",
    batch: "",
    registeredForThesis: "",
    proposalAccepted: "",
    supervisor: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateStep = () => {
    const newErrors = {};
    if (currentStep === 0) {
      if (!formData.firstName) newErrors.firstName = "First name is required";
      if (!formData.lastName) newErrors.lastName = "Last name is required";
      if(!formData.email){
        newErrors.email = "Student Email is required";
      }
      else{
        if (!formData.email.endsWith("@diu.edu.bd")) newErrors.email = "Valid DIU email is required";
      }
      if (!formData.studentId){
        newErrors.studentId = "ID is required";
      }
      else{
        const middlePart = "-51-";
          if(!studentIdCheck(formData.studentId,middlePart)){
            newErrors.studentId = "Provide a valid student ID";
          }
        }
      if (!formData.gender) newErrors.gender = "Gender is required";
      if (!formData.semester) newErrors.semester = "Semester is required";
      if (!formData.batch) newErrors.batch = "Batch is required";
    } 
    if (currentStep === 1) {
      if (!formData.registeredForProject)
        newErrors.registeredForProject = "This field is required";
      if (!formData.proposalAccepted)
        newErrors.proposalAccepted = "This field is required";
      if (!formData.supervisor) newErrors.supervisor = "Supervisor is required";
    } 
    if (currentStep === 2) {
      if (!formData.password) {
        newErrors.password = "Password is required";
      }
      else{
        if (!/(?=.*[@$!%*?&])/.test(formData.password)) {
          newErrors.password ="Special Character is required";
        }
        else if(!/(?=.*[A-Z])/.test(formData.password)){
          newErrors.password ="One Uppercase Character is required";
        }
        else if(!/(?=.[0-9])/.test(formData.password)){
          newErrors.password ="One Number is required";
        }
        else if(formData.password.length < 8){
          newErrors.password ="Provide password between 8 to 12 characters";
        }
        else if(formData.password.length > 12){
          newErrors.password ="Provide password between 8 to 12 characters";
        }
      }
      if (!formData.confirmPassword)
        newErrors.confirmPassword = "Confirm password is required";
      if (formData.password !== formData.confirmPassword)
        newErrors.confirmPassword = "Passwords do not match";
    }
    if(isSubmitted){

      setErrors(newErrors);
    }
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    setIsSubmitted(true);
    if (validateStep()) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
        setIsSubmitted(false);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    if (validateStep()) {
      console.log("Form submitted:", formData);
      // Here you would typically send the data to your backend
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center p-2 md:p-14">
      <Card className=" md:shadow-lg rounded-md w-full max-w-7xl p-2 md:p-5 lg:p-10">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl font-bold text-center">
            Student <span className="block md:inline">Registration Form</span>
          </CardTitle>
          <Separator/>
        </CardHeader>
        <CardContent>
          {/* Stepper */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-center mb-8 gap-2 md:gap-0">
            {steps.map((step, index) => (
              <React.Fragment key={step}>
                <div className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      index <= currentStep
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-white"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <div
                    className={`ml-2 text-sm ${
                      index <= currentStep
                        ? "text-primary font-medium"
                        : "text-muted-foreground"
                    }`}
                  >
                    {step}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-16 h-1 mx-2 ${
                      index < currentStep ? "bg-primary" : "bg-secondary"
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {currentStep === 0 && (
              <PersonalInfoForm
                formData={formData}
                handleChange={handleChange}
                errors={errors}
              />
            )}
            {currentStep === 1 && (
              <AcademicInfoForm
                formData={formData}
                handleChange={handleChange}
                errors={errors}
              />
            )}
            {currentStep === 2 && (
              <RegistrationInfoForm
                formData={formData}
                handleChange={handleChange}
                errors={errors}
              />
            )}
            <div className="flex justify-between py-4 gap-2">
              {currentStep > 0 && (
                <Button
                  onClick={handlePrevious}
                  variant=""
                  className="bg-gray-700 w-1/2"
                >
                  Previous
                </Button>
              )}
              {currentStep < steps.length - 1 ? (
                <Button variant="internalBtn" onClick={handleNext} className="mx-auto w-1/2">
                  Next
                </Button>
              ) : (
                <Button type="submit" variant="internalBtn" className="w-1/2">
                  Register
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
