import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import SimpleSlider from "../components/Slide";
import { BsFillChatDotsFill } from "react-icons/bs";
import { useRecoilState, useSetRecoilState } from "recoil";
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
  memberListuseQuerygetBookMarkList,
  memberListUseQueryGetCardInfo,
  memberListUseQueryGetCardList,
} from "../apis/queries/memberListQuery";
import InfiniteScroll from "../components/infiniteScroll/InfiniteScroll";
import CommentList from "../components/comment/CommentList";
import { userBookMarkList } from "../store/userInfoAtom";
import { useMutationGetCardInfoComment } from "../apis/customQuery/memberListCustomQuery";
import { getCookieToken } from "../cookie/cookie";
import MyCardBtn from "../components/MyCardBtn";
import TopButton from "../components/TopButton";

const MemberListPage = () => {
  const [cardList, setCardList] = useRecoilState(list);
  //카드를 클릭한 상태인지 다시 닫은 상태인지 관리
  const [click, setClick] = useState();
  //클릭한 카드에 index번호 저장
  const [num, setNum] = useState();
  const setNickname = useSetRecoilState(nickNameText);
  //카드 정보를 수정중인지 아닌지 판별
  const [retouch, setRetouch] = useState(false);
  const setStatusMsg = useSetRecoilState(statusMessage);
  const setField = useSetRecoilState(position);
  const setTagList = useSetRecoilState(tag);
  const setIntroduce = useSetRecoilState(introduceText);
  const setImg = useSetRecoilState(imgSrc);
  const setSkillUrl = useSetRecoilState(skillSrc);
  const setSkill = useSetRecoilState(language);
  const setGithubId = useSetRecoilState(github);
  const setInstagramId = useSetRecoilState(instagram);
  const setTwitterId = useSetRecoilState(twitter);
  const setEaditCardId = useSetRecoilState(cardIdNum);

  const [pageNum, setPageNum] = useState(0);
  const [cardId, setCardId] = useRecoilState(cardIdNum);

  // 회원 카드 리스트 받아오기 react-query
  const { mutate: cardListInfo } = useMutation(
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
  const { mutate: cardInfo } = useMutation(
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

  const [bookMarkList, setBookList] = useRecoilState(userBookMarkList);
  //로그인한 유저에 즐겨찾기 리스트 가져오기 react-query
  const { mutate: bookList } = useMutation(
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
    setNickname(data.nickname);
    cardInfo(data.profileCardId);
    handleDetailCardComment(data.profileCardId);
    setImg(data.profileImage);
    setSkillUrl(data.skillImage);
    setNum(index);
    setClick("click");
  };

  //카드 모달 띄워져있을떈 스크롤 막기
  useEffect(() => {
    document.body.style.overflowY = "scroll";
    if (click === "click") {
      document.body.style.overflowY = "hidden";
    }
    return () => {
      document.body.style.overflowY = "hidden";
    };
  }, [click]);

  return (
    <Container>
      <TopButton />
      <MyCardBtn setClick={setClick} />
      <Background
        click={click ? click : undefined}
        onClick={() => backgrounOnClick()}
      />
      <Detail click={click ? click : undefined} scrollY={scrollY}>
        <DetailContainer>
          <DefaultInfo>
            <XBtnWrapper>
              <XBtn
                scrollY={scrollY}
                click={click ? click : undefined}
                onClick={() => XBtnOnClick()}
              >
                X
              </XBtn>
            </XBtnWrapper>
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
  display: none;
  width: 100%;
  height: 100%;
  background-color: transparent;
  transition: all 1s;
  ${(props) =>
    props.click &&
    css`
      display: block;
      z-index: 2;
      background-color: rgba(0, 0, 0, 0.7);
    `}
  ${(props) =>
    props.click === "reset"
      ? css`
          display: none;
          background-color: transparent;
        `
      : css``}
`;
const XBtnWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const XBtn = styled.button`
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
  padding: 10px 30px;
  width: 70%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  cursor: auto;
`;
const DefaultInfo = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 5%;
`;

const ReviewContainer = styled.div`
  width: 30%;
  height: 100%;
  background-color: #0e0606;
  cursor: auto;
`;

export default MemberListPage;
