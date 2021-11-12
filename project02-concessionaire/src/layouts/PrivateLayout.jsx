import ResponsiveNavbar from "components/ResponsiveNavbar";
import Sidebar from "components/Sidebar";
import { useDarkMode } from "context/darkMode";
import "styles/admin.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import Loading from "components/Loading";
import { getInfoUserApi } from "utils/api";
import { useUserContext } from "context/userContext";

const PrivateLayout = ({ children }) => {
  const [showNavbar, setShowNavbar] = useState(false);
  const { darkMode } = useDarkMode();
  const { isAuthenticated, isLoading, getAccessTokenSilently, logout } =
    useAuth0();
  const { setUserData } = useUserContext();
  const [loadingUserInformation, setLoadingUserInformation] = useState(false);

  useEffect(() => {
    const fetchAuth0Token = async () => {
      // Aking Auth0 for the JWT
      setLoadingUserInformation(true);
      const accessToken = await getAccessTokenSilently({
        audience: `authentication-api-projec02-concessionaire`,
      });
      // Getting the token that auth0 gave
      localStorage.setItem("token", accessToken);
      await getInfoUserApi(
        (response) => {
          // console.log("getInfoUserApi response:", response);
          setUserData(response.data);
          setLoadingUserInformation(false);
        },
        (error) => {
          console.error("getInfoUserApi error:", error);
          setTimeout( ()=>{
            logout({ returnTo: window.location.origin });
          }, 3000);
          setLoadingUserInformation(false);
        }
      );
      // console.log(accessToken);
    };
    if (isAuthenticated) {
      fetchAuth0Token();
    }
    // eslint-disable-next-line
  }, [isAuthenticated, getAccessTokenSilently]);

  if (isLoading || loadingUserInformation) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return <div>You're not authenticated</div>;
  }

  return (
    <div className="w-screen h-auto min-h-screen sm:h-screen flex flex-col">
      <ResponsiveNavbar />
      {showNavbar ? <Sidebar /> : <div />}
      <div className="flex flex-nowrap h-full w-full ">
        <div className="absolute top-4 right-10 z-20">
          <button
            className="text-2xl text-myOrange hover:text-myRed"
            type="button"
            onClick={() => {
              setShowNavbar(!showNavbar);
            }}
          >
            <i className="fas fa-bars"></i>
          </button>
        </div>
        <div
          className={`flex w-full ${darkMode ? "bg-secondary" : "bg-gray-100"}`}
        >
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
};

export default PrivateLayout;
