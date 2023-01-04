import { Close, Minus, Plus } from "@components/icons";
import { useShopping } from "lib/contexts/ShoppingContext";
import { formatCurrency } from "lib/utils";
import Link from "next/link";
import React from "react";

interface CartItemProps {
  quantity: number;
  id: number;
  name: string;
  imgUrl: string;
  price: number;
  cartItemId: number;
}

export const CartItem: React.FC<CartItemProps> = ({
  name,
  imgUrl,
  price,
  id,
  quantity,
  cartItemId,
}) => {
  const { deleteCartItem, updateCartItemQuantity } = useShopping();

  const handleClickQuantity = async (
    e: any,
    type: string,
    productId: number
  ) => {
    e.preventDefault();
    if (quantity === 1 && type === "dec") {
      await deleteCartItem(cartItemId);
    } else {
      const res = await updateCartItemQuantity(type, cartItemId, productId);
    }
  };

  const handleDelete = async (e: any) => {
    e.preventDefault();
    await deleteCartItem(cartItemId);
  };

  return (
    <li>
      <div className="flex flex-row space-x-4 py-4">
        <div className="relative h-16 w-16 cursor-pointer overflow-hidden bg-violet-50">
          <Link href={`product/${id}`}>
            <img src={imgUrl} alt={name} width="64px" />
          </Link>
        </div>
        <div className="flex flex-1 flex-col text-base">
          <Link href={`/product/${id}`}>{name}</Link>
        </div>
        <div className="flex justify-center text-base">
          {formatCurrency(price)}
        </div>
      </div>
      <div className="flex justify-between gap-1 pb-3">
        <button
          onClick={(e) => handleDelete(e)}
          className="block border border-gray-300"
        >
          <Close />
        </button>
        <div className="block w-full border border-gray-300">
          <span className="inline-block p-1 ">{quantity}</span>
        </div>
        <button
          onClick={(e) => handleClickQuantity(e, "dec", id)}
          className="block border border-gray-300"
        >
          <Minus />
        </button>
        <button
          onClick={(e) => handleClickQuantity(e, "inc", id)}
          className="block border border-gray-300"
        >
          <Plus />
        </button>
      </div>
    </li>
  );
};
