import { Link } from "react-router-dom";
import { useState } from "react";
import lightLogo from "../../assets/logo/light-logo.png";
import { FaBars } from "react-icons/fa";

function HomeNav() {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };
  return (
    <>
        <nav className="p-4 md:px-14">
          <div className="container mx-auto flex justify-between items-center">
            <Link to="/" className="w-48 md:w-64">
              <img src={lightLogo} alt="" />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-4">
              <Link to="/login" className="px-7 lg:px-8  py-2 lg:py-3 border border-[#094074] text-black font-bold">
                Login
              </Link>
              <Link
                to="/register"
                className="px-7 lg:px-8  py-2 lg:py-3 bg-[#094074] text-white font-bold"
              >
                Register
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden" onClick={toggleMenu}>
              <FaBars/>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className={`md:hidden mt-4`}>
              <Link to="/login" className="block py-2 px-4 hover:bg-gray-200">
                Login
              </Link>
              <Link
                to="/register"
                className="block py-2 px-4 hover:bg-gray-200"
              >
                Register
              </Link>
            </div>
          )}
        </nav>
    </>
  )
}

export default HomeNav