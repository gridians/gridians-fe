import { getCookieToken } from "../../cookie/cookie";
import { api, api2, cookieApi } from "../untils";

// 카드 리스트 받아오기
export const memberListUseQueryGetCardList = async (num) => {
  console.log("카드리스트get", "pageNum:", num);
  const res = await api2.get(`/cards?page=${num}&size=16`);
  return res.data;
};
// 카드 상세정보 받아오기
export const memberListUseQueryGetCardInfo = async (index) => {
  console.log("상세정보get");
  const res = await api2.get(`/cards/2`);
  return res.data;
};
// 수정된 카드 상세정보 보내기
export const memberListuseMutationPostCardInfo = (editCardListUserInfo) => {
  console.log(editCardListUserInfo);
  const res = api2.post("/cards/2", {
    statusMessage: editCardListUserInfo.statusMessage,
    field: editCardListUserInfo.field,
    skill: editCardListUserInfo.skillSet,
    introduction: editCardListUserInfo.introduction,
    snsSet: editCardListUserInfo.snsSet,
    tagSet: editCardListUserInfo.tagSet,
  });
  return res.data;
};
//즐겨찾기 추가
export const memberListuseMutationPostBookMark = (cardId) => {
  console.log("즐겨찾기 추가", cardId);
  const res = api.post(
    `/fav`,
    {
      profileCardId: 2,
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
//로그인한 유저에 즐겨찾기 리스트
export const memberListuseQuerygetBookMarkList = async () => {
  console.log("즐겨찾기 리스트");
  const res = await api.get(`/fav`,{
    headers: {
      "Content-Type": "application/json",
      accept: "application/json,",
      Authorization: `Bearer ${getCookieToken("accessToken")}`,
    },
  });
  return res.data;
};
