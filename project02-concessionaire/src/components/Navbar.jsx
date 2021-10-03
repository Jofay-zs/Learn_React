import React from 'react';

import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-red-400">
            <ul className='flex w-full justify-between p-2  '>
                <li className='py-2 px-4'>Logo</li>
                <li className='py-2 px-4'>Link01</li>
                <li className='py-2 px-4'>Link02</li>
                <li className='py-2 px-4'>Link03</li>
                <li className='px-3'>
                    <Link to='/login'>
                    <button className='py-2 px-4 text-white bg-indigo-500 rounded-lg shadow-md hover:bg-indigo-600'>
                        Login
                    </button>
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
