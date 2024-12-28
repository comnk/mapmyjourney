import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav>
      {session ? (
        <>
          <Link href="/dashboard">Home</Link>
          <span>Welcome, {session.user?.name}</span>
          <Link href="/profile">Profile</Link>
          <button onClick={() => signOut()}>Log Out</button>
        </>
      ) : (
        <>
          <Link href="/">Home</Link>
          <Link href="/auth/login">Log In</Link>
        </>
      )}
    </nav>
  );
}
