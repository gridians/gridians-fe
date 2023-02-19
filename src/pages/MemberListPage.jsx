import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import SimpleSlider from "../components/Slide";
import { BsFillChatDotsFill, BsFillBookmarkFill } from "react-icons/bs";
import { useRecoilState } from "recoil";
import {
  cardIdNum,
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
import { useMutation } from "react-query";
import {
  memberListuseMutationDeleteBookMark,
  memberListuseMutationPostBookMark,
  memberListuseQuerygetBookMarkList,
  memberListUseQueryGetCardInfo,
  memberListUseQueryGetCardList,
} from "../apis/queries/memberListQuery";
import InfiniteScroll from "../components/infiniteScroll/InfiniteScroll";
import CommentList from "../components/comment/CommentList";
import { loginUserEmail } from "../store/userInfoAtom";
import {
  useMutationGetCardInfo,
  useMutationGetCardInfoComment,
  useMutationGetCardList,
  useMutationPostCardComment,
} from "../apis/customQuery/memberListCustomQuery";
import { getCookieToken } from "../cookie/cookie";
import { cardIdSelector } from "../store/commentAtom";
import MyCardBtn from "../components/MyCardBtn";

const MemberListPage = () => {
  const [cardList, setCardList] = useRecoilState(list);
  //카드를 클릭한 상태인지 다시 닫은 상태인지 관리
  const [click, setClick] = useState();
  //클릭한 카드에 index번호 저장
  const [num, setNum] = useState();
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
  const [eaditCardId, setEaditCardId] = useRecoilState(cardIdNum);

  const [pageNum, setPageNum] = useState(0);
  const [cardId, setCardId] = useRecoilState(cardIdSelector);

  // 회원 카드 리스트 받아오기 react-query
  const { mutate: cardListInfo, isLoading: cardListInfoLoading } = useMutation(
    "cardList",
    (num) => memberListUseQueryGetCardList(num),
    {
      retry: false,
      onSuccess: (res) => {
        if (cardList.length > 1) {
          setCardList((data) => [...data, res]);
        } else {
          setCardList(res);
        }
      },
      onError: (err) => {
        // console.log(err);
      },
    }
  );

  // console.log(cardList);

  const { isEnd } = InfiniteScroll({
    onScrollEnd: cardListInfo,
    pageNum: pageNum,
    setPageNum: setPageNum,
  });
  useEffect(() => {
    console.log(localStorage.getItem("name"));
    cardListInfo(pageNum);
    setPageNum(pageNum + 1);
  }, []);

  const { mutate: mutateCardInfoComment } =
    useMutationGetCardInfoComment(cardId);
  const handleDetailCardComment = (index) => {
    mutateCardInfoComment(index);
  };

  //회원 카드 상세정보 가져오기 react-query
  const { mutate: cardInfo, isLoading: cardInfoLoading } = useMutation(
    "cardInfo",
    (index) => memberListUseQueryGetCardInfo(index),
    {
      onSuccess: (res) => {
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
        // console.log(err);
      },
    }
  );

  const [bookMarkList, setBookList] = useState();
  //로그인한 유저에 즐겨찾기 리스트 가져오기 react-query
  const { mutate: bookList, isLoading: bookMarkListLoading } = useMutation(
    "bookMarkList",
    () => memberListuseQuerygetBookMarkList(),
    {
      onSuccess: (res) => {
        setBookList(res);
      },
    }
  );
  //로그인한 유저에 북마크 리스트를 첫렌더링시 실행
  useEffect(() => {
    if (getCookieToken("accessToken")) {
      bookList();
    }
  }, []);

  //북마크 클릭시 즐겨찾기에 추가 react-query
  const { mutate: addBookMark, isLoading: addBookMarkLoading } = useMutation(
    "bookMark",
    () => memberListuseMutationPostBookMark(cardId),
    {
      onSuccess: (res) => {
        bookList();
      },
    }
  );
  //북마크 클릭시 즐겨찾기에 해제 react-query
  const { mutate: minusBookMark, isLoading: minusBookMarkLoading } =
    useMutation(
      "minusbookMark",
      () => memberListuseMutationDeleteBookMark(cardId),
      {
        onSuccess: (res) => {
          // console.log(res);
          bookList();
        },
        onError: (err) => {
          // console.log(err);
        },
      }
    );

  //onClick
  const backgrounOnClick = () => {
    setRetouch(false);
    setClick("reset");
  };
  const XBtnOnClick = () => {
    setRetouch(false);
    setClick("reset");
  };
  const cardOnClick = (e, index, data) => {
    setEaditCardId(data.profileCardId);
    setCardId(data.profileCardId);
    setNickName(data.nickname);
    cardInfo(data.profileCardId);
    handleDetailCardComment(data.profileCardId);
    // mutationCardInfoIndex({ index: data.profileCardId });
    setImg(data.profileImage);
    setSkillUrl(data.skillImage);
    setNum(index);
    setClick("click");
  };
  const bookMarkOnClick = () => {
    addBookMark();
    const boolean =
      bookMarkList &&
      bookMarkList.map((data) => data.nickname).includes(nickName);
    if (!boolean) {
      addBookMark();
    } else {
      minusBookMark();
    }
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

  //상세정보가 떠 있을시 스크롤 막기
  var keys = { 37: 1, 38: 1, 39: 1, 40: 1 };
  function preventDefault(e) {
    e.preventDefault();
  }
  function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
      preventDefault(e);
      return false;
    }
  }
  // modern Chrome requires { passive: false } when adding event
  var supportsPassive = false;
  try {
    window.addEventListener(
      "test",
      null,
      Object.defineProperty({}, "passive", {
        get: function () {
          supportsPassive = true;
        },
      })
    );
  } catch (e) {}

  var wheelOpt = supportsPassive ? { passive: false } : false;
  var wheelEvent =
    "onwheel" in document.createElement("div") ? "wheel" : "mousewheel";

  // call this to Disable
  function disableScroll() {
    window.addEventListener("DOMMouseScroll", preventDefault, false); // older FF
    window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
    window.addEventListener("touchmove", preventDefault, wheelOpt); // mobile
    window.addEventListener("keydown", preventDefaultForScrollKeys, false);
  }
  // call this to Enable
  function enableScroll() {
    window.removeEventListener("DOMMouseScroll", preventDefault, false);
    window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
    window.removeEventListener("touchmove", preventDefault, wheelOpt);
    window.removeEventListener("keydown", preventDefaultForScrollKeys, false);
  }
  useEffect(() => {
    if (click === "click") {
      disableScroll();
    }
    return () => enableScroll();
  }, [click]);

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
      <MyCardBtn setClick={setClick}/>
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
            <BookMark
              onClick={() => bookMarkOnClick()}
              nickName={
                bookMarkList &&
                bookMarkList.map((data) => data.nickname).includes(nickName)
                  ? true
                  : undefined
              }
            >
              <BsFillBookmarkFill />
            </BookMark>
            {retouch ? (
              <StatusMessage
                value={statusMsg || ""}
                onChange={(text) => statusMsgOnChange(text)}
                retouch={retouch}
              />
            ) : (
              <StatusMessage value={statusMsg || ""} disabled />
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
                  <img src={skillUrl} alt="사용언어" />
                </>
              )}
            </LanguageImg>
          </DefaultInfo>
          <SimpleSlider setRetouch={setRetouch} retouch={retouch} />
        </DetailContainer>
        <ReviewContainer>
          <CommentList />
        </ReviewContainer>
      </Detail>
      <Wrap>
        {cardList &&
          cardList.flat().map((data, index) => (
            <MemberCard
              className="card"
              key={index}
              onClick={(e) => cardOnClick(e, index, data)}
              nickName={
                bookMarkList &&
                bookMarkList
                  .map((data) => data.nickname)
                  .includes(data.nickname)
                  ? true
                  : undefined
              }
            >
              <Card className="front">
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

const Container = styled.div`
  position: relative;
  width: 100%;
  min-height: 90vh;
  background-color: ${({ theme }) => theme.colors.mainBackgroundColor};
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
      z-index: 3;
      background-color: rgba(0, 0, 0, 0.4);
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
      transform: rotateY(180deg);
    }
  }

  ${(props) =>
    props.nickName
      ? css`
          div {
            div {
              background-color: yellow;
              border-radius: 10px;
            }
          }
        `
      : css`
          div {
            div {
              background: #f6b8b8;
              border-radius: 10px;
            }
          }
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
  &:hover {
    transform: rotateY(180deg);
  }
`;
const Front = styled.div`
  position: absolute;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
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
  transform: rotateY(180deg);
`;

let scrollY = 0;
window.addEventListener("scroll", function () {
  scrollY = window.pageYOffset;
});
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
  flex: 1;
  width: 197px;
  font-size: 40px;
  svg {
    cursor: pointer;
  }
  ${(props) =>
    props.nickName
      ? css`
          color: #ff0000;
        `
      : css`
          color: #494949;
        `}
`;
const StatusMessage = styled.input`
  flex: 2;
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
  flex: 1;
  ${(props) =>
    props.retouch
      ? css`
          display: flex;
          flex-direction: column;
        `
      : css`
          display: flex;
          justify-content: flex-end;
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
  background-color: #0e0606;
  cursor: auto;
`;

export default MemberListPage;
