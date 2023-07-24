"use client";

import { signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const handleDropdown = () => {
    setOpenDropdown((prev) => !prev);
  };

  const router = useRouter();

  return (
    <div className="hidden sticky sm:flex justify-between items-center px-6 h-[6vh] w-full bg-teal-800 z-50">
      <div className="">
        <h2 className="text-md font-semibold  font-sans bg-teal-50 py-0.5 px-1 rounded-md text-gray-500">
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
  );
};

export default Navbar;
