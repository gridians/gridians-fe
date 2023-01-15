import React, { useState } from "react";
import styled, { css, keyframes } from "styled-components";

const MemberListPage = () => {
  //카드를 클릭한 상태인지 다시 닫은 상태인지 관리
  const [click, setClick] = useState();
  //클릭한 카드에 index번호 저장
  const [num, setNum] = useState();
  //클릭한 카드에 top값 left값 애니메이션후 돌아갈 값이기도 하다.
  const [top, setTop] = useState();
  const [left, setLeft] = useState();

  const member = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
  return (
    <Container>
      <Background
        click={click ? click : undefined}
        onClick={() => {
          setClick("reset");
        }}
      />
      <XBtn
        click={click ? click : undefined}
        onClick={() => {
          setClick("reset");
        }}
      >
        X
      </XBtn>
      <Wrap>
        {member.map((data, index) => (
          <MemberCard
            className="card"
            key={index}
            click={click ? click : ""}
            onClick={() => {
              setNum(index);
              setClick("click");
              setTop(document.querySelectorAll(".card")[index].offsetTop);
              setLeft(document.querySelectorAll(".card")[index].offsetLeft);
            }}
          >
            <Card
              left={left}
              top={top}
              click={click && num === index ? click : undefined}
              className="front"
            >
              <Front>Front</Front>
              <Back>Back</Back>
            </Card>
          </MemberCard>
        ))}
        <ReviewContainer click={click ? click : undefined}></ReviewContainer>
      </Wrap>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  height: 94vh;
  background-color: ${({ theme }) => theme.colors.subColor1};
  border: 2px solid black;
  overflow-x: hidden;
`;
const Wrap = styled.div`
  display: grid;
  justify-items: center;
  grid-template-columns: 1fr 1fr 1fr;
  margin: 0 auto;
  padding-top: 30px;
  width: 1080px;
`;
const MemberCard = styled.div`
  display: flex;
  width: 350px;
  height: 400px;
  background-color: transparent;
  border-radius: 10px;
  transition: all 1s;
  cursor: pointer;
  &:hover {
    .front {
      transform: rotateY(180deg);
    }
  }
  ${(props) =>
    props.click === "reset"
      ? css`
          &:hover {
            .front {
              transform: rotateY(180deg);
            }
          }
        `
      : css`
          ${null}
        `}
  &:nth-child(even) {
    margin-top: 150px;
  }
`;

const spin = (top, left) => keyframes`
    0%{
        top:${top}px;
        left:${left}px;
    }
    100%{
        top: 20px;
        left: 200px;
        width: 1300px;
        height:1060px;
        transform: rotateY(360deg);
    }
`;
const reset = (top, left) => keyframes`
    0%{
        top: 20px;
        left: 200px;
        width: 1300px;
        height:1060px;
        transform: rotateY(360deg);
    }
    100%{
        top: ${top}px;
        left: ${left}px;
        width: 250px;
        height: 300px;

    }
`;
const Card = styled.div`
  position: absolute;
  z-index: 1;
  width: 350px;
  height: 400px;
  color: black;
  transform-style: preserve-3d;
  transition: all 1s;
  ${(props) =>
    props.click === "click"
      ? css`
          z-index: 5;
          animation: ${(props) => spin(props.top, props.left)} 1s forwards;
          background: white;
          border-radius: 0px;
        `
      : css`
          ${null}
        `}
  ${(props) =>
    props.click === "reset"
      ? css`
          animation: ${(props) => reset(props.top, props.left)} 1s;
        `
      : css`
          ${null}
        `}
`;
const Front = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%);
  border-radius: 10px;
  transform-style: preserve-3d;
  transition: all 2s ease-in-out;
  backface-visibility: hidden;
`;
const Back = styled(Front)`
  background-color: #3bc2ff;
  transform: perspective(500px) rotateY(180deg);
`;

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: transparent;
  transition: all 1s;
  ${(props) =>
    props.click &&
    css`
      z-index: 2;
      background-color: #353535;
    `}
  ${(props) =>
    props.click === "reset"
      ? css`
          z-index: -2;
          background-color: transparent;
        `
      : css`
          ${null}
        `}
`;
const XBtn = styled.button`
  position: absolute;
  z-index: 2;
  top: 30px;
  left: 30px;
  width: 40px;
  height: 40px;
  background-color: transparent;
  border: none;
  font-size: 40px;
  cursor: pointer;
  &:hover {
    color: gray;
  }
  ${(props) =>
    props.click === "click"
      ? css`
          display: block;
        `
      : css`
          display: none;
        `}
`;
const ReviewContainer = styled.div`
  position: absolute;
  z-index: 2;
  top: 10px;
  right: -800px;
  width: 700px;
  height: 98%;
  background-color: #738598;
  border-radius: 20px;
  transition: all 1s;
  ${(props) =>
    props.click === "click"
      ? css`
          right: 100px;
        `
      : css``}
  ${(props) =>
    props.click === "reset"
      ? css`
          right: -800px;
        `
      : css`
          ${null}
        `}
`;
export default MemberListPage;
