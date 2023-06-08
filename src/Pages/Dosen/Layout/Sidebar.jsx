import { FaBook, FaCalendar, FaCalendarAlt, FaChalkboardTeacher, FaHome, FaTasks, FaUserCog } from 'react-icons/fa';
import './SideBarDosen.css'
import { Link } from 'react-router-dom';

const SideBarDosen = () => {
  return (
    <div className="fixed top-0 left-0 h-screen w-16 flex flex-col
                  bg-white dark:bg-gray-900 shadow-lg">
                    
        <SideBarIcon icon={<FaHome size="28"/>} text="Dashboard" url='/dosen/dashboard' />
        {/* <SideBarIcon icon={<FaCalendar size="25" />} text="Absensi" url='/dosen/absen' /> */}
        <Divider/>
        <SideBarIcon icon={<FaBook size="25" />} text="Materi" url='/dosen/materi' />
        <SideBarIcon icon={<FaTasks size="25" />} text="Tugas" url='/dosen/tugas' />
        <Divider />
        <SideBarIcon icon={<FaCalendarAlt size="25" />} text="Kalender Akademik" url='/dosen/kalender-akademik' />
        <SideBarIcon icon={<FaUserCog size="25" />} text="Profil" url='/dosen/profil' />
    </div>
  );
};

const SideBarIcon = ({ icon, text = 'tooltip 💡', url = '#' }) => (
  <Link to={url} className="sidebar-icon1 group">
  {/* // <div className="sidebar-icon group"> */}
    {icon}
    <span class="sidebar-tooltip1 group-hover:scale-100">
      {text}
    </span>
  {/* </div> */}
  </Link>
);

const Divider = () => <div className="sidebar-hr1" />;

export default SideBarDosen;
