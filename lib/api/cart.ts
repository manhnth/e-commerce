import axios from "axios";
import { fetcherWithToken } from "./axiosApi";

export const getCartItems = async () => {
  const res = await axios.get("cart");

  return res.data;
};

export const setCartItems = async () => {
  const res = await axios.post("cart", {});

  return res.data;
};

export const fetchCart = async (url: string) => {
  return await fetcherWithToken
    .get(url)
    .then((res) => res.data)
    .catch((err) => null);
};
