'use client'

import { signIn } from "next-auth/react"

export default function Login() {
    return (
        <li>
        <button className="bg-blue-400 text-black text-sm px-6 py-2 rounded-xl" onClick={() => signIn()}>
            Sign In
        </button>
      </li>
    )
}