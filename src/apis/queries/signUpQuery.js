import { getCookieToken } from '../../cookie/cookie';
import { api } from '../untils';

export const signUpuseQueryPostInfo = (userInfo) => {
  const res =  api.post(
    "/user/auth/signup",
    {
      nickname: userInfo.nickname,
      email: userInfo.email,
      password: userInfo.password,
      githubNumberId: userInfo.githubId
    },
    {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        accept: "application/json,",
        Authorization: `Bearer ${getCookieToken("accessToken")}`,
      },
    }
  );
  return res.data;
};
