import instance from "../instance";

const subjectList = () => instance.auth.get("/mahasiswa/mapel");
const subjectDetail = (id) => instance.auth.get(`/mahasiswa/mapel/${id}`);

const apiMahasiswaClass = {
  subjectList,
  subjectDetail,
};

export default apiMahasiswaClass;
