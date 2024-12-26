"use client";

import { signOut } from "next-auth/react";

interface User {
  name?: string | null;
  email?: string | null;
}

interface DashboardContentProps {
  user: User;
}

export default function DashboardContent({ user }: DashboardContentProps) {
  return (
    <div>
      <h1>Welcome to Your Dashboard, {user.name}!</h1>
      <p>Your email: {user.email}</p>
      <button onClick={() => signOut()}>Log Out</button>
    </div>
  );
}
