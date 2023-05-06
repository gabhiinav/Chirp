"use client";

import { signIn } from "next-auth/react";

export default function Login() {
  return (
    <li>
      <button
        className="rounded-xl bg-blue-400 px-6 py-2 text-sm text-black"
        onClick={() => signIn()}
      >
        Sign In
      </button>
    </li>
  );
}
