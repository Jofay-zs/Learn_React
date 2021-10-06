import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
      <div className="w-full h-auto p-2 bg-gradient-to-r from-yellow-700 via-yellow-800 to-yellow-900 text-gray-100">
        <ul className="block items-center justify-center sm:flex w-full">
          <li className="mx-5 font-bold my-2 flex items-center justify-center hover:underline hover:text-white">
            <Link>Jofay-zs © 2021</Link>
          </li>
          <li className="mx-5 font-bold my-2 flex items-center justify-center hover:underline hover:text-white">
            <Link>Privacy & Legal</Link>
          </li>
          <li className="mx-5 font-bold my-2 flex items-center justify-center hover:underline hover:text-white">
            <Link>Contact</Link>
          </li>
        </ul>
      </div>
    );
};

export default Footer;