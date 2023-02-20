import { useMutation, useQuery } from "react-query";
import { commentUseMutationPostCommentList, commentUseQueryGetCommentList } from '../queries/commentQuery';

// 카드 상세정보 댓글 받아오기
export const useMutationGetCardInfoComment = () => {
  return useMutation((index) => commentUseQueryGetCommentList(index));
};

// 카드 댓글 보내기 
export const useMutationPostCardComment = () => {
  return useMutation((comment) =>
    commentUseMutationPostCommentList(comment)
  );
}