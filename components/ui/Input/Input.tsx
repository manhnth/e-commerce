import React, { InputHTMLAttributes } from "react";
import { useField } from "formik";
import s from "./Input.module.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

const Input: React.FC<InputProps> = (props) => {
  const [field, { error, touched }] = useField(props);

  return (
    <>
      <div className="pt-4">
        <input
          className={s.input}
          type={props.name}
          placeholder={props.placeholder}
          {...props}
          {...field}
        />
      </div>
      {error && touched ? (
        <div className="mt-2 text-pink-600 text-sm">{error}</div>
      ) : null}
    </>
  );
};

export default Input;
