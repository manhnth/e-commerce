import cn from "clsx";
import Link from "next/link";
import { FC } from "react";
import s from "./CartSidebarView.module.css";
import { useUI } from "@components/ui/context";
import { Bag } from "@components/icons";
import SidebarLayout from "@components/common/SidebarLayout";
import { Button } from "@components/ui/Button/Button";
import { CartItem } from "../CartItem/CartItem";
import { loadGetInitialProps } from "next/dist/shared/lib/utils";
import { useShopping } from "lib/contexts/ShoppingContext";
import { calculateSubtotal, formatCurrency } from "lib/utils";

const CartSidebarView: FC = () => {
  const { closeSidebar, setSidebarView } = useUI();
  const { cartData, isLoading, isEmpty, error } = useShopping();

  const handleClose = () => closeSidebar();

  return (
    <SidebarLayout handleClose={handleClose}>
      {!cartData ||
        (!cartData.items[0] && (
          <div className="flex flex-1 flex-col items-center justify-center px-4">
            <span className="flex h-16 w-16 items-center justify-center rounded-full border border-dashed border-blue-500 bg-gray-500 p-12 text-white">
              <Bag className="absolute" />
            </span>
            <h2 className="pt-6 text-center text-2xl font-bold tracking-wide">
              Your cart is empty
            </h2>
            <p className="text-accent-3 px-10 pt-2 text-center">
              Biscuit oat cake wafer icing ice cream tiramisu pudding cupcake.
            </p>
          </div>
        ))}
      {error && (
        <div className="flex flex-1 flex-col items-center justify-center px-4">
          <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white"></span>
          <h2 className="pt-6 text-center text-xl font-light">
            We couldn’t process the purchase. Please check your card information
            and try again.
          </h2>
        </div>
      )}
      {cartData && cartData.items[0] && (
        <div className="flex flex-1 flex-col">
          <div className="flex-1 px-4 sm:px-6">
            <Link href="/cart">
              <span>My Cart</span>
            </Link>
            <ul className={s.lineItemsList}>
              {cartData &&
                cartData!.items.map((item: any, i: any) => (
                  <CartItem
                    cartItemId={item.id}
                    quantity={item.quantity}
                    key={item.product.id}
                    name={item.product.name}
                    id={item.product.id}
                    imgUrl={item.product.imgUrl}
                    price={item.product.price}
                  />
                ))}
            </ul>
          </div>
          <div className="sticky bottom-0 right-0 left-0 z-20 w-full flex-shrink-0 px-6 py-6 text-sm sm:px-6">
            {/* <ul className="pb-2">
              <li className="flex justify-between py-1">
                <span>Subtotal</span>
                <span>{subTotal}</span>
              </li>
              <li className="flex justify-between py-1">
                <span>Taxes</span>
                <span>Calculated at checkout</span>
              </li>
            </ul> */}
            <div className="border-accent-2 mb-2 flex justify-between border-t py-3 font-bold">
              <span>Tổng tạm tính</span>
              <span>{formatCurrency(calculateSubtotal(cartData.items))}</span>
            </div>
            <div>
              <Link
                href={"/order/create"}
                onClick={handleClose}
                className="flex justify-center bg-blue-500 py-2 font-bold text-white hover:bg-blue-700"
              >
                Tạo đơn hàng
              </Link>
            </div>
          </div>
        </div>
      )}
    </SidebarLayout>
  );
};

export default CartSidebarView;
