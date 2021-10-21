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

function App() {
  const [darkMode, setDarkMode] = useState(false);

  // useEffect(() => {
  //   console.log('dark mode:',darkMode);
  // }, [darkMode])

  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      <Router>
        <Switch>
          <Route
            path={["/admin", "/admin/users", "/admin/cars", "/admin/sales"]}
          >
            <PrivateLayout>
              <Switch>
                <Route path="/admin/users">
                  <Users />
                </Route>
                <Route path="/admin/cars">
                  <Cars />
                </Route>
                <Route path="/admin/sales">
                  <Sales />
                </Route>
                <Route path="/admin">
                  <Admin />
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
  );
}

export default App;
