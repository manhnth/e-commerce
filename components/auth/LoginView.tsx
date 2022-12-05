import { Button } from '@components/ui/Button/Button';
import { useUI } from '@components/ui/context';
import { Form, Formik } from 'formik';
import React from 'react'
import { login } from '../../services/auth';
import Input from '../ui/Input';
import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
})

const LoginView: React.FC = () => {
  const { setModalView } = useUI();
  const initialValues = {
    email: '',
    password: ''
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, actions) => {
        // console.log({ values, actions });
        login(values);
        actions.setSubmitting(false);
      }}
      validationSchema={LoginSchema}
    >
      <Form className='w-80 flex flex-col justify-between'>
        <span className='block mx-auto text-2xl pb-6'>Dang nhap</span>
        <Input type='email' label='email' name="email" placeholder="email" />
        <Input type='password' label='password' name="password" placeholder="***********" />
        <div className='flex items-center justify-between mt-6'>
        <Button type='submit'>Dang Nhap</Button>
        <a 
        className='inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-700'
        onClick={()=> setModalView('FORGOT_VIEW')}
        >Quen mat khau</a>
        </div>
        <div  onClick={() => setModalView('SIGNUP_VIEW')} className='cursor-pointer mt-4'>
          Dang ky tai khoan moi
          </div>
      </Form>
    </Formik>
  );
}

export default LoginView 