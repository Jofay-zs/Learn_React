import ResponsiveNavbar from "components/ResponsiveNavbar";
import Sidebar from "components/Sidebar";
import { useDarkMode } from "context/darkMode";
import { useState } from "react";
import "styles/admin.css";
import PrivateRoute from "components/PrivateRoute";

const PrivateLayout = ({ children }) => {
  const [showNavbar, setShowNavbar] = useState(false);
  const { darkMode } = useDarkMode();

  return (
    <PrivateRoute>
      <div className="w-screen h-auto min-h-screen sm:h-screen flex flex-col">
        <ResponsiveNavbar />
        {showNavbar ? <Sidebar /> : <div />}
        <div className="flex flex-nowrap h-full w-full ">
          <div className="absolute top-4 right-10 z-20">
            <button
              className="text-2xl text-myOrange hover:text-myRed"
              type="button"
              onClick={() => {
                setShowNavbar(!showNavbar);
              }}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
          <div
            className={`flex w-full ${
              darkMode
                ? "bg-secondary"
                : "bg-gray-100"
            }`}
          >
            <main>{children}</main>
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
};

export default PrivateLayout;
