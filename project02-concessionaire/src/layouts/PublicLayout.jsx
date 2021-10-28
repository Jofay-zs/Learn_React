import React from "react";
import Footer from "components/Footer";
import { useAuth0 } from "@auth0/auth0-react";
import logo from "images/car.ico";

const PublicLayout = ({ children }) => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="flex flex-col justify-between h-screen">
      <div>
        <button
          type="button"
          className="absolute top-4 right-10 hover:text-gray-700"
          onClick={() => loginWithRedirect()}
        >
          <img src={logo} alt="" className="w-16" />
        </button>
      </div>
      <div className="h-full block">
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default PublicLayout;
