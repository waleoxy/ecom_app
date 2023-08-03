import Provider from "@/app/components/Provider";
import "../globals.css";
import type { Metadata } from "next";
import { Footer, MobileSidebar, Navbar, Sidebar } from "@/app/components";

export const metadata: Metadata = {
  title: "OvationStore",
  description:
    "Buy all your computer, digital and electronics gadgets at affordable prices",
};

export default function PagesRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Provider>
        <body className="flex flex-col bg-teal-50 w-screen overflow-hidden">
          <Navbar />
          <div className="flex">
            <MobileSidebar />
            <Sidebar />
            {children}
          </div>
          <Footer />
        </body>
      </Provider>
    </html>
  );
}
