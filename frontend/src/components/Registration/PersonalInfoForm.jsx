import { useMemo } from 'react';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import PropTypes from "prop-types"

export default function PersonalInfoForm({ formData, handleChange, errors }) {
  const currentYear = new Date().getFullYear();
  const startYear = 2020;
  
  const semesterOptions = useMemo(() => {
    const options = [];
    for (let year = startYear; year <= currentYear + 1; year++) {
      options.push({ value: `Spring ${year}`, label: `Spring ${year}` });
      options.push({ value: `Fall ${year}`, label: `Fall ${year}` });
    }
    return options;
  }, [currentYear]);

  const batchOptions = useMemo(() => {
    const options = [];
    let batchCount = 1;
    for (let year = startYear; year <= currentYear + 1; year++) {
      options.push({ 
        value: `Batch ${batchCount.toString().padStart(2, '0')}`, 
        label: `Batch ${batchCount.toString().padStart(2, '0')}` 
      });
      batchCount++;
      options.push({ 
        value: `Batch ${batchCount.toString().padStart(2, '0')}`, 
        label: `Batch ${batchCount.toString().padStart(2, '0')}` 
      });
      batchCount++;
    }
    return options;
  }, [currentYear]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
            className={`mt-1 ${errors.firstName ? 'border-red-600' : ''}`}
          />
          {errors.firstName && <p className="text-red-600 text-sm mt-1">{errors.firstName}</p>}
        </div>
        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
            className={`mt-1 ${errors.lastName ? 'border-red-600' : ''}`}
          />
          {errors.lastName && <p className="text-red-600 text-sm mt-1">{errors.lastName}</p>}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className={`mt-1 ${errors.email ? 'border-red-600' : ''}`}
          />
          {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
        </div>
        <div>
          <Label htmlFor="studentId">ID</Label>
          <Input
            id="studentId"
            name="studentId"
            value={formData.studentId}
            onChange={(e) => handleChange('studentId', e.target.value)}
            className={`mt-1 ${errors.studentId ? 'border-red-600' : ''}`}
          />
          {errors.studentId && <p className="text-red-600 text-sm mt-1">{errors.studentId}</p>}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="gender">Gender</Label>
          <Select
            value={formData.gender}
            onValueChange={(value) => handleChange('gender', value)}
          >
            <SelectTrigger className={`mt-1 ${errors.gender ? 'border-red-600' : ''}`}>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          {errors.gender && <p className="text-red-600 text-sm mt-1">{errors.gender}</p>}
        </div>
        <div>
          <Label htmlFor="semester">Semester</Label>
          <Select
            value={formData.semester}
            onValueChange={(value) => handleChange('semester', value)}
          >
            <SelectTrigger className={`mt-1 ${errors.semester ? 'border-red-600' : ''}`}>
              <SelectValue placeholder="Select semester" />
            </SelectTrigger>
            <SelectContent>
              {semesterOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.semester && <p className="text-red-600 text-sm mt-1">{errors.semester}</p>}
        </div>
      </div>
      <div>
        <Label htmlFor="batch">Batch</Label>
        <Select
          value={formData.batch}
          onValueChange={(value) => handleChange('batch', value)}
        >
          <SelectTrigger className={`mt-1 ${errors.batch ? 'border-red-600' : ''}`}>
            <SelectValue placeholder="Select batch" />
          </SelectTrigger>
          <SelectContent>
            {batchOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.batch && <p className="text-red-600 text-sm mt-1">{errors.batch}</p>}
      </div>
    </div>
  );
}
PersonalInfoForm.propTypes = {
  formData : PropTypes.object,
  handleChange: PropTypes.func,
  errors : PropTypes.object
}