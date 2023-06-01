import SideBarDosen from "../../../Component/Dosen/SideBarDosen/SideBarDosen";
import TopNavDosen from "../../../Component/Dosen/TopBarDosen/TopBarDosen";
import { useEffect, useState } from "react";

export function DashboardDosenPage() {
  const isAuthenticated = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      setIsLoading(false);
    }
  }, []);

  if (isAuthenticated === null || role !== "dosen") {
    window.location.href = "/";
    return;
  }

  return (
    <>
      <div className="flex">
        <SideBarDosen />
        <TopNavDosen />
      </div>
      <h1 className="text-center">Halaman Dosen</h1>
    </>
  );
}
