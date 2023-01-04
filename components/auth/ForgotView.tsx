import { Form, Formik } from "formik";
import React from "react";
import Input from "../ui/Input";
import * as Yup from "yup";
import { Button } from "@components/ui/Button/Button";
import { useUI } from "@components/ui/context";
import { useShopping } from "lib/contexts/ShoppingContext";
import MainLogo from "../../assets/logo.png";
import axios from "axios";

const ForgotSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
});

const ForgotView: React.FC = () => {
  const initialValues = {
    email: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={ForgotSchema}
      onSubmit={async (values, actions) => {
        const res = await axios.post("auth/forgotPassword", values);
        actions.setSubmitting(false);
      }}
    >
      <Form className="flex w-80 flex-col justify-between">
        {/* <img src={MainLogo.src} alt="farmacity" className="mx-auto w-40 pb-6" /> */}
        <span className="mx-auto block pb-6 text-center">
          Xác nhận email và check reset link trong hộp thư
        </span>
        <Input type="email" name="email" placeholder="email đăng ký" />
        <span className="flex justify-center pt-6">
          <Button type="submit">Xác nhận</Button>
        </span>
      </Form>
    </Formik>
  );
};

export default ForgotView;
