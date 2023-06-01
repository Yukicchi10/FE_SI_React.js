import { useEffect, useState } from "react";
import SideBarDosen from "../../../Component/Dosen/SideBarDosen/SideBarDosen";
import TopNavDosen from "../../../Component/Dosen/TopBarDosen/TopBarDosen";

export function DashboardAdminPage() {
  const isAuthenticated = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      setIsLoading(false);
    }
  }, []);

  if (isAuthenticated === null || role !== "admin") {
    window.location.href = "/";
    return;
  }
  return (
    <>
      <div className="flex">
        <SideBarDosen />
        <TopNavDosen />
      </div>
     <h1 className="text-center">
      Halaman admin
      </h1> 
    </>
  );
}
