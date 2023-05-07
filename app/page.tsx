"use client";

import CreatePost from "./CreatePost";
import Post from "./Post";
import { useQuery } from "@tanstack/react-query";
import { PostsType } from "./types/Posts";

const allPosts = async () => {
  const response = await fetch("/api/posts/homePosts");
  return response.json();
};

export default function Home() {
  const { data, error, isLoading } = useQuery<PostsType[]>({
    queryFn: allPosts,
    queryKey: ["posts"],
  });
  if (error) return error;
  if (isLoading) return "Loading...";

  return (
    <div>
      <CreatePost />
      {data &&
        data.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            name={post.user.name}
            avatar={post.user.image}
            postTitle={post.title}
            comments={post.comments}
          />
        ))}
    </div>
  );
}
