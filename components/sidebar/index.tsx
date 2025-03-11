'use client'

import { MenuSidebarType } from '@/constants/menu_sidebar'
import React, { Dispatch, SetStateAction, useRef, useState } from 'react'
import SidebarItem from './SidebarItem';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/zustand/auth.store';
import { Button } from '../ui/Button';
import ChangePassword from '../change-password';
import MenuIcon from '@/assets/icons/MenuIcon';
import { ButtonIcon } from '../ui/ButtonIcon';

function Sidebar({ menuSidebar, open, setOpen }: { menuSidebar?: MenuSidebarType[], open: boolean, setOpen: Dispatch<SetStateAction<boolean>> }) {
  const router = useRouter();
  const { me, setMe } = useAuthStore();

  const backdropRef = useRef<HTMLDivElement>(null);

  const [isOpenChangePassword, setIsOpenChangePassword] = useState(false);

  const logOut = () => {
    Cookies.remove('token');
    router.push('/login')
    setMe(null)
  }

  const onClose = () => {
    setOpen(false);
  }
  const clickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === backdropRef.current) {
      onClose();
    }
  };

  return (
    <>
      <ButtonIcon className="fixed z-[999] top-2 left-2 lg:hidden" onClick={() => setOpen(pre => !pre)}>
        <MenuIcon />
      </ButtonIcon>
      <ChangePassword open={isOpenChangePassword} onClose={() => setIsOpenChangePassword(false)} />

      {/* Overlay background when sidebar is open */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-60 z-50 transition-opacity duration-300 lg:hidden ${open ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={onClose}
      />
      <div
        className={`fixed h-screen border-r border-[#ccc] z-[888] text-white duration-300 w-2/3 lg:w-[240px] ${open ? 'max-lg:translate-x-[0px]' : 'max-lg:-translate-x-full'}`}
        ref={backdropRef}
        onClick={clickHandler}
      >
        <div className="p-2 py-4 bg-[#2563eb] text-white text-center">
          {me?.fullName}
        </div>
        <div className="bg-[#ec658d] h-[calc(100%-56px)] overflow-x-hidden overflow-y-auto flex flex-col">
          <div className="py-2 flex-1">
            {menuSidebar?.map(menu => (
              me && menu.allowRole?.includes(me?.role) && (
                <SidebarItem key={menu.title} menu={menu} onClose={() => setOpen(false)} />
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
      <div className={`${open ? 'w-[280px]' : 'w-0 lg:w-[280px]'}`} />
    </>
  )
}

export default Sidebar