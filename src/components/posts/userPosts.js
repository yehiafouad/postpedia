import moment from "moment";
import { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Image, Segment } from "semantic-ui-react";
import Auth from "../../config/auth";
import { useSocket } from "../../context/socketContent";
import useAsync from "../../hooks/useAsync";
import routes from "../../routes";
import { getUserPosts } from "../../services/posts-service";
import CustomLoader from "../loader";

const UserPosts = () => {
  const history = useHistory();
  const socket = useSocket();
  const [userPosts, setUserPosts] = useState([]);
  const { run, isLoading } = useAsync();
  const [updatePosts, setUpdatePosts] = useState(false);

  useEffect(() => {
    run(getUserPosts())
      .then(({ data }) => {
        setUserPosts(data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [updatePosts]);

  useEffect(() => {
    socket?.on("postCreated", (msg) => {
      if ([String(Auth.getUserId())].includes(String(msg?.user?._id))) return;

      setUserPosts((prev) => [msg, ...prev]);
    });

    socket?.on("postUpdated", (msg) => {
      if (
        [String(Auth.getUserId())].includes(String(msg?.user?._id)) ||
        userPosts?.length === 0
      )
        return;

      const index = userPosts.findIndex((o) =>
        [o?._id].includes(String(msg?._id))
      );

      if (index !== -1) {
        userPosts[index] = msg;
      }

      setUserPosts(userPosts);
    });

    socket?.on("postDeleted", (msg) => {
      if (
        [String(Auth.getUserId())].includes(String(msg?.user?._id)) ||
        userPosts?.length === 0
      )
        return;
      if (userPosts?.length <= 5) {
        setUpdatePosts((prev) => !prev);
      }

      const index = userPosts.findIndex((o) =>
        [o?._id].includes(String(msg?._id))
      );

      if (index !== -1) {
        userPosts.splice(index, 1);
      }

      setUserPosts(userPosts);
    });
  }, [socket, userPosts]);

  return (
    <Fragment>
      <div className="flex items-center justify-between mb-5">
        <h4 className="font-medium text-lg">Users Posts</h4>
        <Button
          content="Refresh"
          icon="redo"
          className="border-0 bg-transparent text-yellow-500"
          onClick={() => setUpdatePosts((prev) => !prev)}
        />
      </div>
      <div
        // style={{ maxHeight: "100vh", height: "auto", overflow: "auto" }}
        className="bg-gray-100 rounded-xl p-2"
      >
        {isLoading && <CustomLoader isLoading={isLoading} />}
        {userPosts?.map((p, i) => {
          return (
            <Segment
              key={i}
              className="p-0 cursor-pointer"
              onClick={() => history.push(routes.posts.replace(":id", p._id))}
            >
              <div className="flex items-center justify-between p-3">
                <div className="flex items-center justify-start">
                  <Image
                    src={
                      p?.user?.avatar ||
                      "https://react.semantic-ui.com/images/avatar/large/elliot.jpg"
                    }
                    className="rounded-full object-cover w-16 h-16"
                  />
                  <div className="ml-5">
                    <p className="font-semibold text-lg">{p?.user?.name}</p>
                  </div>
                </div>
                <p className="text-gray-400 text-sm">
                  {moment(p?.createdAt).local().fromNow()}
                </p>
              </div>
              <hr />
              <div className="p-3">
                <h4 className="font-medium text-lg my-2">{p?.title}</h4>
                <p>{p?.body}</p>
              </div>
            </Segment>
          );
        })}
      </div>
    </Fragment>
  );
};

export default UserPosts;
