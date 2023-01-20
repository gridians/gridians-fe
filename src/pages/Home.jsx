import React from "react";
import styled from "styled-components";

export default function Home() {
  return (
    <HomeContainer>
      <HomeTitle>서비스 소개</HomeTitle>
      <HomeTitle>멤버 등록</HomeTitle>
      <HomeTitle>회원 리스트</HomeTitle>
    </HomeContainer>
  );
}

const HomeContainer = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.subBackgroundColor};
`;
const HomeTitle = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.titleSize};
  font-weight: bolder;
  margin-top: 25px;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.colors.subColor1};
  }
`;
