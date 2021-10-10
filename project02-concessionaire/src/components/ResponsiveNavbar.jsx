import React from 'react'
import logo from 'images/logo.png';
import TriggerDarkMode from './TriggerDarkMode';


const ResponsiveNavbar = () => {
    return (
      <div className="w-screen shadow bg-gray-100 flex justify-between px-12 items-center">
        <div>
          <img src={logo} alt="brand page" className="w-16" />
        </div>
        <div className='mr-10'>
          <TriggerDarkMode />
        </div>
      </div>
    );
}

export default ResponsiveNavbar
