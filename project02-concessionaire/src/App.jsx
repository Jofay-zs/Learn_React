import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from "react";
import "styles/styles.css";
import Login from "pages/Login";
import Signup from "pages/Signup";
import Admin from "pages/Admin/Index";
import Index from "pages/Index";
import PublicLayout from "layouts/PublicLayout";
import PrivateLayout from "layouts/PrivateLayout";
import AuthLayout from "layouts/AuthLayout";
import Cars from "pages/Admin/Cars";
import Sales from "pages/Admin/Sales";
import { DarkModeContext } from "context/darkMode";
import Users from "pages/Admin/Users";
import { Auth0Provider } from "@auth0/auth0-react";
import Account from "pages/Admin/Account";
import { UserContext } from "context/userContext";
import PrivateRoute from "components/PrivateRoute";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [userData, setUserData] = useState({});

  return (
    <Auth0Provider
      domain="project02-concessionaire-jofay-zs.us.auth0.com"
      clientId="7IyPaRV3Oq4uMIdzQ1SlTyAL6t2j782y"
      redirectUri="http://localhost:3000/admin"
      audience="authentication-api-projec02-concessionaire"
    >
      <UserContext.Provider value={{ userData, setUserData }}>
        <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
          <Router>
            <Switch>
              <Route
                path={["/admin", "/admin/users", "/admin/cars", "/admin/sales"]}
              >
                <PrivateLayout>
                  <Switch>
                    <Route path="/admin/account">
                      <PrivateRoute roleList={["admin", "vendor", "inactive"]}>
                        <Account />
                      </PrivateRoute>
                    </Route>
                    <Route path="/admin/users">
                      <PrivateRoute roleList={["admin"]}>
                        <Users />
                      </PrivateRoute>
                    </Route>
                    <Route path="/admin/cars">
                      <PrivateRoute roleList={["admin", "vendor"]}>
                        <Cars />
                      </PrivateRoute>
                    </Route>
                    <Route path="/admin/sales">
                      <PrivateRoute roleList={["admin", "vendor"]}>
                        <Sales />
                      </PrivateRoute>
                    </Route>
                    <Route path="/admin">
                      <PrivateRoute roleList={["admin", "vendor", "inactive"]}>
                        <Admin />
                      </PrivateRoute>
                    </Route>
                  </Switch>
                </PrivateLayout>
              </Route>
              <Route path={["/login", "/signup"]}>
                <AuthLayout>
                  <Switch>
                    <Route path="/login">
                      <Login />
                    </Route>
                    <Route path="/signup">
                      <Signup />
                    </Route>
                  </Switch>
                </AuthLayout>
              </Route>
              <Route path={["/"]}>
                <PublicLayout>
                  <Switch>
                    <Route path="/">
                      <Index />
                    </Route>
                  </Switch>
                </PublicLayout>
              </Route>
            </Switch>
          </Router>
        </DarkModeContext.Provider>
      </UserContext.Provider>
    </Auth0Provider>
  );
}

export default App;
