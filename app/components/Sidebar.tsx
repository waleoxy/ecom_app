"use client";

import { sidebarLinks } from "@/constants/sidebarLinks";
import { LogOutIcon } from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";

const Sidebar = () => {
  const pathname = usePathname();

  console.log("pathname", pathname);

  const inActiveLink =
    "flex items-center  text-gray-900 gap-1 mb-4 p-2 rounded-l-3xl";
  const activeLink = `${inActiveLink} bg-white `;

  return (
    <aside className="hidden sm:block min-w-[200px] bg-teal-50 border-r  h-screen pt-3 static">
      <div className="flex flex-col capitalize text-lg pl-3  mt-4">
        <>
          {sidebarLinks.map((link) => (
            <div
              className={
                pathname === link.url ? `${activeLink}` : `${inActiveLink}`
              }
              key={link.title}>
              <Image src={link.icon} alt="icon" height={24} width={24} />
              <Link href={link.url}>{link.title}</Link>
            </div>
          ))}
          <button
            type="button"
            className={inActiveLink}
            onClick={() =>
              signOut({ callbackUrl: `${window.location.origin}` })
            }>
            <LogOutIcon />
            <p>Log out</p>
          </button>
        </>
      </div>
    </aside>
  );
};

export default Sidebar;
