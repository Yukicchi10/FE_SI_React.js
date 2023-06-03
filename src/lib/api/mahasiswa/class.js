import instance from "../instance";

const subjectList = () => instance.auth.get('/mahasiswa/mapel')

const apiMahasiswaClass={
    subjectList
}

export default apiMahasiswaClass