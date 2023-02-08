import { async } from 'q';
import { getCookieToken } from '../../cookie/cookie';
import { api2 } from '../untils';

export const commentuseMutationPostCommentList = async (comment) => {
      const token = getCookieToken("accessToken");
  const res = await api2.post(
    "cards/8/comments",
    { contents: comment },
    {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        accept: "application/json,",
        Authorization: `${token}`,
      },
    }
  );
  return res.data;

};
