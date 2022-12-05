import axios from 'axios';

let access_token = '';

export const setAccessToken = (accessToken: string) => {
  access_token = accessToken;
}

export const refreshToken = async () => {
  const res = await axios.get('auth/refresh');
  const token = res.data.access_token;
  setAccessToken(token);
}

export const getAccessToken = async() => {
  if(!access_token) {
    await refreshToken();
  }
  return access_token;
}
