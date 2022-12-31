import axios from "axios";

export const getProductsByCategory = async (category: string) => {
  const res = await axios.get(`products/findByCategory?category=${category}`);
  return res.data;
};

export const sortProductsByPrice = (products: any, orderby: string) => {
  return products.sort((a: any, b: any) => {
    if (orderby === "Giá tăng dần") return a.price - b.price;
    if (orderby === "Giá giảm dần") return b.price - a.price;
  });
};
