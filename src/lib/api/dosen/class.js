import instance from "../instance";

const subjectList = () => instance.auth.get("/dosen/mapel");
const subjectDetail = (id) => instance.auth.get(`/dosen/mapel/${id}`);

const listMateri = () => instance.auth.get(`/dosen/materi`);
const uploadMateri = (data) => instance.auth.post(`/dosen/materi/upload`, data);
const materiDelete = (id) => instance.auth.delete(`/dosen/materi/${id}`);

const storeTugas = (data) => instance.auth.post('/dosen/tugas', data)
const editTugas = (id, data) => instance.auth.put(`/dosen/tugas/${id}`, data)

const apiDosenClass = {
  listMateri,
  subjectList,
  subjectDetail,
  uploadMateri,
  materiDelete,
  storeTugas,
  editTugas
};

export default apiDosenClass;
