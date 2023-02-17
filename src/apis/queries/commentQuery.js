import { getCookieToken } from '../../cookie/cookie';
import { api2 } from '../untils';

export const commentUseQueryGetCommentList = async (index) => {
  console.log("상세 index", index);
  const res = await api2.get(`cards/2/comments`);
  return res.data;
};

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

export const commentUseMutationDeleteCommentList = async (commentId) => {
  console.log(commentId);
  const res = await api2.delete(`/cards/2/comments/${commentId}`, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      accept: "application/json,",
      Authorization: `Bearer ${getCookieToken("accessToken")}`,
    },
  });
  return res.data;
};

export const replyCommentUseMutationPostCommentList = async (
  commentId,
  replyComment
) => {
  console.log(commentId, replyComment);
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
