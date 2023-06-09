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
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const currentHour = new Date().getHours();

    if (currentHour >= 4 && currentHour < 12) {
      setGreeting("Selamat Pagi");
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreeting("Selamat Siang");
    } else if (currentHour >= 18 && currentHour < 20) {
      setGreeting("Selamat Sore");
    } else {
      setGreeting("Selamat Malam");
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
        {" "}
        <Grid container columnSpacing={2} rowSpacing={2} className="mt-2">
          {mapel.map((row) => (
            <Grid item xl={2} lg={3} md={4} sm={6} xs={12}>
              <div className="mt-2 rounded-lg overflow-hidden shadow-lg">
                <img src="/card-1.jpg" className="h-48 w-full object-cover" alt="mapel" />
                <div className="p-2 text-center font-bold ">
                  {row.nama_mapel} ({row.sks} SKS)
                </div>
                <div className="px-4 pb-4">
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
                  <div className="flex justify-center">
                    <Link
                      to={`/kelas/${row.id}`}
                      className="cursor-pointer no-underline text-center !w-full bg-blue-600 text-white px-4 py-2 rounded-lg"
                    >
                      Buka
                    </Link>
                  </div>
                </div>
              </div>
            </Grid>
          ))}
        </Grid>
      </div>
    </Layout>
  );
}
