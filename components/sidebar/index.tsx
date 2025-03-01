'use client'

import {  MenuSidebarType } from '@/constants/menu_sidebar'
import React, { useState } from 'react'
import SidebarItem from './SidebarItem';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/zustand/auth.store';
import { Button } from '../ui/Button';
import ChangePassword from '../change-password';

function Sidebar({ menuSidebar } : { menuSidebar?: MenuSidebarType[] }) {
  const router = useRouter();
  const { me } = useAuthStore();

  const [isOpenChangePassword, setIsOpenChangePassword] = useState(false);

  const logOut = () => {
    Cookies.remove('token');
    router.push('/login')
  }

  return (
    <>
      <ChangePassword open={isOpenChangePassword} onClose={() => setIsOpenChangePassword(false)} />
      <div className="w-[240px] fixed h-screen border-r border-[#ccc] text-white">
        <div className="p-2 py-4 bg-[#2563eb] text-white text-center">
          {me?.fullName}
        </div>
        <div className="bg-[#ec658d] h-[calc(100%-56px)] overflow-x-hidden overflow-y-auto flex flex-col">
          <div className="py-2 flex-1">
            {menuSidebar?.map(menu => (
              me && menu.allowRole?.includes(me?.role) && (
                <SidebarItem key={menu.title} menu={menu} />
              )
            ))}
          </div>
          <div className="flex justify-center">
            <Button variant='primary' onClick={() => setIsOpenChangePassword(true)}>Đổi mật khẩu</Button>
          </div>
          <div className="flex justify-center py-4">
            <Button variant='primary' onClick={logOut}>Đăng xuất</Button>
          </div>
        </div>
      </div>
      <div className="w-[240px]" />
    </>
  )
}

export default Sidebar