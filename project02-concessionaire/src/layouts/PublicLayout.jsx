import React from 'react'
import Footer from 'components/Footer';
import Navbar from 'components/Navbar';
import { useState } from 'react';

const PublicLayout = ({children}) => {

  const [showNavbar, setShowNavbar] = useState(false);

    return (
      <div className="flex flex-col justify-between h-screen">
        {showNavbar ? <Navbar /> : <div />}
        <div>
          <button
            className="absolute top-4 right-10 text-2xl hover:text-gray-700"
            type="button"
            onClick={() => {
              setShowNavbar(!showNavbar);
            }}
          >
            <i className="fas fa-bars"></i>
          </button>
        </div>
        <div className="h-full overflow-y-scroll block">
          <main>{children}</main>
          <Footer />
        </div>
      </div>
    );
};

export default PublicLayout;