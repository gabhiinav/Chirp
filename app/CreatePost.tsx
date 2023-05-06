"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const queryClient = useQueryClient();
  let toastPostID: string;

  const { mutate } = useMutation(
    async (title: string) => {
      const response = await fetch("/api/posts/createPost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
        }),
      });
      if (!response.ok) {
        const errorData: { message: string } = await response.json();
        throw new Error(errorData.message);
      }
      const data = await response.json();
      return data;
    },
    {
      onError: (error: unknown) => {
        if (error instanceof Error) {
          toast.error(error.message, { id: toastPostID });
        }
        setIsDisabled(false);
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(["posts"]);
        toast.dismiss(toastPostID);
        toastPostID = "";
        toast.success("Post has been made.", { id: toastPostID });
        setTitle("");
        setIsDisabled(false);
      },
    }
  );

  const submitPost = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsDisabled(true);
    toastPostID = toast.loading("Creating your post", { id: toastPostID });
    mutate(title);
  };

  return (
    <form onSubmit={submitPost} className="my-8 rounded-md bg-white p-8">
      <div className="my-4 flex flex-col">
        <textarea
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          name="title"
          placeholder="What's on your mind?"
          className="my-2 rounded-md bg-gray-200 p-4  text-lg"
        />
      </div>
      <div className=" flex items-center justify-between gap-2">
        <p
          className={`text-sm font-bold ${
            title.length > 300 ? "text-red-700" : "text-gray-700"
          } `}
        >{`${title.length}/300`}</p>
        <button
          disabled={isDisabled}
          className="rounded-xl bg-blue-400 px-6 py-2 text-sm text-white disabled:opacity-25"
          type="submit"
        >
          Create Post
        </button>
      </div>
    </form>
  );
}
