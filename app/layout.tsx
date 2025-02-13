'use client'

import "./globals.css";
import Sidebar from "@/components/sidebar";
import { usePathname } from "next/navigation";
import { ToastContainer } from 'react-toastify';
import { useEffect } from "react";
import { useAuthStore } from "@/zustand/auth.store";
import "react-datepicker/dist/react-datepicker.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const { getMe } = useAuthStore();
  
  useEffect(() => {
    (async () => {
      await getMe()
    })()
  }, [getMe])

  return (
    <html lang="en">
      <body
        className={`bg-[#ccc] font-normal`}
      >
        {pathname.startsWith('/login') ? (
          children
        ) : (
          <div className="flex">

            <Sidebar />
            <main className="p-2 bg-[#ccc] w-[calc(100%-240px)] h-screen">
              {children}
            </main>
          </div>
        )}
        <ToastContainer />
      </body>
    </html>
  );
}
