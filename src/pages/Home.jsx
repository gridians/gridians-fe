import React from "react";
import styled from "styled-components";
import Comment from "../components/comment/Comment";

export default function Home() {
  return (
    <HomeContainer>
      {/* <Comment /> */}
      <HomeWrapper>
        <HomeLeftContainer>
          <HomeTitleContainer>
            <HomeTitle>Devember</HomeTitle>
          </HomeTitleContainer>
        </HomeLeftContainer>
        <HomeRightContainer>ss</HomeRightContainer>
      </HomeWrapper>
    </HomeContainer>
  );
}

const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.mainColor};
  border: 1px solid black;
  padding: 100px;
`;
const HomeWrapper = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid black;
  display: flex;
`;
const HomeLeftContainer = styled.div`
  width: 100%;
  height: 100%;
  flex: 2;
`;
const HomeTitleContainer = styled.div`
  padding: 0 0 40px 0;
  border: 1px solid blue;
`;
const HomeTitle = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.titleSize};
  font-weight: bold;
`;

const HomeRightContainer = styled.div`
  width: 100%;
  height: 100%;
  flex: 1;
  border: 1px solid red;
`;
