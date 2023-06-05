import { useEffect, useState } from "react";
import { Layout } from "../Layout/Layout";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import apiDosenClass from "../../../lib/api/dosen/class";
import { FiExternalLink } from "react-icons/fi";

export function MateriDosenPage() {
  const [data, setData] = useState();

  useEffect(() => {
    const getData = async () => {
      await apiDosenClass.listMateri().then((res) => setData(res.data.data));
    };
    getData();
  }, []);

  return (
    <Layout>
      <div class="relative border-l-8 border-yellow-800 items-center bg-gradient-to-r from-yellow-200 to-yellow-400 text-yellow-800 shadow-lg rounded-lg p-3">
        <h6 class="text-2xl font-semibold"> Materi</h6>
      </div>
      {data?.map((row) => (
        <div className="w-full mt-4  rounded overflow-hidden shadow-lg">
          <div className="p-2 font-bold text-white bg-yellow-500">
            {row.judul}
          </div>
          <div className="flex justify-between items-center px-6">
            <div className="py-4">
              <div className="text-lg">{row.deskripsi}</div>
              <div className="text-gray-500">{row.nama_mapel}</div>
            </div>

            <Link
              to={row.file}
              target="_blank"
              className="no-underline  px-3 py-1 text-sm font-semibold text-gray-700 cursor-pointer"
            >
              <FiExternalLink className="text-xl" />
            </Link>
          </div>
        </div>
      ))}
    </Layout>
  );
}

const TabPanel = ({ children, value, index }) => {
  return (
    <div className={`${value !== index ? "hidden" : ""}`}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
};
