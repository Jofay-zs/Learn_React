import React from 'react'
import logo from 'images/logo.png';

const ResponsiveNavbar = () => {
    return (
      <div className="w-screen shadow bg-gray-100">
        <div>
            <img src={logo} alt="brand page" className="w-16 ml-5 p-2" />
        </div>
      </div>
    );
}

export default ResponsiveNavbar
