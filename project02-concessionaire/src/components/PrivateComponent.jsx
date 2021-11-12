import { useUserContext } from "context/userContext";
import React from "react";

const PrivateComponent = ({ roleList, children }) => {
  const { userData } = useUserContext();

  // console.log("Private Component:", userData);

  if (roleList.includes(userData.rol)) {
    return children;
  }

  return <></>;
};

export default PrivateComponent;
