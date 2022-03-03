import { authAxios } from "../config/axiosConfig";

export const addPost = (postContent) => {
  return authAxios.post("/posts/newPost", postContent);
};

export const getMyPosts = () => {
  return authAxios.get("/posts/myPosts");
};

export const getUserPosts = () => {
  return authAxios.get("/posts/userPosts");
};

export const getPostById = (postId) => {
  return authAxios.get("/posts/getPostById/" + postId);
};

export const updatePost = (postContent) => {
  return authAxios.patch("/posts/updatePost", postContent);
};

export const deletePost = (postId) => {
  return authAxios.delete("/posts/deletePost/" + postId);
};
