import axios from "axios";
import { useRecoilValue } from 'recoil';
import { userNickname, userEmail, userPassword, hourSelector } from "../store/registerAtom";


export const api = axios.create({
  baseURL: "http://175.215.143.189:8080",
  headers: {
    "Content-type": "application/json; charset=UTF-8",
    accept: "application/json,",
  },
});

// export const RegisterPost = async () => {
//   try {
//     const res = await axios.post(`${baseURL}user/signup`, {
//       nickname:"a",
//       email: "asxdf22@aa.aa",
//       password: "qwe12!@#$",
//     });
//     console.log(res);
//     return res.data;
//   } catch (err) {
//     console.log(err);
//   }
// }


  // const loginApi = async () => {
  //   try {
  //     const res = await axios.post("http://175.215.143.189:8080/user/signup", {
  //       nickname,
  //       email,
  //       password,
  //     });
  //     if (res.status === 200) {
  //       // router.push("/");
  //     }
  //     console.log(res);
  //     return res.data;
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
