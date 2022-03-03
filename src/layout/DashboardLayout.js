import { Route, Switch } from "react-router-dom";
import Navbar from "../components/navbar";
import HomePage from "../pages/home";
import PostPage from "../pages/post";
import routes from "../routes";

const DashboardLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="pt-20">
        <Switch>
          <Route exact path={routes.main} component={HomePage} />
          <Route path={routes.posts} component={PostPage} />
        </Switch>
      </div>
    </div>
  );
};

export default DashboardLayout;
