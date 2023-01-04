import axios from "axios";
import { API_URL } from "constants/env";

axios.defaults.baseURL = "https://farmacity-server-production.up.railway.app";
// API_URL;

axios.defaults.withCredentials = true;

export const axiosApi = axios.create();

// axiosApi.interceptors.request.use(
//   async (config) => {
//     if (config.url === "auth/login" || config.url === "auth/register")
//       return config;

//     const access_token = getAccessToken();

//     config.headers = {
//       Authorization: `Bearer ${access_token}`,
//       Accept: "application/json",
//       "Content-Type": "application/x-www-form-urlencoded",
//     };

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );
