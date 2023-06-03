import instance from "../instance";

const info = () => instance.auth.get(`/auth/me`);

const apiMahasiswaProfil = { info };

export default apiMahasiswaProfil;
