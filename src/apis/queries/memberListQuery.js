import { getCookieToken } from "../../cookie/cookie";
import { api } from "../untils";

// 카드 리스트 받아오기
export const memberListUseQueryGetCardList = async (num) => {
  const res = await api.get(`/cards?page=${num}&size=16`);
  return res.data;
};
// 카드 상세정보 받아오기

export const memberListUseQueryGetCardInfo = async (index) => {
  const res = await api.get(`/cards/${index}`);
  return res.data;
};
// 수정된 카드 상세정보 보내기
export const memberListuseMutationPostCardInfo = (
  editCardListUserInfo,
  eaditCardId
) => {
  const res = api.put(
    `/cards/${eaditCardId}`,
    {
      statusMessage: editCardListUserInfo.statusMessage,
      field: editCardListUserInfo.field,
      skill: editCardListUserInfo.skill,
      introduction: editCardListUserInfo.introduction,
      snsSet: editCardListUserInfo.snsSet,
      tagSet: editCardListUserInfo.tagSet,
    },
    {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json,",
        Authorization: `Bearer ${getCookieToken("accessToken")}`,
      },
    }
  );
  return res.data;
};
//즐겨찾기 추가
export const memberListuseMutationPostBookMark = (cardId) => {
  const res = api.post(
    `/fav`,
    {
      profileCardId: cardId,
    },
    {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json,",
        Authorization: `Bearer ${getCookieToken("accessToken")}`,
      },
    }
  );
  return res;
};
//즐겨찾기 해제
export const memberListuseMutationDeleteBookMark = async (cardId) => {
  const res = await api.delete(`/fav`, {
    data: { profileCardId: cardId },
    headers: {
      "Content-Type": "application/json",
      accept: "application/json,",
      Authorization: `Bearer ${getCookieToken("accessToken")}`,
    },
  });
  return res.data;
};
//로그인한 유저에 즐겨찾기 리스트
export const memberListuseQuerygetBookMarkList = async () => {
  const res = await api.get(`/fav`, {
    headers: {
      "Content-Type": "application/json",
      accept: "application/json,",
      Authorization: `Bearer ${getCookieToken("accessToken")}`,
    },
  });
  return res.data;
};
//로그인한 유저에 카드 정보를 token을 이용해 받아오기
export const memberListuseMutationGetCardInfo = async () => {
  const res = await api.get(`/cards/my-card `, {
    headers: {
      "Content-Type": "application/json",
      accept: "application/json,",
      Authorization: `Bearer ${getCookieToken("accessToken")}`,
    },
  });
  return res.data;
};
