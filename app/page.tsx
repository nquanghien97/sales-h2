'use client'

import withAuth from "@/hocs/withAuth";
import { useEffect } from "react";
import Image from "next/image";

const Home = () => {

  useEffect(() => {
    document.title = "Trang chủ"
  }, []);

  return (
    <div className="flex max-lg:items-center h-full">
      <Image src="/bg-home.jpg" alt="bg-home" width={2560} height={1440} className="" />
    </div>
  );
}

const HomeWithAuth = withAuth(Home);
export default HomeWithAuth;