export default function AcademicInfoForm({ formData, handleChange }) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Have you registered for thesis/project?
        </label>
        <div className="mt-2 space-y-2">
          <div className="flex items-center">
            <input
              id="thesis-yes"
              name="registeredForThesis"
              type="radio"
              value="yes"
              checked={formData.registeredForThesis === 'yes'}
              onChange={(e) => handleChange('registeredForThesis', e.target.value)}
              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
            />
            <label htmlFor="thesis-yes" className="ml-3 block text-sm font-medium text-gray-700">
              Yes
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="thesis-no"
              name="registeredForThesis"
              type="radio"
              value="no"
              checked={formData.registeredForThesis === 'no'}
              onChange={(e) => handleChange('registeredForThesis', e.target.value)}
              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
            />
            <label htmlFor="thesis-no" className="ml-3 block text-sm font-medium text-gray-700">
              No
            </label>
          </div>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Is your proposal accepted?
        </label>
        <div className="mt-2 space-y-2">
          <div className="flex items-center">
            <input
              id="proposal-yes"
              name="proposalAccepted"
              type="radio"
              value="yes"
              checked={formData.proposalAccepted === 'yes'}
              onChange={(e) => handleChange('proposalAccepted', e.target.value)}
              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
            />
            <label htmlFor="proposal-yes" className="ml-3 block text-sm font-medium text-gray-700">
              Yes
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="proposal-no"
              name="proposalAccepted"
              type="radio"
              value="no"
              checked={formData.proposalAccepted === 'no'}
              onChange={(e) => handleChange('proposalAccepted', e.target.value)}
              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
            />
            <label htmlFor="proposal-no" className="ml-3 block text-sm font-medium text-gray-700">
              No
            </label>
          </div>
        </div>
      </div>
      <div>
        <label htmlFor="supervisor" className="block text-sm font-medium text-gray-700">
          Supervisor
        </label>
        <select
          id="supervisor"
          name="supervisor"
          required
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          value={formData.supervisor}
          onChange={(e) => handleChange('supervisor', e.target.value)}
        >
          <option value="">Select supervisor</option>
          <option value="dr-smith">Nusrat Jahan</option>
          <option value="prof-johnson">Nafees Imran</option>
          <option value="dr-williams">Dr. Williams</option>
        </select>
      </div>
    </div>
  );
}