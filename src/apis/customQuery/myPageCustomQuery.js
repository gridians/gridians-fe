import { useMutation, useQuery } from "react-query";
import { certificationUseQueryGetEmail, myPageUseMutationPostEditEmail, myPageUseMutationPutEditEmail, myPageUseMutationPutEditUserInfo, myPageUseMutationPutUserProfile, myPageUseQueryGetUserInfo } from '../queries/myPageQuery';

// 유저정보
export const useQueryMyPageGetUserValid = () => {
  return useQuery(["userInfo"], myPageUseQueryGetUserInfo);
};

// 유저프로필 이미지
export const useMutationMyPagePutUserProfile = () => {
  return useMutation(
    (uploadProfile) => myPageUseMutationPutUserProfile(uploadProfile),
  );
};

// 유저이메일 보내기
export const useMutationMyPagePostEditEmail = () => {
  return useMutation((email) =>
    myPageUseMutationPostEditEmail(email)
  );
};

// 유저닉네임, 아이디, 비밀번호 수정
export const useMutationMyPagePutEditUserInfo = () => {
  return useMutation((userInfo) => myPageUseMutationPutEditUserInfo(userInfo));
};

// 유저이메일 수정
export const useMutationMyPagePutEditEmail = () => {
  return useMutation((id) => myPageUseMutationPutEditEmail(id));
};

// 회원가입 유저이메일 인증
export const useQuerycertificationPutEditEmail = (id) => {
  return useQuery(
    ["certificationEmail", id],
    certificationUseQueryGetEmail(id)
  );
};

// 유저 회원탈퇴
export const useMutationMyPageDeleteUserInfo = () => {
  return useMutation((deleteInfo) => myPageUseMutationPostEditEmail(deleteInfo));
};