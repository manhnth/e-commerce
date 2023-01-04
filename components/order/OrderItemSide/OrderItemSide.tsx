import { useShopping } from "lib/contexts/ShoppingContext";
import { calculateSubtotal, formatCurrency } from "lib/utils";
import React from "react";

interface OrderItemSideProps {}

export const OrderItemSide: React.FC<OrderItemSideProps> = ({}) => {
  const { cartData } = useShopping();
  return (
    <>
      {cartData && (
        <div className="max-w-2xl">
          {cartData.items.map((item: any) => (
            <div key={item.id}>
              <div className="flex">
                <div className="rounded-md border border-gray-200">
                  <img src={item.product.imgUrl} alt="" width={"72px"} />
                </div>
                <div className="pl-4">
                  <span>{item.product.name}</span>
                  <p>x{item.quantity}</p>
                  <span>{formatCurrency(item.product.price)}</span>
                </div>
              </div>
              <div className="pt-12 pl-4">
                <span className="pr-6 font-bold">Tổng đơn hàng:</span>
                <span>{formatCurrency(calculateSubtotal(cartData.items))}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
