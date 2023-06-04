import instance from "../instance";

const subjectList = () => instance.auth.get('/dosen/mapel')
const subjectDetail = (id) => instance.auth.get(`/dosen/mapel/${id}`)

const uploadMateri = (data) => instance.auth.post(`/dosen/materi/upload`, data)
const materiDelete = (id) => instance.auth.delete(`/dosen/materi/${id}`)

const apiDosenClass={
    subjectList,
    subjectDetail,
    uploadMateri,
    materiDelete
}

export default apiDosenClass