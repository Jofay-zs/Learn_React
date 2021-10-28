import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import Loading from "./Loading";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const fetchAuth0Token = async () => {
      const accessToken = await getAccessTokenSilently({
        audience: `authentication-api-projec02-concessionaire`,
      });
      localStorage.setItem("token", accessToken);
      // console.log(accessToken);
    };
    if (isAuthenticated) {
      fetchAuth0Token();
    }
    // eslint-disable-next-line
  }, [isAuthenticated]);

  if (isLoading) {
    return <Loading/>;
  }

  return isAuthenticated ? (
    <>{children}</>
  ) : (
    <div>You're not authenticated</div>
  );
};

export default PrivateRoute;
