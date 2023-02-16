import { useMutation, useQuery } from "react-query";
import {  memberListUseQueryGetCardInfo, memberListUseQueryGetCardList } from '../queries/memberListQuery';

// 카드리스트 받아오기
export const useMutationGetCardList = () => {
  return useMutation((num) => memberListUseQueryGetCardList(num), {});
};

export const useMutationGetCardList1 = (num) => {
  return useQuery(["card", num], memberListUseQueryGetCardList(num));
};

// 카드 상세정보 받아오기
export const useMutationGetCardInfo = () => {
  return useMutation((index) => memberListUseQueryGetCardInfo(index), {});
};
