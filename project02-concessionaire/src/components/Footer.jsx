import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
      <div className="w-full h-auto p-2 bg-gray-500 text-gray-100 sm:bg-transparent sm:fixed sm:bottom-0 ">
        <ul className="block items-center justify-center sm:flex w-full">
          <li className="mx-5 font-bold my-2 flex items-center justify-center hover:underline hover:text-white">
            <Link to='/'>Jofay-zs © 2021</Link>
          </li>
          <li className="mx-5 font-bold my-2 flex items-center justify-center hover:underline hover:text-white">
            <Link to='/'>Privacy & Legal</Link>
          </li>
          <li className="mx-5 font-bold my-2 flex items-center justify-center hover:underline hover:text-white">
            <Link to='/'>Contact</Link>
          </li>
        </ul>
      </div>
    );
};

export default Footer;