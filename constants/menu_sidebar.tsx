import FilesIcon from "@/assets/icons/FilesIcon";
import UsersIcon from "@/assets/icons/UsersIcon";
import WomenIcon from "@/assets/icons/WomenIcon";

export const menu_sidebar = [
  {
    title: 'INSIGHT KHÁCH HÀNG',
    url: '/insight-khach-hang',
    icon: <WomenIcon width={20} height={20} />,
    allowRole: ['ADMIN', 'USER']
  },
  {
    title: 'Quản lý người dùng',
    url: '/quan-ly-nguoi-dung',
    icon: <UsersIcon width={20} height={20} />,
    allowRole: ['ADMIN']
  },
  {
    title: 'Tư liệu chung',
    url: '#',
    icon: <FilesIcon width={20} height={20} />,
    allowRole: ['ADMIN', 'USER'],
    children: [
      {
        title: 'Chính sách bán hàng',
        url: '/chinh-sach-ban-hang',
        allowRole: ['ADMIN', 'USER']
      },
      {
        title: 'Sản phẩm',
        url: '/san-pham',
        allowRole: ['ADMIN', 'USER']
      },
      {
        title: 'Giấy tờ sản phẩm',
        url: '/giay-to-san-pham',
        allowRole: ['ADMIN', 'USER']
      },
      {
        title: 'Feedback KH',
        url: '/feedbacks-khach-hang',
        allowRole: ['ADMIN', 'USER']
      }
    ]
  },
  {
    title: 'MKT',
    url: '#',
    icon: <FilesIcon width={20} height={20} />,
    allowRole: ['ADMIN', 'USER'],
    children: [
      {
        title: 'Chính sách bán hàng',
        url: '/chinh-sach-ban-hang',
        allowRole: ['ADMIN', 'USER']
      },
      {
        title: 'Sản phẩm',
        url: '/san-pham',
        allowRole: ['ADMIN', 'USER']
      },
      {
        title: 'Giấy tờ sản phẩm',
        url: '/giay-to-san-pham',
        allowRole: ['ADMIN', 'USER']
      },
      {
        title: 'Feedback KH',
        url: '/feedbacks-khach-hang',
        allowRole: ['ADMIN', 'USER']
      }
    ]
  },
  {
    title: 'SALES',
    url: '#',
    icon: <FilesIcon width={20} height={20} />,
    allowRole: ['ADMIN', 'USER'],
    children: [
      {
        title: 'Chính sách bán hàng',
        url: '/chinh-sach-ban-hang',
        allowRole: ['ADMIN', 'USER']
      },
      {
        title: 'Sản phẩm',
        url: '/san-pham',
        allowRole: ['ADMIN', 'USER']
      },
      {
        title: 'Giấy tờ sản phẩm',
        url: '/giay-to-san-pham',
        allowRole: ['ADMIN', 'USER']
      },
      {
        title: 'Feedback KH',
        url: '/feedbacks-khach-hang',
        allowRole: ['ADMIN', 'USER']
      }
    ]
  },
  {
    title: 'CSKH',
    url: '#',
    icon: <FilesIcon width={20} height={20} />,
    allowRole: ['ADMIN', 'USER'],
    children: [
      {
        title: 'Chính sách bán hàng',
        url: '/chinh-sach-ban-hang',
        allowRole: ['ADMIN', 'USER']
      },
      {
        title: 'Sản phẩm',
        url: '/san-pham',
        allowRole: ['ADMIN', 'USER']
      },
      {
        title: 'Giấy tờ sản phẩm',
        url: '/giay-to-san-pham',
        allowRole: ['ADMIN', 'USER']
      },
      {
        title: 'Feedback KH',
        url: '/feedbacks-khach-hang',
        allowRole: ['ADMIN', 'USER']
      }
    ]
  },
]