import { api } from '../untils';

export const signUpUseMutaionPostInfo = async(userInfo) => {
  const res = await api.post(
    "/user/auth/signup",
    {
      nickname: userInfo.nickname,
      email: userInfo.email,
      password: userInfo.password,
      githubNumberId: userInfo.githubId
    },
  );
  return res.data;
};
