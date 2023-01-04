import { Order } from "@components/icons";
import { fetchWithToken } from "lib/api/cart";
import { useShopping } from "lib/contexts/ShoppingContext";
import { formatCurrency } from "lib/utils";
import Link from "next/link";
import React, { useEffect } from "react";
import useSwr, { useSWRConfig } from "swr";

interface indexProps {}

const Index: React.FC<indexProps> = ({}) => {
  const { isUser } = useShopping();
  const { data, isLoading, error } = useSwr(
    isUser ? "orders/myOrders" : null,
    fetchWithToken
  );

  if (isLoading) return <div>is loading</div>;

  if (error) return <div>error</div>;

  return (
    <div className="mx-auto mt-8 max-w-2xl">
      <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="py-3 px-6">
              Mã đơn hàng
            </th>
            <th scope="col" className="py-3 px-6">
              Tổng hóa đơn
            </th>
            <th scope="col" className="py-3 px-6">
              Trạng thái
            </th>
          </tr>
        </thead>
        {data &&
          data.map((o: any, i: any) => (
            <tbody key={i}>
              <tr className="border-b bg-white">
                <td className="flex items-center py-4 px-6">
                  <Order />
                  <Link href={`/order/detail/${o.id}`}>
                    <span>{`Đơn hàng ${o.id}`}</span>
                  </Link>
                </td>
                <td className="py-4 px-6">{formatCurrency(o.total)}</td>
                <td className="py-4 px-6">
                  {o.status ? (
                    "Đã thanh toán"
                  ) : (
                    <Link
                      className="font-bold text-blue-500"
                      href={`/checkout/${o.id}`}
                    >
                      Chờ thanh toán
                    </Link>
                  )}
                </td>
              </tr>
            </tbody>
          ))}
      </table>
    </div>
  );
};

export default Index;
