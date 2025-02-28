'use client';

import ArrowRight from '@/assets/icons/ArrowRight';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export interface DataSidebarType {
  title: string,
  url: string,
  icon?: React.ReactNode,
  children?: DataSidebarType[],
  allowRole: string[]
}
interface SidebarItemProps {
  menu: DataSidebarType
}

function SidebarItem(props: SidebarItemProps) {
  const pathname = usePathname()

  const [showChildren, setShowChildren] = useState(false);
  const { menu } = props;

  useEffect(() => {
    const isActivePath = (menu: DataSidebarType): boolean => {
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

  const activeClass = pathname === menu.url ? 'text-[black]' : '';

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
            className="flex items-center w-full gap-2 cursor-pointer text-[#fff]"
            onClick={handleClick}
          >
            <Link href={menu.url} className={`flex items-center w-full gap-2 text-[#fff] ${activeClass}`}>
              {menu.icon}
              <span className={`font-bold uppercase ${activeClass}`}>
                {menu.title}
              </span>
            </Link>
            <ArrowRight
              width={20}
              height={20}
              className={`duration-300 ${showChildren ? "rotate-90" : ''}`}
            />
          </div>
        ) : (
          <Link href={menu.url}>
            <div className="flex items-center w-full gap-2 cursor-pointer text-[#fff]">
              <div className={`flex items-center w-full gap-2 ${activeClass}`}>
                {menu.icon}
                <span className={`font-bold uppercase ${activeClass}`}>
                  {menu.title}
                </span>
              </div>
            </div>
          </Link>
        )}

        {(showChildren && menu.children) && (
          <div className="flex flex-col pl-3 pt-2 w-full">
            {menu.children.map((item) => (
              <SidebarItem key={item.title} menu={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default SidebarItem