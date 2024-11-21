import React, { useMemo } from 'react';

export default function PersonalInfoForm({ formData, handleChange }) {
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
        value: `Spring ${year} Batch ${batchCount.toString().padStart(2, '0')}`, 
        label: `Spring ${year} Batch ${batchCount.toString().padStart(2, '0')}` 
      });
      batchCount++;
      options.push({ 
        value: `Fall ${year} Batch ${batchCount.toString().padStart(2, '0')}`, 
        label: `Fall ${year} Batch ${batchCount.toString().padStart(2, '0')}` 
      });
      batchCount++;
    }
    return options;
  }, [currentYear]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={formData.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={formData.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="id" className="block text-sm font-medium text-gray-700">
            ID
          </label>
          <input
            id="id"
            name="id"
            type="text"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={formData.id}
            onChange={(e) => handleChange('id', e.target.value)}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            required
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            value={formData.gender}
            onChange={(e) => handleChange('gender', e.target.value)}
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="semester" className="block text-sm font-medium text-gray-700">
            Semester
          </label>
          <select
            id="semester"
            name="semester"
            required
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            value={formData.semester}
            onChange={(e) => handleChange('semester', e.target.value)}
          >
            <option value="">Select semester</option>
            {semesterOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="batch" className="block text-sm font-medium text-gray-700">
          Batch
        </label>
        <select
          id="batch"
          name="batch"
          required
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          value={formData.batch}
          onChange={(e) => handleChange('batch', e.target.value)}
        >
          <option value="">Select batch</option>
          {batchOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}