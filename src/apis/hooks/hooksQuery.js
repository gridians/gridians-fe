import { useMutation, useQuery } from 'react-query';
import { postLoginQueryFindUserPassword, postLoginUseQueryUserInfo } from '../queries/loginQuery';


export const usePostLoginUserInfo = () => {
  return useMutation(
      (userLoginInfo) => postLoginUseQueryUserInfo(userLoginInfo),
    {
      onSuccess: (data) => {
        console.log(data); // mutation 이 성공하면 response를 받을 수 있다.
      },
      onError: (error) => {
        // mutation 이 에러가 났을 경우 error를 받을 수 있다.
        console.error(error);
      },
  });
};

export const usePostFindUserPassword = (email) => {
  return useMutation((email) => postLoginQueryFindUserPassword(email), {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
