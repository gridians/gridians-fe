import React, { useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import SimpleSlider from "../components/Slide";
import { BsFillChatDotsFill } from "react-icons/bs";
import Comment from "../components/comment/Comment";

//스크롤을 내려도 항상 중앙에 요소를 배치하기 위해 스크롤한 값을 구한다
let scrollY = 0;
window.addEventListener("scroll", function () {
  scrollY = window.pageYOffset;
});

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
          setTop(document.querySelectorAll(".card")[num].offsetTop);
          setLeft(document.querySelectorAll(".card")[num].offsetLeft);
        }}
      />
      <XBtn
        scrollY={scrollY}
        click={click ? click : undefined}
        onClick={() => {
          setClick("reset");
          setTop(document.querySelectorAll(".card")[num].offsetTop);
          setLeft(document.querySelectorAll(".card")[num].offsetLeft);
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
              <Front>
                <Skill>
                  <img src="https://cdn.icon-icons.com/icons2/2429/PNG/512/figma_logo_icon_147289.png" />
                </Skill>
                <ProfileImg>
                  <img src="data:image/jpeg;base64,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" />
                </ProfileImg>
                <NickName>@nick_R</NickName>
                <Role>Front-Develop</Role>
              </Front>
              <Detail click={click && num === index ? click : undefined}>
                <DetailBtn click={click ? click : undefined}>
                  <BsFillChatDotsFill />
                </DetailBtn>
                <DetailContainer
                  click={click && num === index ? click : undefined}
                >
                  <SimpleSlider />
                </DetailContainer>
                <ReviewContainer
                  click={click && num === index ? click : undefined}
                >
                  <Comment />
                </ReviewContainer>
              </Detail>
            </Card>
          </MemberCard>
        ))}
      </Wrap>
    </Container>
  );
};

const spin = (top, left) => keyframes`
    0%{
        top:${top}px;
        left:${left}px;
        transform: rotateY(180deg);
    }
    100%{
        top: ${scrollY + 490}px;
        left: 50%;
        width: 70%;
        height:70%;
        transform: rotateY(-180deg) translate(50%,-50%);
    }
`;
const reset = (top, left) => keyframes`
    0%{
      top: ${scrollY + 490}px;
        left: 50%;
        width: 70%;
        height:70%;
        transform: rotateY(-180deg) translate(50%,-50%);
    }
    100%{
        top: ${top}px;
        left: ${left}px;
        width: 250px;
        height: 250px;
        transform: rotateY(0deg);
    }
`;

const Container = styled.div`
  position: relative;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.subColor1};
  border: 2px solid black;
  overflow-x: hidden;
`;

const Wrap = styled.div`
  display: grid;
  gap: 15px;
  justify-items: center;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  margin: 0 auto;
  padding-top: 90px;
  width: 1080px;
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
      background-color: rgba(215, 215, 215, 0.8);
    `}
  ${(props) =>
    props.click === "reset"
      ? css`
          z-index: -2;
          background-color: transparent;
        `
      : css``}
`;
const XBtn = styled.button`
  position: absolute;
  z-index: 2;
  top: ${(props) => props.scrollY}px;
  left: 30px;
  width: 40px;
  height: 40px;
  background-color: transparent;
  border: none;
  color: #f7f7f7;
  font-size: 40px;
  cursor: pointer;
  ${(props) =>
    props.click === "click"
      ? css`
          display: block;
        `
      : css`
          display: none;
        `}
`;

const MemberCard = styled.div`
  display: flex;
  width: 250px;
  height: 250px;
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
`;
const Card = styled.div`
  position: absolute;
  z-index: 1;
  width: 250px;
  height: 250px;
  color: black;
  transform-style: preserve-3d;
  transition: all 1s;
  ${(props) =>
    props.click === "click"
      ? css`
          z-index: 3;
          animation: ${(props) => spin(props.top, props.left)} 1s forwards;
        `
      : css``}
  ${(props) =>
    props.click === "reset"
      ? css`
          animation: ${(props) => reset(props.top, props.left)} 0.8s ease-in-out;
        `
      : css``}
`;
const Front = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #f6b8b8;
  border-radius: 10px;
  transform-style: preserve-3d;
  transition: all 2s ease-in-out;
  backface-visibility: hidden;
`;
const Skill = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 15%;
  img {
    width: 100%;
  }
`;
const ProfileImg = styled.div`
  margin-top: 50px;
  width: 55%;
  border-radius: 50%;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
  }
`;
const NickName = styled.h2`
  margin: 0;
`;
const Role = styled.h5`
  margin: 0;
  color: #505050;
`;

const Detail = styled(Front)`
  display: flex;
  flex-direction: row;
  transform: perspective(500px) rotateY(180deg);
  ${(props) =>
    props.click === "click"
      ? css`
          background-color: transparent;
        `
      : css``}
`;
const DetailBtn = styled.div`
  position: absolute;
  z-index: 3;
  top: 50%;
  left: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 30px;
  transform: translate(-50%, -50%);
  transition: all 0.5s;
  &:hover {
    font-size: 3rem;
  }
  ${(props) =>
    props.click === "click"
      ? css`
          z-index: 1;
          display: none;
        `
      : css``}
`;
const DetailContainer = styled.div`
  position: relative;
  z-index: 1;
  opacity: 0;
  padding: 30px;
  width: 70%;
  height: 100%;
  background-color: rgb(42 42 42 / 50%);
  transition: all 2s;
  cursor: auto;
  ${(props) =>
    props.click === "click"
      ? css`
          opacity: 1;
        `
      : css``}
  ${(props) =>
    props.click === "reset"
      ? css`
          transition: all 1s;
        `
      : css``}
`;
const ReviewContainer = styled.div`
  opacity: 0;
  width: 30%;
  height: 100%;
  background-color: #738598;
  transition: all 2s;
  cursor: auto;
  ${(props) =>
    props.click === "click"
      ? css`
          opacity: 1;
          transition: all 1s;
        `
      : css``}
`;

export default MemberListPage;
