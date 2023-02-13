import { getCookieToken } from '../../cookie/cookie';
import { api2 } from '../untils';

export const commentuseMutationPostCommentList = async (comment) => {
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

export const replyCommentuseMutationPostCommentList = async (
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
