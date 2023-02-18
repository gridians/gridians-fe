import { getCookieToken } from '../../cookie/cookie';
import { api2 } from '../untils';

export const commentUseQueryGetCommentList = async (index) => {
  console.log("상세 index", index);
  const res = await api2.get(`cards/2/comments`);
  return res.data;
};

// 댓글 보내기
export const commentUseMutationPostCommentList = async (comment) => {
  const res = await api2.post(
    "cards/2/comments",
    { contents: comment },
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
export const commentUseMutationDeleteCommentList = async (commentId) => {
  const res = await api2.delete(`/cards/2/comments/${commentId}`, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      accept: "application/json,",
      Authorization: `Bearer ${getCookieToken("accessToken")}`,
    },
  });
  return res.data;
};

// 대댓글 보내기
export const replyCommentUseMutationPostCommentList = async (
  commentId,
  replyComment
) => {
  const res = await api2.post(
    `cards/2/comments/${commentId}`,
    { contents: replyComment },
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
export const replyCommentUseMutationDeleteCommentList = async (commentIds) => {
  console.log("여기다",commentIds);
  const res = await api2.delete(
    `cards/2/comments/${commentIds.commentId}/${commentIds.replyId}`,
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