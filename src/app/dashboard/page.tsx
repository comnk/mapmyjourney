import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import DashboardContent from "./DashboardContent";

export default async function DashboardPage() {
  // Fetch session on the server
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    // Redirect unauthorized users to login
    redirect("/auth/login");
    return null;
  }

  return <DashboardContent user={session.user} />;
}
