import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default function Home() {
  return (
    <HomeContainer>
      <HomeTitle>
        <Link to="/education">서비스 소개</Link>
      </HomeTitle>
      <HomeTitle>
        <Link to="/memberlistpage">회원 리스트</Link>
      </HomeTitle>
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

  a {
    color: ${({ theme }) => theme.colors.black};
    &:hover {
      color: ${({ theme }) => theme.colors.subColor2};
    }
  }
`;
