"use client";

import { auth } from "@/auth";
import { signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { Button } from "@/app/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

const NavbarIcon: React.FC = () => {
  const { data: session } = useSession();

  console.log(session);

  return (
    <div>
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
                className="rounded-full border"
              />
              <span className="sr-only">User menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent style={{ background: "white" }} align="end">
            <DropdownMenuItem>
              <Link href="/profile" className="w-full">
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={async () => await signOut()}>
              <Link href="/" className="w-full">
                Sign Out
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        // When the user is not logged in
        // <Link
        //   href="/signin"
        //   className="group inline-flex h-9 w-max items-center justify-center rounded-md text-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-800 hover:text-gray-50 focus:bg-gray-800 focus:text-gray-50 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-800/50 data-[state=open]:bg-gray-800/50 dark:bg-white dark:hover:bg-gray-100 dark:hover:text-gray-900 dark:focus:bg-gray-100 dark:focus:text-gray-900 dark:data-[active]:bg-gray-100/50 dark:data-[state=open]:bg-gray-100/50"
        //   prefetch={false}
        // >
        //   Login
        // </Link>
        <Link href="/signin" passHref>
          <Button className="border">Login</Button>
        </Link>
      )}
    </div>
  );
};

export default NavbarIcon;
