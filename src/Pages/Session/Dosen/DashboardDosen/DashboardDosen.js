import SideBarDosen from '../../../../Component/Dosen/SideBarDosen/SideBarDosen';
import TopNavDosen from '../../../../Component/Dosen/TopBarDosen/TopBarDosen';

function DashboardDosen () {
  return (
    <div className="flex">
      <SideBarDosen/>
      <TopNavDosen/>
    </div>
  );
}

export default DashboardDosen;
