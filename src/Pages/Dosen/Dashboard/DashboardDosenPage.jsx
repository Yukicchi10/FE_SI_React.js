import { useEffect, useState } from "react";
import { Layout } from "../Layout/Layout";
import apiDosenProfil from "../../../lib/api/dosen/profil";
import apiDosenClass from "../../../lib/api/dosen/class";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { BiTime } from "react-icons/bi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";

export function DashboardDosenPage() {
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
      await apiDosenProfil.info().then((res) => setUser(res.data.data));
      await apiDosenClass.subjectList().then((res) => setMapel(res.data.data));
    };
    getData();
  }, []);

  return (
    <Layout>
      <div class="bg-gradient-to-r from-yellow-200 to-yellow-400 text-yellow-800 shadow-lg rounded-lg p-6">
        <h6 class="text-2xl font-semibold mb-3"> {greeting} {user.nama}</h6>
      </div>
      <Grid container columnSpacing={2} rowSpacing={2} className="mt-2">
        {mapel.map((row) => (
          <Grid item xl={2} lg={3} md={4} sm={6} xs={12}>
            <div class="max-w-sm rounded overflow-hidden shadow-lg">
              <div className="p-2 text-center font-bold text-white bg-yellow-500">
                {row.nama_mapel} ({row.sks} SKS)
              </div>
              <div className="p-4 w-full">
                <div className="bg-gray-100 p-2 rounded">
                  <div className="flex  gap-2 items-center">
                  <HiOutlineBuildingOffice2 />{" "}
                  <div className="text-gray-700 text-base ">{row.room}</div>
                </div>
                <div className="flex gap-2 items-center">
                  <BiTime />{" "}
                  <div className="text-gray-700 text-base ">
                    {" "}
                    {row.day} | {row.start_time.toString()} -{" "}
                    {row.end_time.toString()}
                  </div>
                </div>{" "}
                <div className="flex gap-2 items-center">
                  <FaChalkboardTeacher />{" "}
                  <div className="text-gray-700 text-base ">
                    {row.class_name}
                  </div>
                </div>
                </div>
                
                <div className="flex w-full">
                  <Link
                    to={`/dosen/class/${row.id}`}
                    className="cursor-pointer w-full no-underline mt-2 text-center bg-yellow-600 text-white px-4 py-1 rounded"
                  >
                    Buka
                  </Link>
                </div>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
}
