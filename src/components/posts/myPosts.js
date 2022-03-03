import moment from "moment";
import { Fragment, useContext, useEffect, useState } from "react";
import { useToasts } from "react-toast-notifications";
import { Button, Segment } from "semantic-ui-react";
import StateContext from "../../context/stateContext";
import useAsync from "../../hooks/useAsync";
import { deletePost, getMyPosts } from "../../services/posts-service";
import AddPostModal from "../add-post-modal";
import EditPostModal from "../edit-post-modal";
import CustomLoader from "../loader";

const MyPostsContent = () => {
  const [myPosts, setMyPosts] = useState([]);
  const { run, isLoading } = useAsync();
  const { setShowModal, update, setUpdate } = useContext(StateContext);
  const { addToast } = useToasts();

  useEffect(() => {
    run(getMyPosts())
      .then(({ data }) => {
        setMyPosts(data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [update]);

  const handleOnDeletePost = (postId) => {
    run(deletePost(postId))
      .then(({ data }) => {
        addToast(data?.message, { appearance: "success" });
        setUpdate((prev) => !prev);
      })
      .catch((e) => {
        console.log(e);
        e?.errors?.map((err) =>
          addToast(err?.message, { appearance: "error" })
        );
      });
  };

  return (
    <Fragment>
      <div className="flex items-center justify-between mb-5">
        <h4 className="font-medium text-lg">My Posts</h4>
        <Button
          content="Add Post"
          color="teal"
          icon="plus"
          onClick={() =>
            setShowModal({
              modalName: "addPost",
              data: null,
            })
          }
        />
      </div>
      <div>
        <AddPostModal />
        <EditPostModal />
        {isLoading && <CustomLoader isLoading={isLoading} />}
        {!isLoading &&
          myPosts?.map((p, i) => (
            <Segment key={p?._id}>
              <div>
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-lg my-2">{p?.title}</h4>
                  <p className="text-gray-400 text-sm">
                    {moment(p?.createdAt).local().fromNow()}
                  </p>
                </div>
                <p>{p?.body}</p>
              </div>
              <div className="my-5 text-center">
                <Button
                  content="Edit Post"
                  icon="edit"
                  basic
                  color="teal"
                  onClick={() =>
                    setShowModal({
                      modalName: "editPost",
                      data: p,
                    })
                  }
                />
                <Button
                  content="Delete"
                  icon="times"
                  disabled={isLoading}
                  color="red"
                  onClick={() => handleOnDeletePost(p?._id)}
                />
              </div>
            </Segment>
          ))}
      </div>
    </Fragment>
  );
};

export default MyPostsContent;
