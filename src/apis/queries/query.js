import { getCookieToken } from '../../cookie/cookie';
import { api } from '../untils';

// login query
// 로그인 정보 보내기
export const postLoginUseQueryUserInfo = async (userLoginInfo) => {
  const res = await api.post("/user/auth/login", {
    email:userLoginInfo.email,
    password:userLoginInfo.password,
  });
  return res.data;
};

// mypage query
// 유저프로필 이미지
export const putMyPageUseQueryUserProfile = async (uploadProfile) => {
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
export const getMyPageUseQueryUserInfo = async () => {
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
export const postMyPageUserQueryEditEmail = async (email) => {
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
export const putMyPageUserQueryEditEmail = async (email) => {
  const token = getCookieToken("accessToken");
  const res = await api.put(
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

// 유저닉네임, 아이디, 비밀번호 수정
export const putMyPageUserQueryEditUserInfo = async (userInfo) => {
  const token = getCookieToken("accessToken");
  const res = await api.put(
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
export const deleteMyPageUserQueryUser = async () => {
  const token = getCookieToken("accessToken");
  const res = await api.delete(
    "/user/delete",
    {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        accept: "application/json,",
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data;
};
