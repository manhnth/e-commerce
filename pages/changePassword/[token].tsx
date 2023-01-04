import { Button } from "@components/ui/Button/Button";
import Input from "@components/ui/Input";
import axios from "axios";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";

interface ChangePasswordProps {}

export const ChangePassword: React.FC<ChangePasswordProps> = ({}) => {
  const router = useRouter();
  const { token } = router.query;
  const initialValues = {
    password: "",
  };
  return (
    <div className="flex h-screen w-full items-center justify-center p-3 shadow-md">
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, actions) => {
          const res = await axios.post("auth/changePassword", {
            token: token,
            newPassword: values.password,
          });
          actions.setSubmitting(false);
        }}
      >
        <Form className="mb-44 flex w-80 flex-col">
          {/* <img src={MainLogo.src} alt="farmacity" className="mx-auto w-40 pb-6" /> */}
          <span className="mx-auto block pb-6 text-center font-bold">
            Mật khẩu mới
          </span>
          <Input
            type="password"
            name="password"
            placeholder="nhập mật khẩu mới"
          />
          <span className="flex justify-center py-2">
            <Button type="submit">Xác nhận</Button>
          </span>
        </Form>
      </Formik>
    </div>
  );
};

export default ChangePassword;
