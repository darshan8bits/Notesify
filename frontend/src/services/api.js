import axios from "axios";

const API = axios.create({
  baseURL: "https://notesify-2.onrender.com/api",
});

// attach token (NO Bearer)
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = token;
  }

  return req;
});

export default API;