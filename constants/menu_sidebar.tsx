import BanIcon from "@/assets/icons/BanIcon";
import InfoIcon from "@/assets/icons/InforIcon";
import UsersIcon from "@/assets/icons/UsersIcon";

export const menu_sidebar = [
  {
    title: 'Kịch bản tư vấn',
    url: '/kich-ban-tu-van',
    icon: <InfoIcon width={20} height={20} />,
    allowRole: ['ADMIN', 'USER']
  },
  {
    title: 'Xử lý từ chối',
    url: '/xu-ly-tu-choi',
    icon: <BanIcon width={20} height={20} />,
    allowRole: ['ADMIN', 'USER']
  },
  {
    title: 'Quản lý người dùng',
    url: '/quan-ly-nguoi-dung',
    icon: <UsersIcon width={20} height={20} />,
    allowRole: ['ADMIN']
  }
]