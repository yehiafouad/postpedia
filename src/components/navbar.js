import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { Menu } from "semantic-ui-react";
import Auth from "../config/auth";
import useAsync from "../hooks/useAsync";
import routes from "../routes";
import { logout } from "../services/auth-service";

const Navbar = () => {
  const { run, isLoading } = useAsync();
  const { addToast } = useToasts();
  const history = useHistory();

  const handleOnClickLogout = () => {
    run(logout())
      .then(({ data }) => {
        Auth.logout();
        addToast(data?.message, { appearance: "success" });
        history.push(routes.login);
      })
      .catch((e) => {
        console.log(e);
        e?.errors?.map((err) =>
          addToast(err?.message, { appearance: "error" })
        );
      });
  };
  return (
    <Menu fixed="top" borderless>
      <Menu.Item
        name="postpedia"
        // active={activeItem === "browse"}
        onClick={() => history.push(routes.main)}
        className="font-bold"
      >
        Postpedia
      </Menu.Item>

      <Menu.Item name="welcome" className="font-medium">
        Welcome, {Auth.getUserData()?.name}
      </Menu.Item>

      <Menu.Menu position="right">
        <Menu.Item
          name="logout"
          // active={activeItem === "signup"}
          onClick={handleOnClickLogout}
        >
          Logout
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default Navbar;
