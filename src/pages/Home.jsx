import React from "react";
import styled from "styled-components";
import MemberListPage from "../pages/MemberListPage";

export default function Home() {
  return (
    <HomeContainer>
      <MemberListPage />
    </HomeContainer>
  );
}

const HomeContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.mainBackgroundColor};
`;
