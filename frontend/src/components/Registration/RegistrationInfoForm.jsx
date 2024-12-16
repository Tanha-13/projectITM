import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PropTypes from "prop-types";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

export default function RegistrationInfoForm({
  formData,
  handleChange,
  errors,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          className={`mt-1 ${errors.email ? "border-red-600" : ""}`}
          disabled
        />
        {errors.email && (
          <p className="text-red-600 text-sm mt-1">{errors.email}</p>
        )}
      </div>
      <div>
        <div className="flex justify-between items-center">
          <label
            htmlFor="password"
            className="block font-medium text-sm xl:text-base text-gray-700 mb-1"
          >
            Password
          </label>
          <span
            onClick={() => setShowPassword((prev) => !prev)}
            className="cursor-pointer text-sm xl:text-xl text-gray-700"
          >
            {showPassword ? (
              <div className="flex gap-2 items-center">
                <FaRegEyeSlash /> <span className="text-base">Hide</span>{" "}
              </div>
            ) : (
              <div className="flex gap-1 items-center">
                <FaRegEye /> <span className="text-base">Show</span>{" "}
              </div>
            )}
          </span>
        </div>
        <Input
          id="password"
          name="password"
          type={`${showPassword ? 'text' : 'password'}`}
          value={formData.password}
          onChange={(e) => handleChange("password", e.target.value)}
          className={`mt-1 ${errors.password ? "border-red-600" : ""}`}
        />
        {errors.password ? (
          <p className="text-red-600 text-sm mt-1">{errors.password}</p>
        ) : (
          <p className="text-primary text-sm mt-1">
            ***Password must contain 8-12 characters, including one
            uppercase letter, one number, and one special character
          </p>
        )}
      </div>
      <div>
      <div className="flex justify-between items-center">
          <label
            htmlFor="confirmPassword"
            className="block font-medium text-sm xl:text-base text-gray-700 mb-1"
          >
            Confirm Password
          </label>
          <span
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            className="cursor-pointer text-sm xl:text-xl text-gray-700"
          >
            {showConfirmPassword ? (
              <div className="flex gap-2 items-center">
                <FaRegEyeSlash /> <span className="text-base">Hide</span>{" "}
              </div>
            ) : (
              <div className="flex gap-1 items-center">
                <FaRegEye /> <span className="text-base">Show</span>{" "}
              </div>
            )}
          </span>
        </div>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type={`${showConfirmPassword ? 'text' : 'password'}`}
          value={formData.confirmPassword}
          onChange={(e) => handleChange("confirmPassword", e.target.value)}
          className={`mt-1 ${errors.confirmPassword ? "border-red-600" : ""}`}
        />
        {errors.confirmPassword && (
          <p className="text-red-600 text-sm mt-1">{errors.confirmPassword}</p>
        )}
      </div>
    </div>
  );
}

RegistrationInfoForm.propTypes = {
  formData: PropTypes.object,
  handleChange: PropTypes.func,
  errors: PropTypes.object,
};
