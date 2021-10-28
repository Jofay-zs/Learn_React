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
            <i className="fixed top-4 right-20 fas fa-moon p-2 rounded-full text-myOrange hover:text-myRed z-20"></i>
          ) : (
            <i className="fixed top-4 right-20 fas fa-sun p-2 rounded-full text-myOrange hover:text-myRed z-20"></i>
          )}
        </button>
      </div>
    );
}

export default TriggerDarkMode
