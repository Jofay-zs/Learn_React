import React from 'react'
import { useDarkMode } from "context/darkMode";

const TriggerDarkMode = () => {
    const { darkMode, setDarkMode } = useDarkMode();
    return (
      <div>
        <button
          className=""
          onClick={() => {
            setDarkMode(!darkMode);
          }}
        >
          {darkMode ? (
            <i className="fas fa-moon p-2 rounded-full hover:bg-gray-800 hover:text-gray-100"></i>
          ) : (
            <i className="fas fa-sun p-2 rounded-full hover:bg-gray-800 hover:text-gray-100"></i>
          )}
        </button>
      </div>
    );
}

export default TriggerDarkMode
