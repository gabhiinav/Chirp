"use client";

import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

type User = {
  image: string;
};

export default function Logged({ image }: User) {
  return (
    <li className="flex items-center gap-8">
      <button
        className="rounded-xl bg-blue-400 px-6 py-2 text-sm text-black"
        onClick={() => signOut()}
      >
        Sign Out
      </button>
      <Link href={"/dashboard"}>
        <Image
          width={64}
          height={64}
          className="w-14 rounded-full"
          src={image}
          alt=""
          priority
        />
      </Link>
    </li>
  );
}
