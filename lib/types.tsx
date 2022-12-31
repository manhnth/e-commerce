export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  imgUrl: string;
  inventory: number;
}

export interface AddToCartProps {
  productId: number;
  quantity: number;
}
