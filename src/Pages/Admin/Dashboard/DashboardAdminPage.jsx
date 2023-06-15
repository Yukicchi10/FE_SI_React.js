import { useEffect, useState } from "react";
import { Layout } from "../Layout/Layout";
import apiManageClass from "../../../lib/api/admin/manageClass";

export function DashboardAdminPage() {
  const [data, setData] = useState()

  useEffect(() => {
    const getData = async () => {
      await apiManageClass.dashboard().then((res) => setData(res.data.data));
    };
    getData();
  }, []);

  return (
    <Layout>
      <div className="bg-blue-700 text-white py-16 px-4 rounded">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Admin Dashboard</h1>
        <p className="text-lg">Mengelola Dosen, Mahasiswa dan Kelas.</p>
      </div>
    </div>
    <div className="flex flex-col sm:flex-row gap-4 space-x-4 mt-4">
      <div className="bg-white w-full rounded-lg shadow-md p-4 flex flex-col justify-center items-center">
        <p className="text-3xl font-bold text-blue-500 mt-2">{data?.kelas}</p>
        <h2 className="text-2xl font-bold">Kelas</h2>
      </div>
      <div className="bg-white w-full rounded-lg shadow-md p-4 flex flex-col justify-center items-center">
        <p className="text-3xl font-bold text-green-500 mt-2">{data?.dosen}</p>
        <h2 className="text-2xl font-bold">Dosen</h2>
      </div>
      <div className="bg-white w-full rounded-lg shadow-md p-4 flex flex-col justify-center items-center">
        <p className="text-3xl font-bold text-purple-500 mt-2">{data?.mahasiswa}</p>
        <h2 className="text-2xl font-bold">Mahasiswa</h2>
      </div>
    </div>
    </Layout>
  );
}
