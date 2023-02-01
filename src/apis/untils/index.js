import axios from "axios";
import { getCookieToken } from '../../cookie/cookie';


export const api = axios.create({
  // baseURL: `${process.env.REACT_APP_BASE_URL}`,
  baseURL: "http://175.215.143.189:8080/",
  headers: {
    "Content-type": "application/json; charset=UTF-8",
    accept: "application/json,",
  },
});

// export const cookieApi = axios.create({
//   baseURL: "http://58.231.19.218:8000",
//   headers: {
//     "Content-type": "application/json; charset=UTF-8",
//     accept: "application/json,",
//     Authorization: `Bearer ${getCookieToken("accessToken")}`,
//   },
//   ithCredentials: true,
// });
