"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface PostProps {
  id: number;
  name: string;
  avatar: string;
  postTitle: string;
  comments?: string[];
}

export default function PostPost({
  id,
  name,
  avatar,
  postTitle,
  comments,
}: PostProps): JSX.Element {
  return (
    <motion.div
      animate={{ opacity: 1, scale: 1 }}
      initial={{ opacity: 0, scale: 0.8 }}
      transition={{ ease: "easeOut" }}
      className="my-8 rounded-lg bg-white p-8"
    >
      <div className="flex items-center gap-2">
        <Image
          className="rounded-full"
          width={32}
          height={32}
          src={avatar}
          alt="avatar"
        />
        <h3 className="font-bold text-gray-700">{name}</h3>
      </div>
      <div className="my-8 ">
        <p className="break-all">{postTitle}</p>
      </div>
      <div className="flex cursor-pointer items-center gap-4">
        <Link
          href={{
            pathname: `/post/${id}`,
          }}
        >
          <p className=" text-sm font-bold text-gray-700">
            {comments?.length} Comments
          </p>
        </Link>
      </div>
    </motion.div>
  );
}
