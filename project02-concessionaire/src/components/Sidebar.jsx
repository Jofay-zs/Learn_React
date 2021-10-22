import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Sidebar = () => {
  // const location = useLocation();

  // useEffect(() => {
  //   console.log(location);
  // }, [location])

  const { logout } = useAuth0();

  return (
    <nav className="fixed top-0 right-0 h-screen w-screen sm:w-1/2 lg:w-1/4 bg-gradient-to-b from-yellow-300 via-yellow-500 to-yellow-700 shadow">
      <div className="flex justify-center items-center h-full">
        <ul className="w-full">
          <li className="w-full font-bold text-3xl text-gray-100 flex items-center justify-center my-5 py-2 px-4 hover:bg-yellow-300 hover:text-gray-800">
            <Link to="/login">
              <i className="fas fa-user mr-1"></i> Account
            </Link>
          </li>
          <li className="w-full font-bold text-3xl text-gray-100 flex items-center justify-center my-5 py-2 px-4 hover:bg-yellow-300 hover:text-gray-800">
            <Link to="/admin">
              <i className="fas fa-brain mr-1"></i>Master
            </Link>
          </li>
          <li className="w-full font-bold text-3xl text-gray-100 flex items-center justify-center my-5 py-2 px-4 hover:bg-yellow-300 hover:text-gray-800">
            <Link to="/admin/cars">
              <i className="fas fa-car mr-1"></i>Vehicles
            </Link>
          </li>
          <li className="w-full font-bold text-3xl text-gray-100 flex items-center justify-center my-5 py-2 px-4 hover:bg-yellow-300 hover:text-gray-800">
            <Link to="/admin/sales">
              <i className="fas fa-coins mr-1"></i>Sales
            </Link>
          </li>
          <li className="w-full font-bold text-3xl text-gray-100 flex items-center justify-center my-5 py-2 px-4 hover:bg-yellow-300 hover:text-gray-800">
            <Link to="/admin/users">
              <i className="fas fa-users mr-1"></i>Users
            </Link>
          </li>
          <li className="w-full text-xl text-yellow-100 flex items-center justify-center mb-5 mt-10 py-2 px-4 font-bold hover:underline">
            <button
              onClick={() => logout({ returnTo: window.location.origin })}
            >
              Sign out
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
