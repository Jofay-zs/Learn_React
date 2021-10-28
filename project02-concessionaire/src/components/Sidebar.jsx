import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Sidebar = () => {
  // const location = useLocation();

  // useEffect(() => {
  //   console.log(location);
  // }, [location])

  const { user, logout } = useAuth0();

  const signOut = () => {
    logout({ returnTo: window.location.origin });
    localStorage.setItem("token", null);
  };

  return (
    <nav className="fixed top-0 right-0 h-screen w-screen sm:w-1/2 lg:w-1/4 shadow bg-secondary z-10">
      <div className="flex justify-center items-center h-full">
        <ul className="w-full">
          <li className="w-full font-bold text-3xl text-gray-200 flex items-center justify-center my-5 py-2 px-4 hover:bg-myRed hover:text-gray-200">
            <Link to="/admin/account">
              {user ? (
                <>
                  <button className="flex justify-center items-center">
                    <img
                      src={user.picture}
                      alt="Your profile"
                      className="w-12 rounded-full mr-3"
                    />
                    <span>{user.nickname}</span>
                  </button>
                </>
              ) : (
                <>
                  <button>
                    <i className="fas fa-user mr-1"></i> Profile
                  </button>
                </>
              )}
            </Link>
          </li>
          <li className="w-full font-bold text-3xl text-gray-200 flex items-center justify-center my-5 py-2 px-4 hover:bg-myRed hover:text-gray-200">
            <Link to="/admin">
              <i className="fas fa-brain mr-1"></i>Master
            </Link>
          </li>
          <li className="w-full font-bold text-3xl text-gray-200 flex items-center justify-center my-5 py-2 px-4 hover:bg-myRed hover:text-gray-200">
            <Link to="/admin/cars">
              <i className="fas fa-car mr-1"></i>Vehicles
            </Link>
          </li>
          <li className="w-full font-bold text-3xl text-gray-200 flex items-center justify-center my-5 py-2 px-4 hover:bg-myRed hover:text-gray-200">
            <Link to="/admin/sales">
              <i className="fas fa-coins mr-1"></i>Sales
            </Link>
          </li>
          <li className="w-full font-bold text-3xl text-gray-200 flex items-center justify-center my-5 py-2 px-4 hover:bg-myRed hover:text-gray-200">
            <Link to="/admin/users">
              <i className="fas fa-users mr-1"></i>Users
            </Link>
          </li>
          <li className="w-full text-xl text-gray-200 flex items-center justify-center mb-5 mt-10 py-2 px-4 font-bold hover:underline">
            <button onClick={() => signOut()}>Sign out</button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
