import { getCookieToken } from "../../cookie/cookie";
import { api, cookieApi } from "../untils";

// mypage query
// 유저프로필 이미지
export const myPageUseMutationPutUserProfile =  (uploadProfile) => {
  const token = getCookieToken("accessToken");
  const res =  api.put(
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
export const myPageUseQueryGetUserInfo =  () => {
  const token = getCookieToken("accessToken");
  const res =  api.get("/user/valid", {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      accept: "application/json,",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// 유저이메일 보내기
export const myPageUseMutationPostEditEmail = (email) => {
  const token = getCookieToken("accessToken");
  const res = api.post(
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
export const myPageUseMutationPutEditEmail = (id) => {
  console.log(id);
  const res = cookieApi.put("/user/update-email", { email: id });
  return res.data;
};

// 유저닉네임, 아이디, 비밀번호 수정
export const myPageUseMutationPutEditUserInfo = (userInfo) => {
  const token = getCookieToken("accessToken");
  const res = api.put(
    "/user/update-user",
    {
      nickname: userInfo.nickname,
      password: userInfo.password,
      updatePassword: userInfo.newPassword,
    },
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

// 유저 회원탈퇴
export const myPageUseMutationDeleteUserInfo = (deleteInfo) => {
  console.log(deleteInfo);
  const res = api.delete(
    "/user/delete",
    { data: { password: deleteInfo.password } },
    {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        accept: "application/json,",
        Authorization: `Bearer ${deleteInfo.token}`,
      },
    }
  );
  return res.data;
};
