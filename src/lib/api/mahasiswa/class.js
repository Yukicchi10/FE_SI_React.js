import instance from "../instance";

const subjectList = () => instance.auth.get("/mahasiswa/mapel");
const subjectDetail = (id) => instance.auth.get(`/mahasiswa/mapel/${id}`);

const listMateri = () => instance.auth.get(`/mahasiswa/materi`);
const listTugas = () => instance.auth.get(`/mahasiswa/tugas`);
const detailTugas = (id) => instance.auth.get(`/mahasiswa/tugas/${id}`);
const uploadTugas = (data) =>
  instance.auth.post(`/mahasiswa/tugas/upload`, data);

const calendar = () => instance.auth.get("/mahasiswa/calendar");

const createThread = (data) => instance.auth.post(`/mahasiswa/thread`, data)
const listThread = (id) => instance.auth.get(`/mahasiswa/mapel/${id}/thread`);
const likeThread = (data) =>
  instance.auth.post(`/mahasiswa/thread/likes`, data);
const deleteThread = (id) => instance.auth.delete(`/mahasiswa/thread/${id}`)  

const apiMahasiswaClass = {
  subjectList,
  subjectDetail,
  listMateri,
  listTugas,
  detailTugas,
  uploadTugas,
  calendar,
  createThread,
  listThread,
  likeThread,
  deleteThread
};

export default apiMahasiswaClass;
