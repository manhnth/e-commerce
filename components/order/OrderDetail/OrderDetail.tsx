import { axiosWithToken } from "lib/api/axiosApi";
import { fetchWithToken } from "lib/api/cart";
import { formatCurrency } from "lib/utils";
import { useRouter } from "next/router";
import React from "react";
import useSwr from "swr";

interface OrderDetailProps {
  orderId: number;
}

const OrderDetail: React.FC<OrderDetailProps> = ({}) => {
  const router = useRouter();
  const { orderId } = router.query;
  const { data, error, isLoading } = useSwr(
    orderId ? `orders/${orderId}` : null,
    fetchWithToken,
    {}
  );
  return (
    <>
      {(data as any) && (
        <div className="mt-36 h-screen w-full">
          <div className="mx-auto max-w-2xl justify-between border border-gray-300 p-8 lg:flex">
            <div>
              <span className="font-bold">Thông tin giao hàng</span>
              <p>{`Tên khách hàng: ${data.fullName}`}</p>
              <p>{`SĐT: ${data.telephone}`}</p>
              <p>{`Địa chỉ: ${data.place}, ${data.street}, ${data.city}`}</p>
              <p>{`Tổng hóa đơn: ${formatCurrency(data.total)}`}</p>
            </div>
            <div>
              <span className="font-bold">Sản phẩm</span>
              {data.orderItems.map((item: any, i: any) => (
                <div key={i} className="flex gap-4">
                  <p>{item.name}</p>
                  <p>{`x${item.quantity}`}</p>
                </div>
              ))}
            </div>
            <style jsx>{`
              p {
                display: block;
                padding-bottom: 8px;
                padding-top: 12px;
              }
            `}</style>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderDetail;
