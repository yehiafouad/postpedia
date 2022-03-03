import moment from "moment";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { Container, Image } from "semantic-ui-react";
import useAsync from "../hooks/useAsync";
import { getPostById } from "../services/posts-service";

const PostPage = () => {
  const { run, isLoading } = useAsync();
  const { addToast } = useToasts();
  const params = useParams();
  const [post, setPost] = useState({});

  useEffect(() => {
    run(getPostById(params.id))
      .then(({ data }) => {
        setPost(data?.data);
      })
      .catch((e) => {
        console.log(e);
        e?.errors?.map((err) =>
          addToast(err?.message, { appearance: "error" })
        );
      });
  }, []);
  return (
    <Container>
      <div className="flex items-center justify-start">
        <Image
          src={post?.user?.avatar}
          className="rounded-full w-20 h-20 object-cover"
        />
        <div className="ml-5">
          <p className="font-semibold text-lg">{post?.user?.name}</p>
          <small className="text-gray-400">
            {moment(post?.createdAt).local().fromNow()}
          </small>
        </div>
      </div>

      <div className="my-10 bg-gray-50 p-2 rounded-xl">
        <p className="text-lg font-semibold mb-2">{post?.title}</p>
        <p className="text-gray-500">{post?.body}</p>
      </div>
    </Container>
  );
};

export default PostPage;
