"use client"

import CreatePost from "./CreatePost"
import Post from "./Post"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { PostsType } from "./types/Posts"

const allPosts = async () => {
  const response = await axios.get("/api/posts/homePosts")
  return response.data
}

export default function Home() {
  const { data, error, isLoading } = useQuery<PostsType[]>({
    queryFn: allPosts,
    queryKey: ["posts"],
  })
  if (error) return error
  if (isLoading) return "Loading..."

  return (
    <div>
      <CreatePost />
      {data?.map((post) => (
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
  )
}