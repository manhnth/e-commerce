import { useUI } from "@components/ui/context";
import { useUser } from "lib/hooks/useUser";
import Link from "next/link";
import React from "react";
import Searchbar from "../Searchbar";
import { UserNav } from "../UserNav";
import MainLogo from "../../../assets/logo.png";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const { isUser, isLoadingUser } = useUser();

  const { openModal, setModalView, openSidebar, setSidebarView } = useUI();
  // const { isEmpty } = useCart();
  const handleClickIdentity = () => {
    setModalView("LOGIN_VIEW");
    openModal();
  };
  const handleClickCart = () => {
    setSidebarView("CART_VIEW");
    openSidebar();
  };
  return (
    <div className="">
      <div className="h-18 flex items-center justify-between border-t-4 border-blue-500 p-4 shadow-md">
        <div>
          <Link href="/">
            <img src={MainLogo.src} alt="farmacity" className="w-32" />
          </Link>
        </div>
        <div className="hidden lg:flex">
          <Searchbar />
        </div>
        <UserNav />
      </div>
      {/* mobile search bar */}
      <div className="flex p-6 py-2 lg:hidden lg:px-6">
        <Searchbar />
      </div>
    </div>
  );
};
