import axios from "axios";
import { getCookieToken, setCookieToken } from '../../cookie/cookie';


export const api = axios.create({
  // baseURL: `${process.env.REACT_APP_BASE_URL}`,
  baseURL: "http://58.231.19.218:8000",
  headers: {
    "Content-type": "application/json; charset=UTF-8",
    accept: "application/json,",
  },
});

export const cookieApi = axios.create({
  baseURL: "http://58.231.19.218:8000",
  headers: {
    "Content-type": "application/json; charset=UTF-8",
    accept: "application/json,",
    Authorization: `Bearer ${getCookieToken("accessToken")}`,
  },
  ithCredentials: true,
});

axios.interceptors.request.use(
  async (config) => {
    const accessToken = getCookieToken("accessToken");

    if (accessToken?.accessToken) {
      config.headers = {
        ...config.headers,
        authorization: `Bearer ${accessToken?.accessToken}`,
      };
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  function (response) {
    console.log("get response", response);
    return response;
  },
  async (error) => {
    const {
      config,
      response: { status },
    } = error;
    if (status === 401) {
      // if (error.response.data.message === "expire") {
        const originalRequest = config;
        const refreshToken = await localStorage.getItem("refreshToken");
        console.log(refreshToken);
        // token refresh요청
        const { data } = await axios.post(
          "http://58.231.19.218:8000/user/auth/reissue",
          { refreshToken: `${refreshToken}` },
          { headers: {} }
        );
        console.log(data);
        // 새로운 토큰 저장
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
          data;
        await localStorage.setItem("refreshToken", newAccessToken);
        await setCookieToken("accessToken", newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axios(originalRequest);
      // };
    }

    console.log("response error", error);
    return Promise.reject(error);
  }
)