import { useQuery } from "react-query";
import { getCookieToken } from '../../cookie/cookie';
import {  myPageUseQueryGetUserInfo } from '../queries/myPageQuery';

// 유저정보
export const useQueryMyPageGetUserValid = () => {
  return useQuery(["userInfo"], () => myPageUseQueryGetUserInfo(), {
    enabled: !!getCookieToken("accessToken"),
    refetchOnWindowFocus:false,
    retry:1,
  });
};
