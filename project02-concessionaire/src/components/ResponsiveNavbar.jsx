import React from 'react'
import logo from 'images/car.ico';
import TriggerDarkMode from './TriggerDarkMode';


const ResponsiveNavbar = () => {
    return (
      <div className="w-screen shadow bg-primary flex justify-between px-12 items-center text-gray-100 hover:text-gray-300">
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
