import { FaBook, FaCalendar, FaCalendarAlt, FaChalkboardTeacher, FaHome, FaTasks, FaUserCog } from 'react-icons/fa';
import logoSI from '../../../Img/LogoSI1.png'

const SideBar = () => {
  return (
    <div className="fixed top-0 left-0 h-screen w-16 flex flex-col
                  bg-white dark:bg-gray-900 shadow-lg">
        <img src={logoSI} className='logsi'/>
        <Divider/>
        <SideBarIcon icon={<FaHome size="28"/>} text="Dashboard" url='/dashboard' />
        <Divider />
        <SideBarIcon icon={<FaChalkboardTeacher size="25" />} text="Mata Kuliah" url='/mahasiswa/mata-kuliah' />
        <SideBarIcon icon={<FaCalendar size="25" />} text="Absensi" url='/mahasiswa/absen' />
        <Divider/>
        <SideBarIcon icon={<FaBook size="25" />} text="Materi" url='/mahasiswa/materi-mahasiswa' />
        <SideBarIcon icon={<FaTasks size="25" />} text="Tugas" url='/mahasiswa/tugas-mahasiswa' />
        <Divider />
        <SideBarIcon icon={<FaCalendarAlt size="25" />} text="Kalender Akademik" url='/mahasiswa/kalender-akademik' />
        <SideBarIcon icon={<FaUserCog size="25" />} text="Profil" url='/mahasiswa/profil' />
    </div>
  );
};

const SideBarIcon = ({ icon, text = 'tooltip 💡', url = '#' }) => (
  <a href={url} className="sidebar-icon group">
  {/* // <div className="sidebar-icon group"> */}
    {icon}
    <span class="sidebar-tooltip group-hover:scale-100">
      {text}
    </span>
  {/* </div> */}
  </a>
);

const Divider = () => <div className="sidebar-hr" />;

export default SideBar;
