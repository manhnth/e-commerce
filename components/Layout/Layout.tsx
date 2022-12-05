import dynamic from 'next/dynamic';
import s from './Layout.module.css';
import React, { ReactNode } from 'react';
import { useUI } from '@components/ui/context';
import {SignupView, LoginView, ForgotView} from '@components/auth/';

interface LayoutProps {
  children?: ReactNode
}

// const LoginView = dynamic(() => import('@components/auth/LoginView'))

const Modal = dynamic(() => import('@components/ui/Modal'))

const ModalView: React.FC<{ modalView: string; closeModal(): any }> = ({
  modalView,
  closeModal,
}) => {
  return (
    <Modal onClose={closeModal}>
      {modalView === 'LOGIN_VIEW' && <LoginView />}
      {modalView === 'SIGNUP_VIEW' && <SignupView />}
      {modalView === 'FORGOT_VIEW' && <ForgotView />}
    </Modal>
  )
}

const ModalUI: React.FC = () => {
  const { displayModal, closeModal, modalView } = useUI();

  return displayModal ? (
    <ModalView closeModal={closeModal} modalView={modalView} />
  ) : null
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={s.root}>
      <main className='fit'>{children}</main>
      <ModalUI />
    </div>
  );
}

export default Layout