import Auth from "./auth";
import Axios from "axios";
import routes from "../routes";

Axios.defaults.baseURL =
  process.env.NODE_ENV !== "production"
    ? process.env.REACT_APP_DEV_URL
    : process.env.REACT_APP_SERVER_URL;

const AuthAxios = Axios.create();

AuthAxios.interceptors.request.use((config) => {
  let accessToken = Auth.getToken();

  if ([true].includes(Auth.isExpired(accessToken))) {
    Auth.logout();
    window.location.pathname = routes.login;
  }

  config.headers = { Authorization: `Bearer ${accessToken}` };
  return config;
});

export const axios = Axios;
export const authAxios = AuthAxios;
