import axios from "axios";
import {  setCookieToken } from '../../cookie/cookie';


export const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Content-type": "application/json; charset=UTF-8",
    accept: "application/json,",
  },
  withCredentials: true,
});

api.interceptors.response.use(
  function (response) {
    return response;
  },
  async (error) => {
    const {
      config,
      response: { status },
    } = error;
    if (status === 401) {
      if (error.response.data.message === "Expire") {
        const originalRequest = config;
        const refreshToken = await localStorage.getItem("refreshToken");

        // token refresh요청
        const { data } = await axios.post(
          `${process.env.REACT_APP_BASE_URL}user/auth/reissue`,
          { refreshToken: `${refreshToken}` },
          { headers: {} }
        );

        // refreshToken을 통해 새로운 accessToken 토큰 저장
        const newAccessToken = data.accessToken;
        await setCookieToken("accessToken", newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axios(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);
