import React from "react";
import { OrderForm } from "../OrderForm/OrderForm";
import { OrderItemSide } from "../OrderItemSide/OrderItemSide";

interface OrderViewProps {}
const CreateOrderView: React.FC<OrderViewProps> = ({}) => {
  return (
    <div className="mx-auto mb-3 grid h-screen justify-center gap-4 lg:flex">
      <div className="order-2 flex w-full justify-center pt-16 pr-8 pb-4 lg:order-none lg:justify-end">
        <OrderForm />
      </div>
      <div className="order-1 h-full w-full border-l-2 border-gray-200 bg-gray-100 pt-16 pl-8">
        <OrderItemSide />
      </div>
    </div>
  );
};

export default CreateOrderView;
