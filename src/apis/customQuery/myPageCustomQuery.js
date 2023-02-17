import { useQuery, useMutation } from "react-query";
import {  myPageUseQueryGetUserInfo } from '../queries/myPageQuery';

// 유저정보
export const useQueryMyPageGetUserValid = () => {
  return useMutation( () => myPageUseQueryGetUserInfo());
};
