import styles from "./nav.module.css";
import Logo from "./logo";
import { auth } from "@/auth";
import { signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown";
import { Button } from "@/app/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const Nav: React.FC = async () => {
  const session = await auth();
  return (
    <div className={styles.nav}>
      <a href="/">
        <div style={{ display: "flex", gap: 10 }}>
          <Logo />
          <strong>Godspeed</strong>
        </div>
      </a>

      <a href="/">About</a>
      <a href="/contact">Contact</a>

      {session ? (
        // When the user is logged in

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Image
                src={session.user?.image || "/default-profile.png"}
                alt="User profile image"
                width={32}
                height={32}
                className="rounded-full"
              />
              <span className="sr-only">User menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Link href="/profile" className="w-full">
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={async () => {
                await signOut();
              }}
            >
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        // When the user is not logged in
        <Link
          href="/signin"
          className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-gray-950 text-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-800 hover:text-gray-50 focus:bg-gray-800 focus:text-gray-50 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-800/50 data-[state=open]:bg-gray-800/50 dark:bg-white dark:hover:bg-gray-100 dark:hover:text-gray-900 dark:focus:bg-gray-100 dark:focus:text-gray-900 dark:data-[active]:bg-gray-100/50 dark:data-[state=open]:bg-gray-100/50"
          prefetch={false}
        >
          Login
        </Link>
      )}
    </div>
  );
};

export default Nav;
