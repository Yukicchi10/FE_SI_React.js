import axios from "axios";

const saveToken = (data) => {
  localStorage.setItem("token", data.access_token);
  localStorage.setItem("role", data.role);
};

const login = async (data, role) => {
  const response = await axios.post("api/auth/login", data);
  if (response.data.access_token) {
    if (response.data.role !== role) {
      return "Access Danied";
    }
    switch (response.data.role) {
      case "admin":
        saveToken(response.data);
        return "/admin/dashboard";
      case "dosen":
        saveToken(response.data);
        return "/dosen/dashboard";
      case "mahasiswa":
        saveToken(response.data);
        return "/dashboard";

      default:
        break;
    }
  }
  return response;
};

const apiAuth = {
  login,
};

export default apiAuth;
