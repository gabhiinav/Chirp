"use client";

import EditPost from "./EditPost";
import { useQuery } from "@tanstack/react-query";
import { MyPosts } from "../types/MyPosts";

const fetchMyPosts = async () => {
  const response = await fetch("/api/posts/myPosts");
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  return response.json();
};

export default function MyPosts(): JSX.Element {
  const { data, isLoading } = useQuery<MyPosts>(["my-posts"], {
    queryFn: fetchMyPosts,
  });
  if (isLoading) return <h1>Posts are loading...</h1>;
  if (data) console.log(data);
  return (
    <div>
      {data?.posts?.map((post) => (
        <EditPost
          id={post.id}
          key={post.id}
          avatar={data.image}
          name={data.name}
          title={post.title}
          comments={post.comments}
        />
      ))}
    </div>
  );
}
