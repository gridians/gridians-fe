import { getCookieToken } from "../../cookie/cookie";
import { api2 } from "../untils";

// 로그인한 유저 카드 등록
export const cardEnrollUseMutationPostToken = () => {
  const res = api2.post(
    `/cards`,
    //파라미터 전달이 없어도 {}를 써야 headers전달이 가능
    {},
    {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json,",
        Authorization: `Bearer ${getCookieToken("accessToken")}`,
      },
    }
  );
  return res.data;
};
