import React from 'react'
import { Link } from 'react-router-dom';

const AuthLayout = ({children}) => {
    return (
        <div className='bg-gray-50 py-2 px-4 h-screen w-full flex justify-center items-center'>
            <div className='absolute top-5 left-5 '>
                <Link to='/index'>
                    <i className='fas fa-home'></i>
                </Link>
            </div>
            <div className='w-full'>
                {children}
            </div>
        </div>
    )
}

export default AuthLayout;