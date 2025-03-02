import { auth } from "@/auth";
import UserProfile from "@/app/components/userInfoCard";
import { redirect } from "next/navigation";
import { User } from "next-auth";
import Link from "next/link";

interface ExtendedUser extends User {
  createdAt: string;
}

export default async function def() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="container h-screen">
      <div className="py-5">
        <UserProfile user={session?.user as ExtendedUser} />
      </div>
      <div className="container py-5 text-center">
        <Link href="/dashboard">View Oppurtunities →</Link>
      </div>
    </div>
  );
}
