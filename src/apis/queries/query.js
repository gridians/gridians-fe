import { getCookieToken } from '../../cookie/cookie';
import { api } from '../untils';

// login query
export const postLoginUseQueryUserInfo = async (userLoginInfo) => {
  const res = await api.post("/user/auth/login", {
    email:userLoginInfo.email,
    password:userLoginInfo.password,
  });
  return res.data;
};

// mypage query
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

