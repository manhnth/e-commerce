import { Bag, Identity, Logout } from "@components/icons";
import { useUI } from "@components/ui/context";
import { logout } from "lib/api/auth";
import { useShopping } from "lib/contexts/ShoppingContext";
import { useUser } from "lib/hooks/useUser";
import React from "react";

interface UserNavProps {}

export const UserNav: React.FC<UserNavProps> = ({}) => {
  const { openModal, setModalView, openSidebar, setSidebarView } = useUI();
  const { cartData } = useShopping();
  const { isUser, setIsUser } = useShopping();

  const handleClickAuth = () => {
    setModalView("LOGIN_VIEW");
    openModal();
  };

  const handleClickLogout = async () => {
    await logout();
    setIsUser(false);
  };

  const handleClickCart = () => {
    setSidebarView("CART_VIEW");
    openSidebar();
  };

  return (
    <div className="flex gap-2">
      <div onClick={handleClickCart} className="relative w-fit cursor-pointer">
        <Bag />
        <div className="bot-0 absolute left-0 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full bg-blue-500 p-0 text-white">
          {cartData?.quantity || "0"}
        </div>
      </div>
      {isUser ? (
        <div onClick={handleClickLogout} className="cursor-pointer">
          <Logout />
        </div>
      ) : (
        <div onClick={handleClickAuth} className="cursor-pointer">
          <Identity />
        </div>
      )}
    </div>
  );
};
