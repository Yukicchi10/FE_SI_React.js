import axios from "axios";
import baseUrl from "../config";

const api = baseUrl + "/api";
const pathImg = baseUrl + "/storage/images/";

const noAuth = axios.create({
  baseURL: api,
  "Access-Control-Allow-Origin": "*",
  withCredentials: true,
});

const auth = axios.create({
  baseURL: api,
  headers: {
    Content_Type: "application/json",
    authorization: "Bearer " + localStorage.getItem("token"),
  },
});

const authwithFile = axios.create({
  baseURL: api,
  headers: {
    Content_Type: "multipart/form-data",
    authorization: "Bearer " + localStorage.getItem("token"),
  },
});

const instance = {
  noAuth,
  auth,
  authwithFile,
  pathImg,
};

export default instance;
