import React, { useEffect, useState } from "react";
import { Layout } from "../Layout/Layout";
import apiMahasiswaClass from "../../../lib/api/mahasiswa/class";
import { Link } from "react-router-dom";
import { FiExternalLink } from "react-icons/fi";

export const TugasMahasiswa = () => {
  const [data, setData] = useState();

  useEffect(() => {
    const getData = async () => {
      await apiMahasiswaClass.listTugas().then((res) => setData(res.data.data));
    };
    getData();
  }, []);

  return (
    <Layout>
      <div class="border-t-8 border-cyan-800 mt-4 items-center bg-gradient-to-r from-cyan-200 to-cyan-400 text-cyan-800 shadow-lg rounded-lg p-3">
        <h6 class="text-2xl font-semibold"> Tugas</h6>
      </div>
      {data?.map((row) => (
        <div className="w-full mt-4 border-l-8 border-cyan-500 rounded overflow-hidden shadow-lg">
          <div className="flex justify-between items-center px-6">
            <div className="py-4">
              <div className="font-bold text-xl">{row.title}</div>
              <div className="text-gray-500">{row.description}</div>
            </div>

            <Link
              to={`/tugas/${row.id}`}
              className="inline-block no-underline  rounded-full px-3 py-1 text-sm font-semibold text-gray-700 cursor-pointer"
            >
              <FiExternalLink className="text-xl" />
            </Link>
          </div>
        </div>
      ))}
    </Layout>
  );
};
