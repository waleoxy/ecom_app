"use client";

import { MenuIcon } from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import MobileSidebar from "./MobileSidebar";

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openSidebardown, setOpenSidebardown] = useState(false);

  const handleDropdown = () => {
    setOpenDropdown((prev) => !prev);
  };
  const handleSidebardown = () => {
    setOpenSidebardown((prev) => !prev);
  };

  const router = useRouter();

  return (
    <div className="relative h-auto">
      <div>
        <div className=" sticky flex justify-between items-center pr-6 pl-3 h-[6vh] w-full bg-teal-800 z-50">
          <div className="flex gap-2 ml-0">
            <MenuIcon
              className="text-white cursor-pointer sm:hidden"
              onClick={handleSidebardown}
            />
            <h2 className="text-md font-semibold w-fit font-sans bg-teal-50 py-0.5 px-1 rounded-md text-gray-500">
              Admin
            </h2>
          </div>
          <div className="block items-center relative">
            {" "}
            <Image
              src="/assets/user-circle.svg"
              alt="user icon"
              width={30}
              height={30}
              className="object-contain bg-white rounded-full cursor-pointer"
              onClick={handleDropdown}
            />
            <div
              className={`${
                openDropdown ? "flex flex-col" : "hidden"
              } absolute top-8 right-1 w-max rounded-md
           bg-teal-50 h-fit `}>
              <button
                className={`signOut-btn bg-slate-200 `}
                onClick={() =>
                  signOut({ callbackUrl: `${window.location.origin}` })
                }>
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className={
          openSidebardown
            ? `sm:hidden absolute top-10 h-96 w-96 left-2 transition-all duration-100 ease-in-out`
            : `hidden`
        }>
        {" "}
        <MobileSidebar />
      </div>
    </div>
  );
};

export default Navbar;
