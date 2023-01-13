import React from "react";
import styled from "styled-components";
import { keyframes } from "styled-components";

const MemberListPage = () => {
  return (
    <Container>
      <Wrap>
        <MemberItem></MemberItem>
        <MemberItem></MemberItem>
        <MemberItem></MemberItem>
        <MemberItem></MemberItem>
        <MemberItem></MemberItem>
      </Wrap>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  height: 94vh;
  background-color: ${({ theme }) => theme.colors.subColor1};
`;
const Wrap = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  margin: 0 auto;
  padding-top: 30px;
  width: 1080px;
`;
const MemberItem = styled.div`
  width: 250px;
  height: 300px;
  background-color: gray;
  border-radius: 10px;
  color: white;
  transition: all 1s;
  cursor: pointer;
  &:hover {
    position: absolute;
    top: 100px;
    left: 0;
    scale: 3;
    transform: rotateY(180deg);
  }
`;

export default MemberListPage;
