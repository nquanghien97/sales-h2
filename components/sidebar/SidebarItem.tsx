'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { JSX } from 'react'

interface SidebarItemProps {
  menu: {
    title: string;
    url: string;
    icon?: JSX.Element
  }
}

function SidebarItem(props: SidebarItemProps) {
  const { menu } = props
  const pathname = usePathname()

  const isPathActive = pathname === menu.url

  return (
    <Link className={`flex items-center gap-1 p-2 mb-2 hover:text-[#716aca] font-bold duration-300 ${isPathActive ? 'text-[#716aca]' : ''}`} href={menu.url}>
      {menu.icon}
      {menu.title}
    </Link>
  )
}

export default SidebarItem