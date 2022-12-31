import React, { ReactNode } from "react";
import s from "./Modal.module.css";
import { AiOutlineClose } from "react-icons/ai";

interface ModalProps {
  children?: ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  return (
    <div className={s.root}>
      <div className={s.modal}>
        <button className={s.close} onClick={() => onClose()}>
          <AiOutlineClose />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
