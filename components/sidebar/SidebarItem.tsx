'use client';

import ArrowRight from '@/assets/icons/ArrowRight';
import { MenuSidebarType } from '@/constants/menu_sidebar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'
interface SidebarItemProps {
  menu: MenuSidebarType
  onClose: () => void
}

function SidebarItem(props: SidebarItemProps) {
  const pathname = usePathname()

  const [showChildren, setShowChildren] = useState(false);
  const { menu, onClose } = props;

  useEffect(() => {
    const isActivePath = (menu: MenuSidebarType): boolean => {
      if (menu.url === pathname) return true;
      if (menu.children) {
        return menu.children.some((item) => isActivePath(item));
      }
      return false;
    };
    if (isActivePath(menu)) {
      setShowChildren(true);
    }
  }, [menu, pathname]);

  const activeClass = pathname === menu.url ? 'text-[#2563eb]' : '';

  const handleClick = (e: React.MouseEvent) => {
    if (menu.children) {
      e.preventDefault(); // Ngăn chặn điều hướng nếu có menu con
      setShowChildren(prev => !prev);
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col text-white p-3">
        {menu.children ? (
          <div
            className="flex items-center w-full gap-2 cursor-pointer text-[#fff] hover:text-[#2563eb] duration-300"
            onClick={handleClick}
          >
            <div className={`flex items-center w-full gap-2 ${activeClass}`}>
              {menu.icon}
              <span className={`font-bold uppercase ${activeClass}`}>
                {menu.title}
              </span>
            </div>
            <ArrowRight
              width={20}
              height={20}
              className={`${showChildren ? "rotate-90" : ''}`}
            />
          </div>
        ) : (
          <Link href={menu.url} onClick={onClose}>
            <div className="flex items-center w-full gap-2 cursor-pointer text-[#fff] hover:text-[#2563eb] duration-300">
              <div className={`flex items-center w-full gap-2 ${activeClass}`}>
                {menu.icon}
                <span className={`font-bold uppercase break-all ${activeClass}`}>
                  {menu.title}
                </span>
              </div>
            </div>
          </Link>
        )}

        {(showChildren && menu.children) && (
          <div className="flex flex-col pl-3 pt-2 w-full">
            {menu.children.map((item) => (
              <SidebarItem key={item.title} menu={item} onClose={onClose} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default SidebarItem