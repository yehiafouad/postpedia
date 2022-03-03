import { Route, Redirect } from "react-router-dom";
import Auth from "../config/auth";
import routes from "../routes";

export default function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        Auth.isAuth() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: routes.login,
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}
