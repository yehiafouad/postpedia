import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/use-local-storage";
import PropTypes from "prop-types";

const UserContext = createContext();
UserContext.displayName = "UserContext"; // react dev tools doesn't display the name of the context

function UserProvider({ children }) {
  const [user, setLocalStorageUser] = useLocalStorage("user", null);

  function setUser(userData) {
    localStorage.setItem("user", userData);
    setLocalStorageUser(userData);
  }

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
}

export { UserProvider, useUser };
