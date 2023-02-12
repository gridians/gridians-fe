import React, { useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import SimpleSlider from "../components/Slide";
import { BsFillChatDotsFill, BsFillBookmarkFill } from "react-icons/bs";
import { useRecoilState } from "recoil";
import {
  github,
  imgSrc,
  instagram,
  introduceText,
  language,
  list,
  nickNameText,
  position,
  skillSrc,
  statusMessage,
  tag,
  twitter,
} from "../store/cardInfoAtom";
import { useMutation, useQuery } from "react-query";
import {
  memberListUseQueryGetCardInfo,
  memberListUseQueryGetCardList,
} from "../apis/queries/memberListQuery";
import InfiniteScroll from "../components/infiniteScroll/InfiniteScroll";

const MemberListPage = () => {
  const [cardList, setCardList] = useRecoilState(list);
  //카드를 클릭한 상태인지 다시 닫은 상태인지 관리
  const [click, setClick] = useState();
  //클릭한 카드에 index번호 저장
  const [num, setNum] = useState();
  //클릭한 카드에 top값 left값 애니메이션후 돌아갈 값이기도 하다.
  const [top, setTop] = useState();
  const [left, setLeft] = useState();
  //카드 정보를 수정중인지 아닌지 판별
  const [retouch, setRetouch] = useState(false);
  const [statusMsg, setStatusMsg] = useRecoilState(statusMessage);
  const [field, setField] = useRecoilState(position);
  const [tagList, setTagList] = useRecoilState(tag);
  const [introduce, setIntroduce] = useRecoilState(introduceText);
  const [img, setImg] = useRecoilState(imgSrc);
  const [skillUrl, setSkillUrl] = useRecoilState(skillSrc);
  const [skill, setSkill] = useRecoilState(language);
  const [nickName, setNickName] = useRecoilState(nickNameText);
  const [githubId, setGithubId] = useRecoilState(github);
  const [instagramId, setInstagramId] = useRecoilState(instagram);
  const [twitterId, setTwitterId] = useRecoilState(twitter);

  const [pageNum, setPageNum] = useState(0);
  //회원 카드 리스트 받아오기 react-query
  const { mutate: cardListInfo, isLoading: cardListInfoLoading } = useMutation(
    "cardList",
    (num) => memberListUseQueryGetCardList(num),
    {
      retry: false,
      onSuccess: (res) => {
        console.log(res);
        if (cardList.length > 1) {
          setCardList((data) => [...data, res]);
        } else {
          setCardList(res);
        }
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );
  const [checkMark, setCheckMark] = useState(false);

  const [page, setPage] = useState(0);

  const { isEnd } = InfiniteScroll({
    onScrollEnd: cardListInfo,
    pageNum: pageNum,
    setPageNum: setPageNum,
  });
  useEffect(() => {
    cardListInfo(pageNum);
    setPageNum(pageNum + 1);
  }, []);

  // //무한 스크롤 구현
  // window.addEventListener("scroll", function () {
  //   const scrollTop = document.documentElement.scrollTop;
  //   const clientHeight = document.documentElement.clientHeight;
  //   const scrollHeight = document.documentElement.scrollHeight;
  //   if (scrollHeight - 1 <= scrollTop + clientHeight && !cardListInfoLoading) {
  //     cardListInfo(pageNum + 1);
  //     setPageNum(pageNum + 1);
  //   }
  // });
  // useEffect(() => {
  //   cardListInfo(pageNum);
  // }, []);

  //회원 카드 상세정보 가져오기 react-query
  const { mutate: cardInfo, isLoading: cardInfoLoading } = useMutation(
    "cardInfo",
    (index) => memberListUseQueryGetCardInfo(index),
    {
      onSuccess: (res) => {
        console.log(res);
        setField(res.field);
        setIntroduce(res.introduction);
        setSkill(res.skill);
        setStatusMsg(res.statusMessage);
        setTagList(res.tagSet);
        res.snsSet.map((data) => {
          if (data.name === "twitter") return setTwitterId(data.account);
          if (data.name === "github") return setGithubId(data.account);
          else return setInstagramId(data.account);
        });
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );

  //onClick
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
  const cardOnClick = (e, index, data) => {
    setNickName(data.nickname);
    cardInfo(data.profileCardId);
    setImg(data.profileImage);
    setSkillUrl(data.skillImage);
    setNum(index);
    setClick("click");
    setTop(document.querySelectorAll(".card")[index].offsetTop);
    setLeft(document.querySelectorAll(".card")[index].offsetLeft);
    //카드 상세정보를 받아온다
    // axios.get(`http://175.215.143.189:8080/cards/1`).then((data) => {
    //   console.log(data.data);
    //   setImg(data.data.imageSrc);
    //   setStatusMsg(data.data.statusMessage);
    //   setField(data.data.field);
    //   setTagList(data.data.tagSet);
    //   setIntroduce(data.data.introduction);
    // });
  };

  //onChange
  const statusMsgOnChange = (text) => {
    setStatusMsg(text.target.value);
  };
  const positionOnChange = (text) => {
    setField(text.target.value);
  };
  const skillOnChange = (text) => {
    setSkill(text.target.value);
  };

  //선택 가능한 포지션 list
  const positionList = [
    "Back-end Developer",
    "Front-end Developer",
    "Software Engineer",
    "Publisher",
    "Android",
    "IOS",
    "Nerwork Engineer",
    "Machine Learning",
    "PM",
    "Data Scientist",
    "QA",
    "Big Data Enineer",
    "Security Engineer",
    "Embebdded",
    "Block Chain",
    "Designer",
    "DBA",
    "VR Engineer",
    "Hardware Engineer",
  ];
  //선택 가능한 사용언어 list
  const skillList = [
    "javaScript",
    "TypeScript",
    "React",
    "Vue",
    "Svelte",
    "Next",
    "Java",
    "Spring",
    "Node.js",
    "Nest.js",
    "Go",
    "Kotlin",
    "Express",
    "MySQL",
    "MongoDB",
    "Python",
    "Django",
    "php",
    "GraphQL",
    "Firebase",
    "Flutter",
    "Swift",
    "ReactNative",
    "Unity",
    "AWS",
    "Kubernetes",
    "Docker",
    "Git",
    "Figma",
    "Zeplin",
    "Jest",
  ];

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
      <Detail click={click ? click : undefined} scrollY={scrollY}>
        <DetailContainer>
          <DefaultInfo>
            <BookMark>
              <BsFillBookmarkFill />
            </BookMark>
            {retouch ? (
              <StatusMessage
                value={statusMsg}
                onChange={(text) => statusMsgOnChange(text)}
                retouch={retouch}
              />
            ) : (
              <StatusMessage value={statusMsg} disabled />
            )}
            <LanguageImg retouch={retouch}>
              {retouch ? (
                <>
                  <select
                    value={field}
                    onChange={(text) => positionOnChange(text)}
                    placeholder="포지션을 선택"
                  >
                    {positionList.map((name) => (
                      <option key={name}>{name}</option>
                    ))}
                    <option>react</option>
                  </select>
                  <select
                    value={skill}
                    onChange={(text) => skillOnChange(text)}
                  >
                    {skillList.map((name) => (
                      <option key={name}>{name}</option>
                    ))}
                  </select>
                </>
              ) : (
                <>
                  <h4>{field}</h4>
                  <img src={skillUrl} alt="사용언어"/>
                </>
              )}
            </LanguageImg>
          </DefaultInfo>
          <SimpleSlider setRetouch={setRetouch} retouch={retouch} />
        </DetailContainer>
        <ReviewContainer></ReviewContainer>
      </Detail>
      <Wrap>
        {cardList &&
          cardList.flat().map((data, index) => (
            <MemberCard
              className="card"
              key={index}
              click={click ? click : ""}
              onClick={(e) => cardOnClick(e, index, data)}
            >
              <Card
                left={left}
                top={top}
                click={click && num === index ? click : undefined}
                className="front"
              >
                <Front>
                  <Skill>
                    <img src={data.skillImage} alt="34" />
                  </Skill>
                  <ProfileImg>
                    <img src={data.profileImage} alt="앗 안나와여" />
                  </ProfileImg>
                  <NickName>{data.nickname}</NickName>
                  <Role>{data.field}</Role>
                </Front>
                <Back className="back">
                  <DetailBtn click={click ? click : undefined}>
                    <BsFillChatDotsFill />
                  </DetailBtn>
                </Back>
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
        width: 70%;
        height:80%;
        transform: rotateY(-180deg);
    }
    100%{
        top: ${490}px;
        left: 50%;
        width: 70%;
        height:80%;
        transform: rotateY(-180deg) translate(50%,-50%);
    }
`;
const reset = (top, left) => keyframes`
    0%{
      top: ${490}px;
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
  transition: all 0.5s;
  cursor: pointer;
  &:hover {
    .front {
      transform: rotateY(-180deg);
    }
  }
  /* ${(props) =>
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
        `} */
`;
const Card = styled.div`
  position: absolute;
  z-index: 1;
  width: 250px;
  height: 250px;
  color: black;
  transform-style: preserve-3d;
  transition: all 0.5s;
  &:hover {
    transform: rotateY(180deg);
  }
  /* ${(props) =>
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
      : css``} */
`;
const Front = styled.div`
  position: absolute;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #f6b8b8;
  transition: all 0.5s ease-in-out;
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
const Back = styled.div`
  height: 100%;
  background: #f6b8b8;
  transform: rotateY(180deg);
`;

let scrollY = 0;
window.addEventListener("scroll", function () {
  scrollY = window.pageYOffset;
});
const clientHeight = document.documentElement.clientHeight;
const Detail = styled(Front)`
  position: absolute;
  z-index: -9;
  top: ${(props) => `calc(50vh + ${scrollY}px - 5vh)`};
  left: 50%;
  opacity: 0;
  transform: translate(-50%, -50%);
  flex-direction: row;
  width: 70%;
  height: 75vh;
  color: ${({ theme }) => theme.colors.white};
  transition: all 0.5s;
  ${(props) =>
    props.click === "click"
      ? css`
          z-index: 9;
          display: flex;
          opacity: 1;
        `
      : css``}
`;
const DetailBtn = styled.div`
  position: absolute;
  z-index: 2;
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
  padding: 30px;
  width: 70%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  cursor: auto;
`;
const DefaultInfo = styled.div`
  display: flex;
  justify-content: space-between;
  height: 10%;
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
  ${(props) =>
    props.retouch
      ? css`
          display: flex;
          flex-direction: column;
        `
      : css`
          display: flex;
        `}
  select {
    height: 30px;
    background-color: transparent;
    outline: none;
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
  width: 30%;
  height: 100%;
  background-color: #738598;
  cursor: auto;
`;

export default MemberListPage;
