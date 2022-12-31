import { formatCurrency } from "lib/utils";
import { useAddItem } from "lib/hooks/useAddItem";
import React from "react";
import { useShopping } from "lib/contexts/ShoppingContext";
import { Minus, Plus } from "@components/icons";
import { useRouter } from "next/router";
import { useUI } from "@components/ui/context";

interface ProductSideBarProps {
  id: number;
  name: string;
  price: number;
  description: string;
  inventory: number;
}

export const ProductSideBar: React.FC<ProductSideBarProps> = ({
  id,
  name,
  price,
  description,
  inventory,
}) => {
  const { quantity, updateQuantity } = useAddItem();
  const { addItemToCart, cartData, isMutating } = useShopping();
  const router = useRouter();
  const { openModal } = useUI();

  const changeQuantity = (e: any, action: string) => {
    e.preventDefault();

    // cant increase quantity greater than product stock
    updateQuantity(action, inventory);
  };

  const handleAddToCart = async () => {
    const res = await addItemToCart({ productId: id, quantity });
    if (!res || res.status !== 201) openModal();
  };

  return (
    <div>
      <div className="flex-col">
        <div className="border-b-2 border-gray-300 pt-4 pb-6 md:h-2/3 md:py-0">
          <h3 className="font-bold md:text-2xl lg:text-xl">{name}</h3>
          <span className="block py-4 text-2xl text-green-500">
            {formatCurrency(price)}
          </span>
          <p className="block max-w-lg text-gray-500">{description}</p>
          <div className="flex"></div>
        </div>
        <div className="mt-8 h-1/3">
          <div className="mb-6 flex w-fit items-center justify-center gap-4">
            <div
              onClick={(e) => changeQuantity(e, "dec")}
              className="cursor-pointer rounded-full border border-gray-400"
            >
              <Minus />
            </div>
            <div className="font-bold">{quantity}</div>
            <div
              onClick={(e) => changeQuantity(e, "inc")}
              className="cursor-pointer rounded-full border border-gray-400"
            >
              <Plus />
            </div>
          </div>
          <button
            onClick={handleAddToCart}
            disabled={isMutating}
            className="text-md inline-block rounded-md bg-blue-500 py-2 px-3 text-white hover:bg-blue-700 hover:shadow-md"
          >
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>
    </div>
  );
};
