import React from "react";
import { useDarkMode } from "context/darkMode";

const Users = () => {
  const { darkMode } = useDarkMode();
  return (
    <div className={`flex h-full bg-gray-${darkMode ? "100" : "800"}`}>
      Users Management
    </div>
  );
};

export default Users;
