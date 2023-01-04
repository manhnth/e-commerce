import axios from "axios";
import { getAccessToken } from "./TokenStore";

export const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export const axiosWithToken = axios.create();

axiosWithToken.interceptors.request.use(
  async (config) => {
    if (config.url === "auth/login" || config.url === "auth/register")
      return config;

    const access_token = getAccessToken();

    config.headers = {
      Authorization: `Bearer ${access_token}`,
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    };

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
