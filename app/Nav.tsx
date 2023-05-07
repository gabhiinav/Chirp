import Link from "next/link";
import Login from "./auth/Login";
import Logged from "./auth/Logged";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../pages/api/auth/[...nextauth]";

export default async function Nav() {
  const session = await getServerSession(authOptions);

  return (
    <nav className="flex items-center justify-between py-8">
      <Link href={"/"}>
        <h1 className="text-lg font-bold text-black">Chirp</h1>
      </Link>
      <ul className="flex items-center gap-6">
        {!session?.user && <Login />}
        {session?.user && <Logged image={session.user.image || ""} />}
      </ul>
    </nav>
  );
}
