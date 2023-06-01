import { useEffect, useState } from "react";
import SideBar from "../../../Component/SideBar";
import TopNavigation from "../../../Component/TopNavigation";

export function DashboardStudent() {
  const isAuthenticated = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (isAuthenticated === null || role !== "mahasiswa") {
    window.location.href = "/";
    return;
  }

  return (
    <>
      <div className="flex">
        <SideBar />
        <TopNavigation />
      </div>
      <h1 className="text-center">Mahasiswa page</h1>
    </>
  );
}
