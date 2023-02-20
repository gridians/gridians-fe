import { getCookieToken } from '../../cookie/cookie';
import { api2 } from '../untils';

export const commentUseQueryGetCommentList = async (index) => {
  console.log(index);
  const res = await api2.get(`cards/101/comments`);
  return res.data;
};

// 댓글 보내기
export const commentUseMutationPostCommentList = async (postCommentInfo) => {
  console.log(postCommentInfo);
  const res = await api2.post(
    // `cards/${postCommentInfo.cardId}/comments`,
    `cards/101/comments`,
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
  console.log(deleteCommentInfo);
  const res = await api2.delete(
    // `/cards/${deleteCommentInfo.cardId}/comments/${deleteCommentInfo.commentId}`,
    `/cards/101/comments/${deleteCommentInfo.commentId}`,
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
export const replyCommentUseMutationPostCommentList = async (deleteReplyCommentInfo) => {
  console.log(deleteReplyCommentInfo);
  const res = await api2.post(
    // `cards/2/comments/${deleteReplyCommentInfo.id}/replies`,
    `cards/101/comments/${deleteReplyCommentInfo.commentId}`,
    { contents: deleteReplyCommentInfo.info },
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
    `cards/101/comments/${commentIds.commentId}/replies/${commentIds.replyId}`,
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