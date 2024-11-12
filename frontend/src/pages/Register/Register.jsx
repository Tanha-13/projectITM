import  { useState } from 'react';
import PersonalInfoForm from '../../components/Registration/PersonalInfoForm';
import AcademicInfoForm from '../../components/Registration/AcademicInfoForm';

export default function RegistrationForm() {
  const [page, setPage] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    id: '',
    gender: '',
    semester: '',
    registeredForThesis: '',
    proposalAccepted: '',
    supervisor: ''
  });

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (page === 1) {
      setPage(2);
    } else {
      console.log('Form submitted:', formData);
      // Here you would typically send the data to your backend
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Student Registration
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {page === 1 ? (
            <PersonalInfoForm formData={formData} handleChange={handleChange} />
          ) : (
            <AcademicInfoForm formData={formData} handleChange={handleChange} />
          )}
          <div className="flex justify-between">
            {page === 2 && (
              <button
                type="button"
                onClick={() => setPage(1)}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-red-300 mr-2"
              >
                Previous
              </button>
            )}
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary"
            >
              {page === 1 ? 'Next' : 'Register'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}