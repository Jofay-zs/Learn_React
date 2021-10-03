import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "styles/styles.css";
import Login from "pages/Login";
import Signup from "pages/Signup";
import Admin from "pages/Admin/Index";
import Index from "pages/Index";
import PublicLayout from "layouts/PublicLayout";
import PrivateLayout from "layouts/PrivateLayout";
import AuthLayout from "layouts/AuthLayout";
import Clients from "pages/Admin/Clients";
import Cars from "pages/Admin/Cars";

function App() {
  return (
    <Router>
      <Switch>
        <Route path={["/admin", "/admin/clients", "/admin/cars"]}>
          <PrivateLayout>
            <Switch>
              <Route path="/admin/clients">
                <Clients />
              </Route>
              <Route path="/admin/cars">
                <Cars />
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
  );
}

export default App;
