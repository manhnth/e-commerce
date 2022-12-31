import { Form, Formik } from "formik";
import React from "react";
import { register } from "../../lib/api/auth";
import Input from "../ui/Input";
import * as Yup from "yup";
import { Button } from "@components/ui/Button/Button";
import { useUI } from "@components/ui/context";
import { useShopping } from "lib/contexts/ShoppingContext";
import MainLogo from "../../assets/logo.png";

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

const SignupView: React.FC = () => {
  const { closeModal } = useUI();
  const { setIsUser } = useShopping();
  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SignupSchema}
      onSubmit={async (values, actions) => {
        const res = await register(values);
        actions.setSubmitting(false);
        console.log(res);

        if (res.error) {
          actions.setErrors({
            email: res.message,
          });
        }
        if (res.status === 201) {
          closeModal();

          setIsUser(true);
        }
      }}
    >
      <Form className="flex w-80 flex-col justify-between">
        <img src={MainLogo.src} alt="farmacity" className="mx-auto w-40 pb-6" />
        <span className="mx-auto block pb-6 text-2xl">Đăng ký</span>
        <Input type="name" name="name" placeholder="tên khách hàng" />
        <Input type="email" name="email" placeholder="email" />
        <Input type="password" name="password" placeholder="mật khẩu" />
        <span className="flex justify-center pt-6">
          <Button type="submit">Đăng ký ngay</Button>
        </span>
      </Form>
    </Formik>
  );
};

export default SignupView;
