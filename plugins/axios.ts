import { getAccessToken } from './../services/token';
import axios from 'axios';


axios.defaults.baseURL =
  process.env.NODE_ENV === 'production'
    ? ''
    : 'http://localhost:5000';

axios.defaults.withCredentials = true;

export const axiosApi = axios.create();

axiosApi.interceptors.request.use(async (config) => {
  if (config.url === 'auth/login' || config.url === 'auth/register') return config;

  const access_token = await getAccessToken();
console.log('run');

  config.headers = {
    'Authorization': `Bearer ${access_token}`,
    'Accept': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded'
  }

  return config;
}, (error) => {

  return Promise.reject(error);
})
