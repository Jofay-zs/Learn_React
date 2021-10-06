import Footer from "components/Footer";
import ResponsiveNavbar from "components/ResponsiveNavbar";
import Sidebar from "components/Sidebar";
import { useState } from "react";
import 'styles/admin.css'

const PrivateLayout = ({ children }) => {
  const [showNavbar, setShowNavbar] = useState(false);

  return (
    <div className="w-screen h-screen flex flex-col bg-hero-pattern-cogs">
      <ResponsiveNavbar />
      {showNavbar ? <Sidebar /> : <div/>}
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
      <div className="h-full">
        <main className="h-full w-screen">{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default PrivateLayout;
