import { useEffect, useState } from "react";
import { Layout } from "../Layout/Layout";
import apiDosenProfil from "../../../lib/api/dosen/profil";
import apiDosenClass from "../../../lib/api/dosen/class";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";

export function DashboardDosenPage() {
  const [user, setUser] = useState({});
  const [mapel, setMapel] = useState([]);

  useEffect(() => {
    const getData = async () => {
      await apiDosenProfil.info().then((res) => setUser(res.data.data));
      await apiDosenClass.subjectList().then((res) => setMapel(res.data.data));
    };
    getData();
  }, []);

  return (
    <Layout>
      <div class="relative bg-gradient-to-r from-yellow-200 to-yellow-400 text-yellow-800 shadow-lg rounded-lg p-6">
        <h6 class="text-2xl font-semibold mb-3"> Selamat Datang {user.nama}</h6>
      </div>
      <Grid container columnSpacing={2} rowSpacing={2} className="mt-2">
        {mapel.map((row) => (
          <Grid item xl={2} lg={3} md={4} sm={6} xs={12}>
            <div class="max-w-sm rounded overflow-hidden shadow-lg">
              <div className="p-2 text-center font-bold text-white bg-yellow-500">
                {row.nama_mapel} ({row.sks} SKS)
              </div>
              <Link to={`/lecturer/class/${row.id}`}>
              <div class="px-6 py-3 hover:bg-gray-50 cursor-pointer">
                <div>{row.teacher_name}</div>
                <div className="bg-gray-100  p-2 rounded">
                  {" "}
                  <div class="text-gray-700 text-base">
                    {row.day} | {row.start_time.toString()} -{" "}
                    {row.end_time.toString()}
                  </div>
                  <div class="text-gray-700 text-base">{row.room}</div>
                  <div class="text-gray-700 text-base">{row.class_name}</div>
                </div>
              </div>
              </Link>
            </div>
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
}
