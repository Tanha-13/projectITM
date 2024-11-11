// import PropTypes from "prop-types"

import { Link } from "react-router-dom";
import banner from "../assets/img/banner.png";
import { FaLongArrowAltRight } from "react-icons/fa";

function Hero() {
  return (
    <>
      {/* bg-[linear-gradient(to_right,_#094074,_#246953)] */}
      <div className="bg-gray-100 p-4 md:p-14">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center text-center lg:text-start lg:grid-cols-2 gap-x-40">
            <div className="flex-1">
              <h1 className="text-3xl xl:text-6xl font-bold text-transparent bg-clip-text bg-[linear-gradient(to_right,_#094074,_#3d9373)]">
                Effortless Collaboration{" "}
                <span className="hidden md:inline">and Progress Tracking </span>{" "}
                for Final Year Success
              </h1>
              <p className="my-7">
                ProjectITM empowers students and supervisors with seamless
                collaboration, real-time tracking, and intuitive task
                management.
                <span className="hidden md:inline">
                  {" "}
                  Stay organized and meet every milestone with ease—ensuring
                  your academic success every step of the way
                </span>
              </p>
              <button className="px-7 lg:px-8  py-2 lg:py-3 rounded-full bg-[#094074] text-white hover:bg-[#246953] transition duration-150 font-semibold mb-2 lg:mb-0">
                <Link to="/register" className="flex items-center gap-3">
                  Get Started <FaLongArrowAltRight />
                </Link>
              </button>
            </div>

            <div className="hidden lg:block drop-shadow-[0_10px_20px_rgba(9,64,116,0.3)] flex-1">
              <img src={banner} alt="Hero" className="scale-x-[-1]" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
