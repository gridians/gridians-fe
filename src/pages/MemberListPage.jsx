import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import SimpleSlider from "../components/memberList/card/Slide";
import { BsFillChatDotsFill } from "react-icons/bs";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  cardClick,
  cardIdNum,
  cardReset,
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
import CommentList from "../components/memberList/comment/CommentList";
import { userBookMarkList } from "../store/userInfoAtom";
import { getCookieToken } from "../cookie/cookie";
import MyCardBtn from "../components/memberList/card/MyCardBtn";
import TopButton from "../components/memberList/card/TopButton";

import {
  follower,
  following,
  githubAccount,
  githubConnection,
  githubProfileImageUrl,
  recentCommitMessage,
} from "../store/githubInfoAtom";

const MemberListPage = () => {
  const [cardList, setCardList] = useRecoilState(list);
  //카드를 클릭한 상태인지 다시 닫은 상태인지 관리
  const [click, setClick] = useRecoilState(cardClick);
  //클릭한 카드에 index번호 저장
  const [num, setNum] = useState();
  const setNickname = useSetRecoilState(nickNameText);
  //카드 정보를 수정중인지 아닌지 판별
  const [retouch, setRetouch] = useRecoilState(cardReset);
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
  //깃헙 관련 recoil
  const setgithubConnection = useSetRecoilState(githubConnection);
  const setLastCommitMsg = useSetRecoilState(recentCommitMessage);
  const setGithubProfileImgUrl = useSetRecoilState(githubProfileImageUrl);
  const setFollower = useSetRecoilState(follower);
  const setFollowing = useSetRecoilState(following);
  const setGithubName = useSetRecoilState(githubAccount);

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
    cardListInfo(pageNum);
    setPageNum(pageNum + 1);
  }, []);

  //회원 카드 상세정보 가져오기 react-query
  const { mutate: cardInfo } = useMutation(
    "cardInfo",
    (index) => memberListUseQueryGetCardInfo(index),
    {
      onSuccess: (res) => {
        setGithubName(res.githubAccount);
        setFollower(res.follower);
        setFollowing(res.following);
        setGithubProfileImgUrl(res.githubProfileImageUrl);
        setLastCommitMsg(res.recentCommitMessage);
        setgithubConnection(res.hasGithub);
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
  const cardOnClick = (e, index, data) => {
    setEaditCardId(data.profileCardId);
    setCardId(data.profileCardId);
    setNickname(data.nickname);
    cardInfo(data.profileCardId);
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
                  <SkillWrapper>
                    <Skill>
                      <img src={data.skillImage} alt="34" />
                    </Skill>
                  </SkillWrapper>
                  {data.hasProfileImage === true ? (
                    <ProfileImg>
                      <img src={data.profileImage} alt="안나와여" />
                    </ProfileImg>
                  ) : (
                    <ProfileImg className="baseProfileImage">
                      <img src={data.profileImage} alt="안나와여" />
                    </ProfileImg>
                  )}

                  <NicknameWrapper>
                    <Nickname>{data.nickname}</Nickname>
                    <Role>{data.field}</Role>
                  </NicknameWrapper>
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
  width: 50%;
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

const MemberCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  aspect-ratio: auto 1/1;
  background-color: transparent;
  transition: all 0.1s;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    scale: 1.1;
    color: red;
  }
  ${(props) =>
    props.nickName
      ? css`
          div {
            div:nth-child(1) {
              background-color: #f9e000;
              border-radius: 30px;
            }
          }
        `
      : css`
          div {
            div:nth-child(1) {
              background-color: white;
              border-radius: 30px;
            }
          }
        `}
`;
const Card = styled.div`
  width: 100%;
  height: 100%;
  color: black;
  transform-style: preserve-3d;
  transition: all 0.5s;
`;
const Front = styled.div`
  position: absolute;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  height: 100%;
  transition: all 0.5s ease-in-out;
  backface-visibility: hidden;
  .baseProfileImage {
    img {
      width: 100%;
      height: 100%;
      border-radius: 0;
    }
  }
`;
const SkillWrapper = styled.div`
  width: 70%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
const Skill = styled.div`
  width: 28px;
  img {
    width: 100%;
    height: 100%;
  }
`;
const ProfileImg = styled.div`
  width: 33%;
  height: 33%;
  img {
    max-width: 100%;
    height: 100%;
    border-radius: 50%;
  }
`;
const NicknameWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 20px;
  height: 20%;
`;
const Nickname = styled.span`
  font-weight: 900;
  font-size: ${({ theme }) => theme.fontSizes.xl};
`;
const Role = styled.h5`
  color: #505050;
  font-weight: lighter;
  margin-top: 5px;
  /* font-size: ${({ theme }) => theme.fontSizes.small}; */
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
  padding: 10px;
  width: 70%;
  height: 100%;
  background: rgb(0 0 0 / 98%);
  cursor: auto;
`;
const DefaultInfo = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 0;
`;

const ReviewContainer = styled.div`
  width: 30%;
  height: 100%;
  background: rgb(0 0 0 / 95%);
  cursor: auto;
`;

export default MemberListPage;
