import ChildrenIcon from "@/assets/icons/ChildrenIcon";
import UsersIcon from "@/assets/icons/UsersIcon";
import WomenIcon from "@/assets/icons/WomenIcon";

export const menu_sidebar = [
  {
    title: 'INSIGHT CỦA BÉ',
    url: '/insight-cua-be',
    icon: <ChildrenIcon width={20} height={20} />,
    allowRole: ['ADMIN', 'USER']
  },
  {
    title: 'INSIGHT CỦA MẸ',
    url: '/insight-cua-me',
    icon: <WomenIcon width={20} height={20} />,
    allowRole: ['ADMIN', 'USER']
  },
  {
    title: 'Quản lý người dùng',
    url: '/quan-ly-nguoi-dung',
    icon: <UsersIcon width={20} height={20} />,
    allowRole: ['ADMIN']
  }
]