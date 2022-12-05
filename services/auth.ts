import { setAccessToken } from './token';
import axios from 'axios';

interface LoginParamsType {
  email: string,
  password: string
}

interface RegisterParamsType {
  name: string,
  email: string,
  password: string
}
export const login = async (loginParams: LoginParamsType) => {
  try {
    const res = await axios.post('auth/login', loginParams);

    setAccessToken(res.data);
  } catch (error) {
    console.log(error);
  }

}

export const register = async (registerParams: RegisterParamsType) => {
  try {
    const res = await axios.post('auth/signup', registerParams);
    setAccessToken(res.data);
  } catch (error: any) {
    return error.response.data
  }
}
