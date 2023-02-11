import axios from "axios";
import { getCookieToken, setCookieToken } from '../../cookie/cookie';


export const api = axios.create({
  // baseURL: `${process.env.REACT_APP_BASE_URL}`,
  baseURL: "http://116.123.153.248:8000",
  headers: {
    "Content-type": "application/json; charset=UTF-8",
    accept: "application/json,",
  },
  withCredentials: true,
});
export const api2 = axios.create({
  // baseURL: `${process.env.REACT_APP_BASE_URL}`,
  baseURL: "http://152.70.251.225:8080/",
  headers: {
    "Content-type": "application/json; charset=UTF-8",
    accept: "application/json,",
  },
  withCredentials: true,
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

// axios.interceptors.request.use(
//   async (config) => {
//     const accessToken = getCookieToken("accessToken");
//     console.log(accessToken);
//       config.headers = {
//         ...config.headers,
//         authorization: `Bearer ${accessToken}`,
//       };
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

api.interceptors.response.use(
  function (response) {
    console.log(response)
    return response;
  },
  async (error) => {
    const {
      config,
      response: { status },
    } = error;
    if (status === 401) {
      console.log(error);
      if (error.response.data.message === "expire") {
        const originalRequest = config;
        const refreshToken = await localStorage.getItem("refreshToken");
        
        // token refresh요청
        const  {data}  = await axios.post(
          "http://58.231.19.218:8000/user/auth/reissue",
          { refreshToken: `${refreshToken}` },
          { headers: {} }
        );
      console.log(data);
        // refreshToken을 통해 새로운 accessToken 토큰 저장
        const  newAccessToken  =
          data.accessToken;
        await setCookieToken("accessToken", newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axios(originalRequest);
      };
    }

    return Promise.reject(error);
  }
)