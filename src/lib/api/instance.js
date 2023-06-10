import axios from "axios";
import baseUrl from "../config";

const api = baseUrl + "/api";

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

const instance = {
  noAuth,
  auth,
};

export default instance;
