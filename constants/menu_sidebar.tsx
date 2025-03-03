import FilesIcon from "@/assets/icons/FilesIcon";
import MenuIcon from "@/assets/icons/MenuIcon";
import UsersIcon from "@/assets/icons/UsersIcon";
import WomenIcon from "@/assets/icons/WomenIcon";
import { FileCategoriesEntity } from "@/entities/file-categories";
import { generateSlug } from "@/utils/generateSlug";
import { FILE_CATEGORY, USER_ROLE } from "@prisma/client";

export interface MenuSidebarType {
  title: string;
  url: string;
  icon?: React.ReactNode;
  allowRole?: string[];
  category?: FILE_CATEGORY;
  children?: MenuSidebarType[];
}

const menu_sidebar: MenuSidebarType[] = [
  {
    title: 'INSIGHT KHÁCH HÀNG',
    url: '/insight-khach-hang',
    icon: <WomenIcon width={20} height={20} />,
    allowRole: [USER_ROLE.ADMIN, USER_ROLE.CSKH, USER_ROLE.MANAGEMENT, USER_ROLE.MKT, USER_ROLE.SALES]
  },
  {
    title: 'Tư liệu chung',
    category: 'GENERAL',
    url: '#',
    icon: <FilesIcon width={20} height={20} />,
    allowRole: [USER_ROLE.ADMIN, USER_ROLE.CSKH, USER_ROLE.MANAGEMENT, USER_ROLE.MKT, USER_ROLE.SALES],
  },
  {
    title: 'MKT',
    category: 'MKT',
    url: '#',
    icon: <FilesIcon width={20} height={20} />,
    allowRole: [USER_ROLE.ADMIN, USER_ROLE.MANAGEMENT, USER_ROLE.MKT],
  },
  {
    title: 'SALES',
    category: 'SALES',
    url: '#',
    icon: <FilesIcon width={20} height={20} />,
    allowRole: [USER_ROLE.ADMIN, USER_ROLE.MANAGEMENT, USER_ROLE.SALES],
  },
  {
    title: 'CSKH',
    category: 'CSKH',
    url: '#',
    icon: <FilesIcon width={20} height={20} />,
    allowRole: [USER_ROLE.ADMIN, USER_ROLE.CSKH, USER_ROLE.MANAGEMENT],
  },
  {
    title: 'Quản lý người dùng',
    url: '/quan-ly-nguoi-dung',
    icon: <UsersIcon width={20} height={20} />,
    allowRole: ['ADMIN']
  },
  {
    title: 'Quản lý danh mục',
    url: '/quan-ly-danh-muc',
    icon: <MenuIcon width={20} height={20} />,
    allowRole: ['ADMIN']
  },
]

export const generateMenuSidebar = (fileCategories: FileCategoriesEntity[] | null) => {
  if(!fileCategories) return
  const fileCategoriesSidebar = fileCategories.map(item => ({
    ...item,
    url: `/tu-lieu/${generateSlug(item.title)}`
  }))
  return menu_sidebar.map(menu => {
    const matchedCategories = fileCategoriesSidebar.filter(item => item.category === menu.category);

    if (matchedCategories.length > 0) {
      return { ...menu, children: matchedCategories };
    }

    return menu;
  });
}
