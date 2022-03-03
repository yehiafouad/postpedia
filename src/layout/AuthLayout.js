import { useEffect } from "react";
import { Route } from "react-router";
import { useHistory } from "react-router-dom";
import Auth from "../config/auth";
import useMediaQuery from "../hooks/use-media-query";
import LoginPage from "../pages/auth/Login";
import RegisterPage from "../pages/auth/Register";
import routes from "../routes";

const AuthLayout = () => {
  const history = useHistory();
  const isSmall = useMediaQuery("(max-width: 992px)");

  useEffect(() => {
    let isMounted = true;
    if (!isMounted) return;
    if (Auth.isAuth()) {
      history.push(routes.main);
    }
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className={`py-56 ${isSmall ? "ui container" : "w-1/2 mx-auto"}`}>
      <p className="mb-10 font-bold text-5xl text-center">Postpedia</p>
      <Route exact path={routes.login} component={LoginPage} />
      <Route path={routes.register} component={RegisterPage} />
    </div>
  );
};

export default AuthLayout;
