import { axiosWithToken } from "./axiosApi";
import { setAccessToken } from "./TokenStore";
import axios from "axios";

interface LoginParamsType {
  email: string;
  password: string;
}

interface RegisterParamsType {
  name: string;
  email: string;
  password: string;
}

export const login = async (loginParams: LoginParamsType) => {
  try {
    const res = await axios.post("auth/login", loginParams);

    setAccessToken(res.data.access_token);

    return res;
  } catch (error: any) {
    return error.response.data;
  }
};

export const register = async (registerParams: RegisterParamsType) => {
  try {
    const res = await axios.post("auth/signup", registerParams);

    setAccessToken(res.data.access_token);

    return res;
  } catch (error: any) {
    return error.response.data;
  }
};

export const refresh = async () => {
  const res = await axios.get("auth/refresh");

  if (!res) return null;

  setAccessToken(res.data.access_token);

  return res.data.access_token;
};

export const me = async () => {
  const res = await axiosWithToken.get("auth/profile");

  if (!res) return null;

  return res;
};

export const logout = async () => {
  await axios.post("auth/logout");
  setAccessToken("");
};
