import jwt_decode from "jwt-decode";

let token = localStorage.getItem("token");

const Auth = {
  isAuth: () => {
    return Boolean(token);
  },
  getToken: () => {
    return token;
  },
  setToken: (val) => {
    token = val;
    localStorage.setItem("token", token);
    return token;
  },
  isExpired: (myToken) => {
    const decodeToken = jwt_decode(myToken);
    const now = new Date().getTime() / 1000;
    if (now > decodeToken.exp) {
      return true;
    } else {
      return decodeToken._id;
    }
  },
  getUserId: () => {
    const userId = JSON.parse(localStorage.getItem("user") || "[]");
    return userId?._id;
  },
  getUserData: () => {
    const user = JSON.parse(localStorage.getItem("user") || "[]");
    return user;
  },
  logout: () => {
    token = "";
    localStorage.setItem("token", "");
  },
};

export default Auth;
