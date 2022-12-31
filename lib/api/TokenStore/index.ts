import axios from "axios";

let access_token = "";

export const setAccessToken = (accessToken: string) => {
  access_token = accessToken;
};

export const getAccessToken = () => {
  return access_token;
};
