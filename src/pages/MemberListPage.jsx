import React from "react";
import styled from "styled-components";
import { keyframes } from "styled-components";

const MemberListPage = () => {
  return (
    <Container>
      <Wrap>
        <MemberItem>
          <MemberItem1 className="aa">1</MemberItem1>
        </MemberItem>
        <MemberItem>
          <MemberItem1 className="aa">2</MemberItem1>
        </MemberItem>
        <MemberItem>
          <MemberItem1 className="aa">3</MemberItem1>
        </MemberItem>
        <MemberItem>
          <MemberItem1 className="aa">4</MemberItem1>
        </MemberItem>
        <MemberItem>
          <MemberItem1>4</MemberItem1>
        </MemberItem>
      </Wrap>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  height: 94vh;
  background-color: ${({ theme }) => theme.colors.subColor1};
  border: 2px solid black;
`;
const Wrap = styled.div`
  display: grid;
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
  border: 12px solid black;
  display: flex;
  cursor: pointer;
  &:hover {
    .aa {
      position: absolute;
      top: 0;
      left: 0;
      transform: rotateY(180deg);
    }
  }
`;

const MemberItem1 = styled.div`
  width: 250px;
  height: 300px;
  background-color: gray;
  border-radius: 10px;
  color: white;
  transition: all 1s;
  border: 12px solid black;
  cursor: pointer;
`;

export default MemberListPage;
