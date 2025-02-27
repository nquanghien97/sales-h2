'use client'

import { menu_sidebar } from '@/constants/menu_sidebar'
import React, { useState } from 'react'
import SidebarItem from './SidebarItem';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/zustand/auth.store';
import { Button } from '../ui/Button';
import ArrowRight from '@/assets/icons/ArrowRight';
import ChangePassword from '../change-password';

function Sidebar() {
  const router = useRouter();
  const { me } = useAuthStore();

  const [showChildren, setShowChildren] = useState(false);
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
            {menu_sidebar.map(menu => (
              me && menu.allowRole.includes(me?.role) && (
                menu.children ? (
                  <div key={menu.title}>
                    <div className="flex items-center gap-1 p-2 hover:text-[#716aca] font-bold duration-300 cursor-pointer uppercase" onClick={() => setShowChildren(pre => !pre)}>
                      {menu.icon}
                      {menu.title}
                      <ArrowRight className={`${showChildren ? 'rotate-90' : ''} duration-300`} />
                    </div>
                    {showChildren && (
                      <ul className="list-disc pl-8">
                        {menu.children.map(child => (
                          <li key={child.title} className="">
                            <SidebarItem menu={child} />
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <SidebarItem key={menu.title} menu={menu} />
                )
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