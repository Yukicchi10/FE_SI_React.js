import { useEffect, useState } from "react";
import TopNavigation from "./TopNavigation";
import SideBar from "./Sidebar";

export function Layout({ children }) {
  const isAuthenticated = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      setIsLoading(false);
    }
  }, []);

  if (isAuthenticated === null || role !== "mahasiswa") {
    window.location.href = "/";
    return;
  }
  return (
    <main>
      <div className="flex">
        <SideBar />
        <TopNavigation />
      </div>
      <div className="sm:pl-32 pl-20 sm:pr-24 pr-4 py-8">{children}</div>
    </main>
  );
}
