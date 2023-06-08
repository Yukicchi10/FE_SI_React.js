import {
  FaBook,
  FaCalendar,
  FaCalendarAlt,
  FaChalkboardTeacher,
  FaHome,
  FaTasks,
  FaUserCog,
} from "react-icons/fa";
import { MdGroup, MdOutlineSchool } from "react-icons/md";
import logoSI from "../../../Img/LogoSI1.png";
import { Link } from "react-router-dom";

export const SideBarAdmin = () => {
  return (
    <div
      className="fixed top-0 left-0 h-screen w-16 flex flex-col
                  bg-white dark:bg-gray-900 shadow-lg"
    >
      <img src={logoSI} className="logsi" />
      <Divider />
      <SideBarIcon
        icon={<FaHome size="28" />}
        text="Dashboard"
        url="/admin/dashboard"
      />
      <SideBarIcon
        icon={<MdOutlineSchool size="25" />}
        text="Kelas"
        url="/admin/class"
      />
      <SideBarIcon
        icon={<MdGroup size="25" />}
        text="Dosen"
        url="/admin/manage-lecturer"
      />
      {/* <Divider />
      <SideBarIcon
        icon={<FaChalkboardTeacher size="25" />}
        text="Mata Kuliah"
        url="/mahasiswa/mata-kuliah"
      /> */}
      <Divider />
      <SideBarIcon
        icon={<FaCalendarAlt size="25" />}
        text="Kalender Akademik"
        url="/admin/kalender-akademik"
      />
    </div>
  );
};

const SideBarIcon = ({ icon, text = "tooltip 💡", url = "#" }) => (
  <Link to={url} className="sidebar-icon group">
    {/* // <div className="sidebar-icon group"> */}
    {icon}
    <span class="sidebar-tooltip group-hover:scale-100 !z-50">{text}</span>
    {/* </div> */}
  </Link>
);

const Divider = () => <div className="sidebar-hr" />;
