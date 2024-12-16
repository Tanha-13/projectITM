import { Link } from "react-router-dom";
import { useState } from "react";
import lightLogo from "../../assets/logo/light-logo.png";
import { FaBars } from "react-icons/fa";
import { Button } from "../ui/button";

function HomeNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <>
      <nav className="p-4 md:px-14">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/">
            <img src={lightLogo} alt="" className="w-48 md:w-64" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/student">Student</Link>
            <Link to="/supervisor">Supervisor</Link>
            <Link to="/admin">Admin</Link>
            <Link to="/projects">Project</Link>
            <Link to="/tasks">Task</Link>
            <Link to="/login">
              <Button variant="internalBtn">
                Login
              </Button>
            </Link>
            {/* <Link to="/register" className="bg-[linear-gradient(to_right,_#094074,_#246953)] text-black font-semibold rounded-full p-0.5">
              <button className="flex w-full px-4 py-2 rounded-full bg-white text-black">
                Register
              </button>
            </Link> */}
            <Link to="/register">
              <Button className="rounded-md font-medium text-base">Register</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={toggleMenu}>
            <FaBars />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className={`md:hidden mt-4`}>
            <Link to="/login" className="block py-2 px-4 hover:bg-gray-200">
              Login
            </Link>
            <Link to="/register" className="block py-2 px-4 hover:bg-gray-200">
              Register
            </Link>
          </div>
        )}
      </nav>
    </>
  );
}

export default HomeNav;
