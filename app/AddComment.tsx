"use client"

import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { PostType } from "./types/Post"

type Comment = {
  postId?: string
  title: string
}
type PostProps = {
  id?: string
}
export default function AddComment({ id }: PostProps) {
  let commentToastId: string
  console.log(id)
  const [title, setTitle] = useState("")
  const [isDisabled, setIsDisabled] = useState(false)

  const queryClient = useQueryClient()
  const { mutate } = useMutation(
    async (data: Comment) => {
      const response = await fetch("/api/posts/addComment", {
        method: "POST",
        body: JSON.stringify({ data }),
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error("Something went wrong")
      }

      return response.json()
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["detail-post"])
        toast.dismiss(commentToastId);
        commentToastId = "";
        setTitle("")
        setIsDisabled(false)
        toast.success("Added your comment", { id: commentToastId })
      },
      onError: (error) => {
        console.log(error)
        setIsDisabled(false)
        toast.error("Something went wrong", { id: commentToastId })
      },
    }
  )

  const submitPost = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsDisabled(true)
    commentToastId = toast.loading("Adding your comment", {
      id: commentToastId,
    })
    mutate({ title, postId: id })
  }
  return (
    <form onSubmit={submitPost} className="my-8">
      <h3 className="text-xl">Add a comment</h3>

      <div className="flex flex-col my-2">
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          type="text"
          name="title"
          className="p-4 text-lg rounded-md my-2"
        />
      </div>
      <div className="flex items-center gap-2">
        <button
          disabled={isDisabled}
          className=" text-sm bg-teal-600 text-white py-2 px-6 rounded-xl disabled:opacity-25"
          type="submit"
        >
          Add Comment 🚀
        </button>
        <p
          className={`font-bold  ${
            title.length > 300 ? "text-red-700" : "text-gray-700"
          } `}
        >{`${title.length}/300`}</p>
      </div>
    </form>
  )
}
