import { useEffect, useState } from "react";
import { SideBarAdmin } from "./Sidebar";
import TopBar from "./TopBar";

export function Layout({ children }) {
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
    <main>
      <div className="flex">
        <SideBarAdmin />
        <TopBar />
      </div>
      <div className="sm:pl-32 pl-20 sm:pr-24 pr-4 pt-8">{children}</div>
    </main>
  );
}
