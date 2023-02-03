import { getCookieToken } from "../../cookie/cookie";
import { api, cookieApi } from "../untils";

// mypage query
// 유저프로필 이미지
export const MyPageUseQueryPutUserProfile = async (uploadProfile) => {
  const token = getCookieToken("accessToken");
  const res = await api.put(
    `/user/profile`,
    {
      base64Image: uploadProfile,
    },
    {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json,",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};

// 유저정보 받아오기
export const MyPageUseQueryGetUserInfo = async () => {
  const token = getCookieToken("accessToken");
  const res = await api.get("/user/valid", {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      accept: "application/json,",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// 유저이메일 보내기
export const MyPageUserQueryPostEditEmail = async (email) => {
  const token = getCookieToken("accessToken");
  const res = await api.post(
    "/user/update-email",
    { email: email },
    {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        accept: "application/json,",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};

// 유저이메일 수정
export const MyPageUserQueryPutEditEmail = async (id) => {
  console.log(id);
  const res = await cookieApi.put(
    "/user/update-email",
    { email: id },
  );
  return res.data;
};

// 유저닉네임, 아이디, 비밀번호 수정
export const MyPageUserQueryPutEditUserInfo = async (userInfo) => {
  const res = await cookieApi.put(
    "/user/update-user",
    {
      nickname: userInfo.nickname,
      password: userInfo.password,
      updatePassword: userInfo.newPassword,
    },
    // {
    //   headers: {
    //     "Content-type": "application/json; charset=UTF-8",
    //     accept: "application/json,",
    //     Authorization: `Bearer ${token}`,
    //   },
    // }
  );
  return res.data;
};

// 유저 회원탈퇴
export const MyPageUserQueryDeleteUserInfo = async (password) => {
  const token = getCookieToken("accessToken");
  console.log(password);
  const res = await cookieApi.delete(
    "/user/delete",
    { data: { password: password }, withCredentials: true },
    {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        accept: "application/json,",
        Authorization: `Bearer ${token}`,
      },
    }
  );
   return res.data;
};
