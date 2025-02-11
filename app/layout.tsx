'use client'

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/sidebar";
import { usePathname } from "next/navigation";
import { ToastContainer } from 'react-toastify';
import { useEffect } from "react";
import { useAuthStore } from "@/zustand/auth.store";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#ccc]`}
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
