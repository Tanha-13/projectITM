
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import PropTypes from "prop-types"

export default function AcademicInfoForm({ formData, handleChange, errors }) {
  return (
    <div className="space-y-6">
      <div>
        <Label className="text-base">Have you registered for thesis/project?</Label>
        <RadioGroup
          value={formData.registeredForProject}
          onValueChange={(value) => handleChange('registeredForProject', value)}
          className={`mt-2 ${errors.registeredForProject ? 'text-red-600' : ''}`}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="thesis-yes" />
            <Label htmlFor="thesis-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="thesis-no" />
            <Label htmlFor="thesis-no">No</Label>
          </div>
        </RadioGroup>
        {errors.registeredForProject && <p className="text-red-600 text-sm mt-1">{errors.registeredForProject}</p>}
      </div>
      <div>
        <Label className="text-base">Is your proposal accepted?</Label>
        <RadioGroup
          value={formData.proposalAccepted}
          onValueChange={(value) => handleChange('proposalAccepted', value)}
          className={`mt-2 ${errors.registeredForProject ? 'text-red-600' : ''}`}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="proposal-yes" />
            <Label htmlFor="proposal-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="proposal-no" />
            <Label htmlFor="proposal-no">No</Label>
          </div>
        </RadioGroup>
        {errors.proposalAccepted && <p className="text-red-600 text-sm mt-1">{errors.proposalAccepted}</p>}
      </div>
      <div>
        <Label htmlFor="supervisor">Supervisor</Label>
        <Select
          value={formData.supervisor}
          onValueChange={(value) => handleChange('supervisor',value)}
        >
          <SelectTrigger className={`mt-2 ${errors.registeredForProject ? 'border-red-600' : ''}`}>
            <SelectValue placeholder="Select supervisor" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="dr-smith">Dr. Smith</SelectItem>
            <SelectItem value="prof-johnson">Prof. Johnson</SelectItem>
            <SelectItem value="dr-williams">Dr. Williams</SelectItem>
          </SelectContent>
        </Select>
        {errors.supervisor && <p className="text-red-600 text-sm mt-1">{errors.supervisor}</p>}
      </div>
    </div>
  );
}
AcademicInfoForm.propTypes = {
  formData : PropTypes.object,
  handleChange: PropTypes.func,
  errors : PropTypes.object
}