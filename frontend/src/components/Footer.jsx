import { Link } from "react-router-dom";
import lightLogo from "../assets/logo/light-logo.png";
import { FaFacebook } from "react-icons/fa";
import { FaGlobe } from "react-icons/fa";

function Footer() {
  return (
    <div className="p-4 md:p-14 ">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className=" flex-1">
            <Link to="/">
              <img src={lightLogo} alt="" className="w-48 md:w-64" />
            </Link>
          </div>
          <div>
            <h3 className="font-medium text-xl text-center text-transparent bg-clip-text bg-[linear-gradient(to_bottom,_#094074,_#3d9373)] mb-1 mt-2">
              Follow us
            </h3>
            <div className="flex flex-1 justify-end gap-5">
              <Link to="https://www.facebook.com/diu.itm" target="_blank">
                <FaFacebook className="w-8 h-8 hover:text-blue-700" />
              </Link>
              <Link
                to="https://daffodilvarsity.edu.bd/public/department/itm"
                target="_blank"
              >
                <FaGlobe className="w-8 h-8 hover:text-teal-700" />
              </Link>
            </div>
          </div>
        </div>
        <p className="text-center mt-2">
          Copyright © {new Date().getFullYear()} - All right reserved by
          ProjectITM
        </p>
      </div>
    </div>
  );
}

export default Footer;
