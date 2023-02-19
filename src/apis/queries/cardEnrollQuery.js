import { getCookieToken } from "../../cookie/cookie";
import { api2 } from "../untils";

// 로그인한 유저 카드 등록
export const cardEnrollUseMutationPostToken = () => {
  console.log("카드 등록");
  const res = api2.post(`/cards`, {
    headers: {
      "Content-Type": "application/json",
      accept: "application/json,",
      Authorization: `Bearer ${getCookieToken("accessToken")}`,
    },
  });
  return res.data;
};
