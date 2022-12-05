import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import s from './Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
 children: ReactNode, 
}

export const Button: React.FC<ButtonProps> = (props) => {
  const {children} = props;
    return (
      <button
      className={s.root}
      {...props}
      >
        {children}
      </button>
    );
}