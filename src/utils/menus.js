import { AiFillAccountBook, AiFillAmazonCircle, AiFillBell, AiOutlineBook, AiOutlineCar, AiOutlineDashboard, AiOutlineGroup, AiOutlineSchedule, AiOutlineSmallDash, AiOutlineUser } from "react-icons/ai";
import { MdGroup, MdOutlineDashboard } from "react-icons/md";

const menus = [
  { name: "Dashboard", link: "/dashboard", icon: MdOutlineDashboard },
  {
    name: "Manajemen Relawan",
    link: "/volunteer-management",
    icon: AiOutlineUser,
  },
  {
    name: "Manajemen Unit",
    link: "/master-data/unit-volunteer",
    icon: MdGroup,
  },
  {
    name: "Manajemen Pendidikan",
    link: "/master-data/education",
    icon: AiOutlineGroup,
  },
  {
    name: "Manajemen Pekerjaan",
    link: "/master-data/occupation",
    icon: AiFillAccountBook,
  },
  // {
  //   name: 'Manajemen Bencana',
  //   link: '/disaster-management',
  //   icon: AiFillBell
  // },
  // {
  //   name: 'Manajemen Kegiatan',
  //   link: '/activity-management',
  //   icon: AiOutlineBook
  // },
  // {
  //   name: 'Manajemen Kendaraan',
  //   link: '/vehicle-management',
  //   icon: AiOutlineCar
  // },
  // {
  //   name: 'Manajemen Operasional',
  //   link: '/operational-management',
  //   icon: AiOutlineDashboard
  // },
];

export default menus;
