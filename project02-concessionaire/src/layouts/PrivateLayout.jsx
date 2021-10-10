import ResponsiveNavbar from "components/ResponsiveNavbar";
import Sidebar from "components/Sidebar";
import { useDarkMode } from "context/darkMode";
import { useState } from "react";
import 'styles/admin.css'

const PrivateLayout = ({ children }) => {
  const [showNavbar, setShowNavbar] = useState(false);
  const {darkMode} = useDarkMode();

  return (
    <div className="w-screen h-auto sm:h-screen flex flex-col">
      <ResponsiveNavbar />
      {showNavbar ? <Sidebar /> : <div />}
      <div className="flex flex-nowrap h-full w-full">
        <div className="absolute top-4 right-10">
          <button
            className="text-2xl hover:text-gray-700"
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
              ? "bg-hero-pattern-diamonds-dark"
              : "bg-hero-pattern-diamonds-light"
          }`}
        >
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
};

export default PrivateLayout;
