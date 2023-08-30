import axios from "axios";

const BASE_URL = "http://localhost:8000/api/v1/auth/";
const BASE_URL2 = "http://localhost:8000/api/v1/admin/";


export const AdminRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
    // ContentType: "application/json",
    // AcceptLanguage: "de",
  },
});
export const publicRequest = axios.create({
  baseURL: BASE_URL2
});

