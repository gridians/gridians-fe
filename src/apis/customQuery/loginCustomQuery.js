import { useMutation } from 'react-query';
import { postLoginQueryFindUserPassword, postLoginUseQueryUserInfo } from '../queries/loginQuery';


export const useMutaionPostLoginUserInfo = () => {
  return useMutation(
      (userLoginInfo) => postLoginUseQueryUserInfo(userLoginInfo),{
  });
};

export const useMutationPostFindUserPassword = () => {
  return useMutation((email) => postLoginQueryFindUserPassword(email), {
  });
};
