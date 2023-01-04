import { useUI } from "@components/ui/context";
import { useUser } from "lib/hooks/useUser";
import Link from "next/link";
import React from "react";
import Searchbar from "../Searchbar";
import { UserNav } from "../UserNav";
import MainLogo from "../../../assets/logo.png";
import { useShopping } from "lib/contexts/ShoppingContext";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const { isUser } = useShopping();

  const { openModal, setModalView, openSidebar, setSidebarView } = useUI();
  // const { isEmpty } = useCart();
  const handleClickOrder = () => {
    if (isUser) return;
    setSidebarView("LOGIN_VIEW");
    openModal();
  };
  return (
    <div className="">
      <div className="h-18 flex items-center justify-between border-t-4 border-blue-500 p-4 shadow-md">
        <div className="flex items-center gap-2">
          <Link href="/">
            <img src={MainLogo.src} alt="farmacity" className="w-32" />
          </Link>
          <div className="mx-3 hidden gap-2 lg:flex">
            <Link
              href={"/search"}
              className="text-gray-500 hover:text-blue-600"
            >
              Sản phẩm
            </Link>
            <Link href={"/about"} className="text-gray-500 hover:text-blue-600">
              Giới thiệu
            </Link>
            <Link
              href={isUser ? "/order" : "/"}
              onClick={handleClickOrder}
              className="text-gray-500 hover:text-blue-600"
            >
              Đơn hàng
            </Link>
          </div>
        </div>
        <div className="flex gap-6">
          <div className="hidden lg:flex">
            <Searchbar />
          </div>
          <UserNav />
        </div>
      </div>
      {/* mobile search bar */}
      <div className="flex p-6 py-2 lg:hidden lg:px-6">
        <Searchbar />
      </div>
    </div>
  );
};
