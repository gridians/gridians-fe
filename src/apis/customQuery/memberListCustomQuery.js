import { useMutation } from "react-query";
import { commentUseQueryGetCommentList } from '../queries/commentQuery';

// 카드 상세정보 댓글 받아오기
export const useMutationGetCardInfoComment = () => {
  return useMutation((index) => commentUseQueryGetCommentList(index), {});
};
