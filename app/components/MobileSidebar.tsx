"use client";

import { sidebarLinks } from "@/constants/sidebarLinks";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const MobileSidebar = () => {
  const pathname = usePathname();
  const inActiveLink =
    "flex items-center  text-gray-900 gap-1 mb-4 p-2 rounded-l-3xl";
  const activeLink = `${inActiveLink} bg-white `;
  return (
    <aside className="flex sm:hidden w-full bg-teal-50 border-r  h-full ">
      <div className="flex flex-col capitalize text-lg pl-3  mt-4">
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
      </div>
    </aside>
  );
};

export default MobileSidebar;
