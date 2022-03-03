import { authAxios, axios } from "../config/axiosConfig";

export const registerUser = (authContent) => {
  return axios.post("/auth/register", authContent);
};

export const loginUser = (authContent) => {
  return axios.post("/auth/login", authContent);
};

export const logout = () => {
  return authAxios.get("/auth/logout");
};
