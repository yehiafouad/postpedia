import { Grid } from "semantic-ui-react";
import MyPostsContent from "../components/posts/myPosts";
import UserPosts from "../components/posts/userPosts";

const HomePage = () => {
  return (
    <div className="mx-10" style={{ height: "100%" }}>
      <Grid stackable columns={2} style={{ height: "100%" }}>
        <Grid.Row>
          <Grid.Column width={9}>
            <MyPostsContent />
          </Grid.Column>
          <Grid.Column width={7}>
            <UserPosts />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default HomePage;
