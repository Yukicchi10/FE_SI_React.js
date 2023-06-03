import { useEffect, useState } from "react";
import TopNavDosen from "../../../Component/Dosen/TopBarDosen/TopBarDosen";
import SideBarDosen from "./Sidebar";

export function Layout({ children }) {
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
    <main>
      <div className="flex">
        <SideBarDosen />
        <TopNavDosen />
      </div>
      <div className="sm:pl-32 pl-20 sm:pr-24 pr-4 pt-8">{children}</div>
    </main>
  );
}