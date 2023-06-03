import { useEffect, useState } from "react";
import { Layout } from "../Layout/Layout";
import apiMahasiswaProfil from "../../../lib/api/mahasiswa/profil";
import { Grid } from "@mui/material";
import apiMahasiswaClass from "../../../lib/api/mahasiswa/class";

export function DashboardStudent() {
  const [user, setUser] = useState({});
  const [mapel, setMapel] = useState([]);

  useEffect(() => {
    const getData = async () => {
      await apiMahasiswaProfil.info().then((res) => setUser(res.data.data));
      await apiMahasiswaClass.subjectList().then((res) => setMapel(res.data.data));
    };
    getData();
  }, []);

  return (
    <Layout>
      <div class="relative bg-gradient-to-r from-cyan-200 to-cyan-400 text-cyan-800 shadow-lg rounded-lg p-6">
        <h6 class="text-2xl font-semibold mb-3"> Selamat Datang {user.nama}</h6>
      </div>
      <Grid container columnSpacing={2} rowSpacing={2} className="mt-2">
        {mapel.map((row) => (
          <Grid item xl={2} lg={3} md={4} sm={6} xs={12}>
            <div class="max-w-sm rounded overflow-hidden shadow-lg">
              <div className="p-2 text-center font-bold text-white bg-cyan-500">
                {row.nama_mapel} ({row.sks} SKS)
              </div>
              <div class="px-6 py-3">
                <div className="bg-gray-50 p-2 rounded">
                  {" "}
                  <div class="text-gray-700 text-base">
                    {row.day} | {row.start_time.toString()} -{" "}
                    {row.end_time.toString()}
                  </div>
                  <div class="text-gray-700 text-base">{row.room}</div>
                  <div class="text-gray-700 text-base">{row.class_name}</div>
                </div>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
}
