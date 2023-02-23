import { getCookieToken } from '../../cookie/cookie';
import { api2 } from '../untils';

export const commentUseQueryGetCommentList = async (index) => {
  const res = await api2.get(`cards/${index.queryKey[1]}/comments`);
  return res.data;
};

// 댓글 보내기
export const commentUseMutationPostCommentList = async (postCommentInfo) => {
  const res = await api2.post(
    `cards/${postCommentInfo.cardId}/comments`,
    { contents: postCommentInfo.comment },
    {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        accept: "application/json,",
        Authorization: `Bearer ${getCookieToken("accessToken")}`,
      },
    }
  );
  return res.data;
};

// 댓글 삭제
export const commentUseMutationDeleteCommentList = async (deleteCommentInfo) => {
  const res = await api2.delete(
    `/cards/${deleteCommentInfo.cardId}/comments/${deleteCommentInfo.commentId}`,
    {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        accept: "application/json,",
        Authorization: `Bearer ${getCookieToken("accessToken")}`,
      },
    }
  );
  return res.data;
};

// 대댓글 보내기
export const replyCommentUseMutationPostCommentList = async (postReplyCommentInfo) => {
  const res = await api2.post(
    `cards/${postReplyCommentInfo.cardId}/comments/${postReplyCommentInfo.commentId}/replies`,
    { contents: postReplyCommentInfo.replyComment },
    {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        accept: "application/json,",
        Authorization: `Bearer ${getCookieToken("accessToken")}`,
      },
    }
  );
  return res.data;
};

// 대댓글 삭제
export const replyCommentUseMutationDeleteCommentList = async (deleteReplyCommentInfo) => {
  const res = await api2.delete(
    `cards/${deleteReplyCommentInfo.cardId}/comments/${deleteReplyCommentInfo.commentId}/replies/${deleteReplyCommentInfo.replyId}`,
    {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        accept: "application/json,",
        Authorization: `Bearer ${getCookieToken("accessToken")}`,
      },
    }
  );
  return res.data;
};