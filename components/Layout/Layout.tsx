import dynamic from "next/dynamic";
import s from "./Layout.module.css";
import React, { ReactNode } from "react";
import { useUI } from "@components/ui/context";
import { SignupView, LoginView, ForgotView } from "@components/auth/";
import { NavBar } from "@components/common/NavBar/NavBar";
import { LinkProps } from "next/link";
import Sidebar from "@components/ui/Sidebar";
import { NAVBAR_LINKS } from "constants/navbarlinks";
import CartSidebarView from "@components/cart/CartSidebarView";
import { ShoppingProvider } from "lib/contexts/ShoppingContext";
import { Footer } from "@components/common/Footer";

interface LayoutProps {
  children?: ReactNode;
}

// const LoginView = dynamic(() => import('@components/auth/LoginView'))

const Modal = dynamic(() => import("@components/ui/Modal"));

const ModalView: React.FC<{ modalView: string; closeModal(): any }> = ({
  modalView,
  closeModal,
}) => {
  return (
    <Modal onClose={closeModal}>
      {modalView === "LOGIN_VIEW" && <LoginView />}
      {modalView === "SIGNUP_VIEW" && <SignupView />}
      {modalView === "FORGOT_VIEW" && <ForgotView />}
    </Modal>
  );
};

const ModalUI: React.FC = () => {
  const { displayModal, closeModal, modalView } = useUI();

  return displayModal ? (
    <ModalView closeModal={closeModal} modalView={modalView} />
  ) : null;
};

const SidebarView: React.FC<{
  sidebarView: string;
  closeSidebar(): any;
  links: LinkProps[];
}> = ({ sidebarView, closeSidebar, links }) => {
  return (
    <Sidebar onClose={closeSidebar}>
      {sidebarView === "CART_VIEW" && <CartSidebarView />}
      {/* {sidebarView === 'SHIPPING_VIEW' && <ShippingView />}
      {sidebarView === 'PAYMENT_VIEW' && <PaymentMethodView />}
      {sidebarView === 'CHECKOUT_VIEW' && <CheckoutSidebarView />}
      {sidebarView === 'MOBILE_MENU_VIEW' && <MenuSidebarView links={links} />} */}
    </Sidebar>
  );
};

const SidebarUI: React.FC<{ links: LinkProps[] }> = ({ links }) => {
  const { displaySidebar, closeSidebar, sidebarView } = useUI();
  return displaySidebar ? (
    <SidebarView
      links={links}
      sidebarView={sidebarView}
      closeSidebar={closeSidebar}
    />
  ) : null;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navBarLinks = NAVBAR_LINKS.map((c) => ({
    label: c.name,
    href: `${c.slug}`,
  }));
  return (
    <div className={s.root}>
      <ShoppingProvider>
        <NavBar />
        <SidebarUI links={navBarLinks} />
        <main className="fit">{children}</main>
        <ModalUI />
        <Footer />
      </ShoppingProvider>
    </div>
  );
};

export default Layout;
