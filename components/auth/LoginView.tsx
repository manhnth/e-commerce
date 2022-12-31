import { Button } from "@components/ui/Button/Button";
import { useUI } from "@components/ui/context";
import { Form, Formik } from "formik";
import React from "react";
import { login } from "../../lib/api/auth";
import Input from "../ui/Input";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { useShopping } from "lib/contexts/ShoppingContext";
import MainLogo from "../../assets/logo.png";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

const LoginView: React.FC = () => {
  const { setModalView, closeModal } = useUI();
  const { setIsUser } = useShopping();
  const router = useRouter();

  const initialValues = {
    email: "",
    password: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values, actions) => {
        const res = await login(values);
        actions.setSubmitting(false);

        if (res.statusCode === 401) {
          actions.setErrors({
            email: res.message,
            password: res.message,
          });
        }

        if (res.status === 201) {
          closeModal();
          setIsUser(true);
          router.push("/");
        }
      }}
      validationSchema={LoginSchema}
    >
      <Form className="flex w-80 flex-col justify-center">
        <img src={MainLogo.src} alt="farmacity" className="mx-auto w-40 pb-6" />
        <span className="mx-auto block pb-6 text-2xl">Đăng nhập</span>
        <Input type="email" name="email" placeholder="email" />
        <Input type="password" name="password" placeholder="mật khẩu" />
        <div className="mt-6 mb-3 flex items-center justify-between">
          <Button type="submit">Đăng nhập</Button>
          <a
            className="inline-block align-baseline text-sm font-bold text-blue-500 hover:text-blue-700"
            onClick={() => setModalView("FORGOT_VIEW")}
          >
            Quên mật khẩu?
          </a>
        </div>
        <div
          onClick={() => setModalView("SIGNUP_VIEW")}
          className="mt-4 cursor-pointer font-bold text-green-500"
        >
          Đăng ký tài khoản mới!
        </div>
      </Form>
    </Formik>
  );
};

export default LoginView;
