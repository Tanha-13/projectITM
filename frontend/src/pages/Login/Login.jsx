import { useState } from "react";
import { Link } from "react-router-dom";
import { FaRegEye,FaRegEyeSlash  } from "react-icons/fa";
import login from "../../assets/img/login.png";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
    }
  };

  return (
    <div className="p-4 md:p-14">
      <div className="container mx-auto lg:bg-gray-100 lg:shadow-lg">
        <div className="flex justify-start">
          <div className="w-full lg:w-1/3 xl:max-w-[30%] mx-auto flex flex-col justify-center">
            <div>
              <h1 className="mt-6 text-center text-3xl md:text-5xl lg:text-3xl xl:text-5xl
              font-extrabold">
                Welcome Back
              </h1>
              <h2 className="mt-2 text-center text-sm xl:text-base text-gray-600">
                Complete your project and thesis, <br className=" block lg:hidden xl:block" />
                complete your journey - graduate with confidence!
              </h2>
            </div>
            <form className="mt-8" onSubmit={handleSubmit}>
              <div className="rounded-md space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block font-medium text-sm xl:text-base text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none md:text-base focus:ring-primary focus:border-primary focus:z-10 text-sm xl:text-base"
                    placeholder="Enter your university email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-600" role="alert">
                      {errors.email}
                    </p>
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
                    <span onClick={() => setShowPassword(prev => !prev)} className="cursor-pointer text-sm xl:text-xl text-gray-700">
                      {
                        showPassword ? <div className="flex gap-2 items-center"><FaRegEyeSlash/> <span className="text-base">Hide</span> </div> : <div className="flex gap-1 items-center"><FaRegEye/> <span className="text-base">Show</span> </div>
                      }
                    </span>
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 text-sm xl:text-base"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {errors.password && (
                    <p className="mt-2 text-sm text-red-600" role="alert">
                      {errors.password}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-end text-sm">
                <Link to="/forgetPassword" className="font-medium text-primary mt-1.5 mb-7">Forget your password?</Link>
              </div>

              <div>
                <button
                  type="submit"
                  className="bg-gradient-color-right relative w-full flex justify-center py-2 px-4 border border-transparent font-medium rounded-md text-white"
                >
                  Login
                </button>
              </div>
            </form>
            <div className="my-8 text-center text-sm xl:text-base text-gray-600 ">
              <p>
                {`Don't have an account?`}
                <Link className="text-primary ms-1 underline" to="/register">
                  Create Account
                </Link>
              </p>
            </div>
          </div>
          <div className="w-1/2 text-white hidden lg:block">
            <img className="w-full h-full" src={login} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
