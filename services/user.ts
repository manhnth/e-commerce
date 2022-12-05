import axios from 'axios'
import { axiosApi } from 'plugins/axios';

export const getUserProfile = async() => {
  const res = await axiosApi.get('auth/profile');

  const data = res.data;
  console.log('profile data',data);
  
}