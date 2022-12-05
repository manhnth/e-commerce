import { Form, Formik } from "formik";
import React from "react";
import { register } from "../../services/auth";
import Input from "../ui/Input";
import * as Yup from "yup";
import { Button } from "@components/ui/Button/Button";

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

        if (res.error) {
          actions.setErrors({
            email: res.message,
          });
        }
        actions.setSubmitting(false);
      }}
    >
      <Form className="w-80 flex flex-col justify-between">
        <span className="block mx-auto text-2xl pb-6">Dang ky</span>
        <Input type="name" label="name" name="name" placeholder="name" />
        <Input type="email" label="email" name="email" placeholder="email" />
        <Input
          type="password"
          label="password"
          name="password"
          placeholder="***********"
        />
        <Button type="submit" className="pb-4">
          Dang Ky
        </Button>
      </Form>
    </Formik>
  );
};

export default SignupView;
