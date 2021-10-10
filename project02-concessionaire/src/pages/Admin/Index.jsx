import { useDarkMode } from 'context/darkMode'
import React from 'react'

const Admin = () => {
    const {darkMode} = useDarkMode();
    return (
        <div className={`flex h-full bg-gray-${darkMode ? '100' : '800'}`}>
            Index for Admin page
        </div>
    )
}

export default Admin
