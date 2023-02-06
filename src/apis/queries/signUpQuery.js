import { getCookieToken } from '../../cookie/cookie';
import { api } from '../untils';

export const signUpuseQueryPostInfo = async(userInfo) => {
  const res = await api.post(
    "/user/auth/signup",
    {
      nickname: userInfo.nickname,
      email: userInfo.email,
      password: userInfo.password,
    },
  );
  return res.data;
};
