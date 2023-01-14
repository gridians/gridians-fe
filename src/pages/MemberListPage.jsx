import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

const MemberListPage = () => {
  const [hover, setHover] = useState(false);
  const [num, setNum] = useState();
  const [top, setTop] = useState();
  const [left, setLeft] = useState();

  const member = [0, 1, 2, 3, 4, 5];
  return (
    <Container>
      <Wrap>
        {member.map((data, index) => (
          <MemberCard
            className="card"
            key={index}
            onClick={() => {
              setHover(true);
              setNum(index);
              setTop(document.querySelectorAll(".card")[0].offsetTop);
              setLeft(document.querySelectorAll(".card")[0].offsetLeft);
              console.log(document.querySelectorAll(".card")[0].offsetTop);
              console.log(document.querySelectorAll(".card")[0].offsetLeft);
            }}
          >
            {hover && index === num ? (
              <Back className="back" left={left>0?left:null} top={top>0?top:null}>
                back
              </Back>
            ) : (
              <Front className="front">front</Front>
            )}
          </MemberCard>
        ))}
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
const MemberCard = styled.div`
  width: 250px;
  height: 300px;
  background-color: transparent;
  border-radius: 10px;
  color: white;
  transition: all 1s;
  display: flex;
  cursor: pointer;
  &:hover {
    .front {
      transform: rotateY(180deg);
    }
  }
`;

const Front = styled.div`
  width: 250px;
  height: 300px;
  background-color: gray;
  border-radius: 10px;
  color: white;
  transition: all 1s;
  border: 12px solid black;
  cursor: pointer;
`;
const spin = keyframes`
    0%{
        top:30px;
        left:501px;
    }
    100%{
        top: 0px;
        left: 100px;
    }
`;
const Back = styled(Front)`
  position: absolute;
  z-index: 5;
  animation: ${spin} 2s;
  -webkit-animation-fill-mode: both;
`;

export default MemberListPage;
