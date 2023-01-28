import React, { useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import SimpleSlider from "../components/Slide";
import { BsFillChatDotsFill, BsFillBookmarkFill } from "react-icons/bs";
import axios from "axios";

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
  //카드 정보를 수정중인지 아닌지 판별
  const [retouch, setRetouch] = useState(false);

  const [list, setList] = useState();
  useEffect(() => {
    axios.get(`http://175.215.143.189:8080/cards`).then((data) => {
      setList(data.data);
      console.log(data.data);
    });
  }, []);

  const backgrounOnClick = () => {
    setRetouch(false);
    setClick("reset");
    setTop(document.querySelectorAll(".card")[num].offsetTop);
    setLeft(document.querySelectorAll(".card")[num].offsetLeft);
  };
  const XBtnOnClick = () => {
    setRetouch(false);
    setClick("reset");
    setTop(document.querySelectorAll(".card")[num].offsetTop);
    setLeft(document.querySelectorAll(".card")[num].offsetLeft);
  };
  const cardOnClick = (e, index) => {
    setNum(index);
    setClick("click");
    setTop(document.querySelectorAll(".card")[index].offsetTop);
    setLeft(document.querySelectorAll(".card")[index].offsetLeft);
    axios.get(`http://175.215.143.189:8080/cards/${index + 1}`).then((data) => {
      console.log(data.data);
    });
  };

  return (
    <Container>
      <Background
        click={click ? click : undefined}
        onClick={() => backgrounOnClick()}
      />
      <XBtn
        scrollY={scrollY}
        click={click ? click : undefined}
        onClick={() => XBtnOnClick()}
      >
        X
      </XBtn>
      <Wrap>
        {list &&
          list.map((data, index) => (
            <MemberCard
              className="card"
              key={index}
              click={click ? click : ""}
              onClick={(e) => cardOnClick(e, index)}
            >
              <Card
                left={left}
                top={top}
                click={click && num === index ? click : undefined}
                className="front"
              >
                <Front>
                  <Skill>
                    <img src={data.skillSrc} alt="34" />
                  </Skill>
                  <ProfileImg>
                    <img src={data.imageSrc} alt="앗 안나와여" />
                  </ProfileImg>
                  <NickName>{data.nickname}</NickName>
                  <Role>{data.field}</Role>
                </Front>
                <Detail click={click && num === index ? click : undefined}>
                  <DetailBtn click={click ? click : undefined}>
                    <BsFillChatDotsFill />
                  </DetailBtn>
                  <DetailContainer
                    click={click && num === index ? click : undefined}
                  >
                    <DefaultInfo>
                      <BookMark>
                        <BsFillBookmarkFill />
                      </BookMark>
                      {retouch ? (
                        <StatusMessage retouch={retouch} />
                      ) : (
                        <StatusMessage disabled />
                      )}
                      <LanguageImg>
                        {retouch ? (
                          <select>
                            <option>Back-End Develop</option>
                            <option>Front-End Develop</option>
                          </select>
                        ) : (
                          <h4>{data.field}</h4>
                        )}
                        <img src="https://cdn-icons-png.flaticon.com/512/5968/5968705.png" />
                      </LanguageImg>
                    </DefaultInfo>
                    <SimpleSlider setRetouch={setRetouch} retouch={retouch} />
                  </DetailContainer>
                  <ReviewContainer
                    click={click && num === index ? click : undefined}
                  ></ReviewContainer>
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
        height:980px;
        transform: rotateY(-180deg) translate(50%,-50%);
    }
`;
const reset = (top, left) => keyframes`
    0%{
      top: ${scrollY + 490}px;
        left: 50%;
        width: 70%;
        height:980px;
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
  min-height: 90vh;
  background-color: ${({ theme }) => theme.colors.subBackgroundColor};
  border: 2px solid black;
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
  transition: all 0.5s;
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
  transition: all 0.5s;
  ${(props) =>
    props.click === "click"
      ? css`
          z-index: 3;
          animation: ${(props) => spin(props.top, props.left)} 0.5s forwards;
        `
      : css``}
  ${(props) =>
    props.click === "reset"
      ? css`
          animation: ${(props) => reset(props.top, props.left)} 0.5s ease-in-out;
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
  width: 130px;
  border-radius: 50%;
  overflow: hidden;
  img {
    width: 130px;
    height: 130px;
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
  color: ${({ theme }) => theme.colors.white};
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

const DetailContainer = styled.form`
  position: relative;
  z-index: 1;
  opacity: 0;
  padding: 30px;
  width: 70%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  transition: all 0.5s;
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
const DefaultInfo = styled.div`
  display: flex;
  justify-content: space-between;
  height: 20%;
`;
const BookMark = styled.div`
  width: 197px;
  font-size: 40px;
  color: white;
  svg {
    cursor: pointer;
  }
`;
const StatusMessage = styled.input`
  width: 50%;
  height: 30px;
  background-color: #262626;
  border-radius: 10px;
  text-align: center;
  color: white;
  ${(props) =>
    props.retouch
      ? css`
          outline: 1px solid;
        `
      : css``}
`;
const LanguageImg = styled.div`
  display: flex;
  select {
    height: 30px;
    background-color: transparent;
    color: ${({ theme }) => theme.colors.white};
    option {
      color: ${({ theme }) => theme.colors.black};
    }
  }
  h4 {
    margin: 0;
  }
  img {
    width: 60px;
    height: 60px;
  }
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
