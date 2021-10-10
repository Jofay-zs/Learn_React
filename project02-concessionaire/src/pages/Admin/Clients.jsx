import React from 'react'
import { useDarkMode } from 'context/darkMode';

const Clients = () => {
    const { darkMode } = useDarkMode();
    return (
        <div className={`flex h-full bg-gray-${darkMode ? '100' : '800'}`}>
            Clients Management
        </div>
    )
}

export default Clients
