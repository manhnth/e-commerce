import { Close } from "@components/icons";
import React, { ReactNode } from "react";
import { UserNav } from "../UserNav";
import s from "./SidebarLayout.module.css";

interface SidebarLayoutProps {
  children?: ReactNode;
  handleClose(): any;
}

const SidebarLayout: React.FC<SidebarLayoutProps> = ({
  children,
  handleClose,
}) => {
  return (
    <div className={s.root}>
      <header className={s.header}>
        <button onClick={handleClose}>
          <span>
            <Close />
          </span>
        </button>
        <UserNav />
      </header>
      <div className={s.container}>{children}</div>
    </div>
  );
};

export default SidebarLayout;
