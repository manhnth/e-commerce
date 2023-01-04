import { useShopping } from "lib/contexts/ShoppingContext";
import { useRouter } from "next/router";
import React, { useState } from "react";

interface OrderFormProps {}

export const OrderForm: React.FC<OrderFormProps> = ({}) => {
  const { createOrder } = useShopping();
  const router = useRouter();
  const [createOrderProps, setCreateOrderProps] = useState({
    fullName: "",
    city: "",
    street: "",
    place: "",
    telephone: 0,
  });

  const handleChange = (e: any) => {
    setCreateOrderProps({
      ...createOrderProps,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await createOrder({ ...createOrderProps });

    router.push("/order");
  };

  return (
    <div className="w-6/12">
      <span className="inline-block pb-6 text-xl">Thông tin đơn hàng</span>
      <form action="">
        <div>
          <input
            onChange={(e) => handleChange(e)}
            type="text"
            name="fullName"
            placeholder="tên khách hàng"
            required
          />
        </div>
        <div className="flex justify-between gap-1">
          <input
            onChange={(e) => handleChange(e)}
            type="text"
            name="city"
            placeholder="thành phố"
            required
          />
          <input
            onChange={(e) => handleChange(e)}
            type="text"
            name="street"
            placeholder="quận"
            required
          />
        </div>
        <div></div>
        <div>
          <input
            onChange={(e) => handleChange(e)}
            type="text"
            name="place"
            placeholder="địa chỉ cụ thể"
            required
          />
        </div>
        <div className="pb-12">
          <input
            onChange={(e) => handleChange(e)}
            type="tel"
            name="telephone"
            placeholder="số điện thoại"
            maxLength={10}
            required
          />
        </div>
        <button
          onClick={(e) => handleSubmit(e)}
          className="w-full rounded-md bg-blue-500 px-2 py-3 text-white hover:bg-blue-600"
        >
          Tạo đơn hàng
        </button>
      </form>
      <style jsx>
        {`
          input {
            // display: inline-block;
            border: 1px solid #ccc;
            border-style: solid;
            border-color: #d1d5db;
            border-radius: 2px;
            margin-bottom: 12px;
            padding: 4px;
            padding-left: 8px;
            width: 100%;
          }
        `}
      </style>
    </div>
  );
};
