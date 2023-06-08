import { useEffect, useState } from "react";
import { Layout } from "../Layout/Layout";
import apiMahasiswaProfil from "../../../lib/api/mahasiswa/profil";
import { Grid } from "@mui/material";
import apiMahasiswaClass from "../../../lib/api/mahasiswa/class";
import { Link } from "react-router-dom";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { BiTime } from "react-icons/bi";
import { FaChalkboardTeacher } from "react-icons/fa";

export function DashboardStudent() {
  const [user, setUser] = useState({});
  const [mapel, setMapel] = useState([]);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const currentHour = new Date().getHours();

    if (currentHour >= 4 && currentHour < 12) {
      setGreeting('Selamat Pagi');
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreeting('Selamat Siang');
    } else if (currentHour >= 18 && currentHour < 20) {
      setGreeting('Selamat Sore');
    } else {
      setGreeting('Selamat Malam');
    }
  }, []);

  useEffect(() => {
    const getData = async () => {
      await apiMahasiswaProfil.info().then((res) => setUser(res.data.data));
      await apiMahasiswaClass
        .subjectList()
        .then((res) => setMapel(res.data.data));
    };
    getData();
  }, []);

  const handleLink = (id) => {
    window.location.href = "/class/" + id;
  };

  return (
    <Layout>
      <div className="bg-gradient-to-r from-cyan-200 to-cyan-400 text-cyan-800 shadow-lg rounded-lg p-6">
        <h6 className="text-2xl font-semibold mb-3">
          {" "}
          {greeting} {user.nama}
        </h6>
      </div>
      <div className="mt-4">
        {mapel.map((row) => (
          <div className="mt-2  rounded overflow-hidden shadow-lg">
            <div className="p-2 text-center font-bold text-white bg-cyan-500">
              {row.nama_mapel} ({row.sks} SKS)
            </div>
            <div className="p-4">
              <div className="flex gap-2 items-center">
                <FaChalkboardTeacher />{" "}
                <div className="text-gray-700 text-base ">
                  {row.teacher_name}
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <HiOutlineBuildingOffice2 />{" "}
                <div className="text-gray-700 text-base ">{row.room}</div>
              </div>
              <div className="flex gap-2 items-center mb-2">
                <BiTime />{" "}
                <div className="text-gray-700 text-base ">
                  {" "}
                  {row.day} | {row.start_time.toString()} -{" "}
                  {row.end_time.toString()}
                </div>
              </div>{" "}
              <Link
                to={`/kelas/${row.id}`}
                className="cursor-pointer no-underline !mt-8 w-12 bg-blue-600 text-white px-4 py-2 rounded"
              >
                Buka
              </Link>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
