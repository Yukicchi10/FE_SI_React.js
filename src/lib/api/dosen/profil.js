import instance from "../instance";

const info = () => instance.auth.get(`/auth/lecturer/me`);

const apiDosenProfil = { info };

export default apiDosenProfil;
