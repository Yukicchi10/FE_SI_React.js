import instance from "../instance";

const subjectList = () => instance.auth.get("/mahasiswa/mapel");
const subjectDetail = (id) => instance.auth.get(`/mahasiswa/mapel/${id}`);

const listMateri = () => instance.auth.get(`/mahasiswa/materi`);
const listTugas = () => instance.auth.get(`/mahasiswa/tugas`);

const apiMahasiswaClass = {
  subjectList,
  subjectDetail,
  listMateri,
  listTugas
};

export default apiMahasiswaClass;
