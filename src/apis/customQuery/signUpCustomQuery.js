import { useMutation } from 'react-query';
import { signUpUseMutaionPostInfo } from '../queries/signUpQuery';

export const useMutationPostSignUp = () => {
  return useMutation((userInfo) => signUpUseMutaionPostInfo(userInfo), {});
};
