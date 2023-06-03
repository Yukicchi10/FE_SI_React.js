import instance from "../instance";

const subjectList = () => instance.auth.get('/dosen/mapel')

const apiDosenClass={
    subjectList
}

export default apiDosenClass