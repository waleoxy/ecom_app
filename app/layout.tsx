import Provider from "@/components/Provider";
import "./globals.css";
import type { Metadata } from "next";
import { Footer, MobileSidebar, Navbar, Sidebar } from "@/components";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export const metadata: Metadata = {
  title: "OvationStore",
  description:
    "Buy all your computer, digital and electronics gadgets at affordable prices",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <Provider>
        <body className="flex flex-col bg-teal-50 w-screen overflow-hidden">
          <Navbar />
          <div className="flex">
            {" "}
            {session && (
              <>
                <MobileSidebar />
                <Sidebar />
              </>
            )}
            {children}
          </div>
          <Footer />
        </body>
      </Provider>
    </html>
  );
}
