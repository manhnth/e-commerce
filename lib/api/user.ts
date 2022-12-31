import axios from "axios";
import { axiosApi } from "plugins/axios";

export const getUser = async () => {
  const res = await axiosApi.get("auth/profile");

  const data = res.data;
};
