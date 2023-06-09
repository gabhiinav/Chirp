import Image from "next/image";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

type EditProps = {
  id: string;
  avatar: string;
  name: string;
  title: string;
  comments?: {
    id: string;
    postId: string;
    userId: string;
  }[];
};

export default function EditPost({
  avatar,
  name,
  title,
  comments,
  id,
}: EditProps) {
  const queryClient = useQueryClient();
  let deleteToastID: string;

  const { mutate } = useMutation(
    async (id: string) => {
      const res = await fetch(`/api/posts/deletePost?id=${id}`, {
        method: "DELETE",
      });
      return res.json();
    },
    {
      onError: (error) => {
        console.log(error);
      },
      onSuccess: (data) => {
        console.log(data);
        toast.dismiss(deleteToastID);
        deleteToastID = "";
        queryClient.invalidateQueries(["my-posts"]);
        toast.success("Post has been deleted.", { id: deleteToastID });
      },
    }
  );

  const deletePost = () => {
    deleteToastID = toast.loading("Deleting your post.", { id: deleteToastID });
    mutate(id);
  };

  return (
    <motion.div
      animate={{ opacity: 1, scale: 1 }}
      initial={{ opacity: 0, scale: 0.8 }}
      transition={{ ease: "easeOut" }}
      className="my-8 rounded-lg bg-white p-8 "
    >
      <div className="flex items-center gap-2">
        <Image
          width={32}
          height={32}
          src={avatar}
          alt="avatar"
          className="rounded-full"
        />
        <h3 className="font-bold text-gray-700">{name}</h3>
      </div>
      <div className="my-8 ">
        <p className="break-all">{title}</p>
      </div>
      <div className="flex items-center gap-4 ">
        <p className=" text-sm font-bold text-gray-700">
          {comments?.length} Comments
        </p>
        {/* <button
          onClick={(e) => {
            e.stopPropagation();
            deletePost();
          }}
          className="text-sm font-bold text-red-500"
        >
          Delete
        </button> */}
      </div>
    </motion.div>
  );
}
