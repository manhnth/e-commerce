import axios from "axios";
import { axiosWithToken } from "./axiosApi";

export const getCartItems = async () => {
  const res = await axios.get("cart");

  return res.data;
};

export const setCartItems = async () => {
  const res = await axios.post("cart", {});

  return res.data;
};

export const fetchWithToken = async (url: string) => {
  return await axiosWithToken
    .get(url)
    .then((res) => res.data)
    .catch((err) => null);
};
