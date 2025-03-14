'use client'

import "./globals.css";
import Sidebar from "@/components/sidebar";
import { usePathname } from "next/navigation";
import { ToastContainer } from 'react-toastify';
import { useEffect, useState } from "react";
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
  const [open, setOpen] = useState(false)
  
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

            <Sidebar menuSidebar={menuSidebar} open={open} setOpen={setOpen} />
            <main className={`p-2 bg-[#f8d5d7] ${open ? 'lg:w-[calc(100%-240px)]' : 'w-full'} h-screen`}>
              {children}
            </main>
          </div>
        )}
        <ToastContainer />
      </body>
    </html>
  );
}
