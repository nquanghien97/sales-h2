'use client'

import "./globals.css";
import Sidebar from "@/components/sidebar";
import { usePathname } from "next/navigation";
import { ToastContainer } from 'react-toastify';
import { useEffect } from "react";
import { useAuthStore } from "@/zustand/auth.store";
import "react-datepicker/dist/react-datepicker.css";
import { useFileCategories } from "@/zustand/file-categories";
import { generateMenuSidebar } from "@/constants/menu_sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const { getMe } = useAuthStore();
  const { getFileCategories, fileCategories } = useFileCategories()
  
  useEffect(() => {
    (async () => {
      await getMe()
    })()
  }, [getMe])

  useEffect(() => {
    (async () => {
      await getFileCategories()
    })()
  }, [getFileCategories])

  const menuSidebar = generateMenuSidebar(fileCategories)

  return (
    <html lang="en">
      <body
        className={`bg-[#f8d5d7] font-normal`}
      >
        {pathname.startsWith('/login') ? (
          children
        ) : (
          <div className="flex">

            <Sidebar menuSidebar={menuSidebar} />
            <main className="p-2 bg-[#f8d5d7] w-[calc(100%-240px)] h-screen">
              {children}
            </main>
          </div>
        )}
        <ToastContainer />
      </body>
    </html>
  );
}
