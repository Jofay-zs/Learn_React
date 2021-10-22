import React from "react";

import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <nav className="fixed top-0 right-0 h-screen w-screen sm:w-1/2 lg:w-1/4 bg-gradient-to-b from-yellow-300 via-yellow-500 to-yellow-700 shadow transition ease-in duration-1000">
      <div className="flex justify-center items-center h-full ">
        <ul className="w-full">
          <li className="w-full text-3xl text-gray-100 flex items-center justify-center my-10 py-2 px-4 hover:bg-yellow-300 hover:text-gray-800">
            <Link to="/">
              <i className="mr-1 fas fa-home"></i> Home
            </Link>
          </li>
          <li className="w-full text-3xl text-gray-100 flex items-center justify-center my-10 py-2 px-4 hover:bg-yellow-300 hover:text-gray-800">
            <Link to="/">
              <i className="mr-1 fas fa-car"></i>Products
            </Link>
          </li>
          <li className="w-full text-3xl text-gray-100 flex items-center justify-center my-10 py-2 px-4 hover:bg-yellow-300 hover:text-gray-800">
            <Link to="/">
              <i className="mr-1 fas fa-object-group"></i>About us
            </Link>
          </li>
          <li className="w-full text-3xl text-gray-100 flex items-center justify-center my-10 py-2 px-4 hover:bg-yellow-300 hover:text-gray-800">
            <button
              onClick={() =>
                loginWithRedirect()
              }
            >
              <i className="mr-1 fas fa-user"></i>Login
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
