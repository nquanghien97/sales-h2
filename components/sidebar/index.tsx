'use client'

import { menu_sidebar } from '@/constants/menu_sidebar'
import React from 'react'
import SidebarItem from './SidebarItem';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/zustand/auth.store';

function Sidebar() {
  const router = useRouter();
  const { me } = useAuthStore();

  const logOut = () => {
    Cookies.remove('token');
    router.push('/login')
  }


  return (
    <>
      <div className="w-[240px] fixed h-screen">
        <div className="p-2 py-4 bg-[#2563eb] text-white text-center">
          {me?.fullName}
        </div>
        <div className="bg-white h-[calc(100%-56px)] overflow-x-hidden overflow-y-auto flex flex-col">
          <div className="py-2 flex-1">
            {menu_sidebar.map(menu => (
              me && menu.allowRole.includes(me?.role) && (
                <SidebarItem key={menu.title} menu={menu} />
              )
            ))}
          </div>
          <div className="flex justify-center py-4">
            <button className="bg-black text-white py-2 px-4 rounded-xl hover:opacity-70 duration-300" onClick={logOut}>Đăng xuất</button>
          </div>
        </div>
      </div>
      <div className="w-[240px]" />
    </>
  )
}

export default Sidebar