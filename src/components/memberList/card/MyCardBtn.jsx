import React from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import Swal from "sweetalert2";
import { memberListuseMutationGetCardInfo } from "../../../apis/queries/memberListQuery";
import { getCookieToken } from "../../../cookie/cookie";
import { FaUserAlt } from "react-icons/fa";
import {
  cardIdNum,
  github,
  imgSrc,
  instagram,
  introduceText,
  language,
  nickNameText,
  position,
  skillSrc,
  statusMessage,
  tag,
  twitter,
} from "../../../store/cardInfoAtom";
import {
  follower,
  following,
  githubAccount,
  githubConnection,
  githubProfileImageUrl,
  recentCommitMessage,
} from "../../../store/githubInfoAtom";

const MyCardBtn = ({ setClick }) => {
  const navigate = useNavigate();
  // const setStatusMsg = useSetRecoilState(statusMessageSelector);

  const setStatusMsg = useSetRecoilState(statusMessage);
  const setField = useSetRecoilState(position);
  const setSkill = useSetRecoilState(language);
  const setTagList = useSetRecoilState(tag);
  const setImgUrl = useSetRecoilState(imgSrc);
  const setSkillUrl = useSetRecoilState(skillSrc);
  const setNickName = useSetRecoilState(nickNameText);
  const setIntroduce = useSetRecoilState(introduceText);
  const setGithubId = useSetRecoilState(github);
  const setInstagramId = useSetRecoilState(instagram);
  const setTwitterId = useSetRecoilState(twitter);
  const setCardId = useSetRecoilState(cardIdNum);
  //github 관련 recoil
  const setGithubConnection = useSetRecoilState(githubConnection);
  const setLastCommitMsg = useSetRecoilState(recentCommitMessage);
  const setGithubProfileImgUrl = useSetRecoilState(githubProfileImageUrl);
  const setFollower = useSetRecoilState(follower);
  const setFollowing = useSetRecoilState(following);
  const setGithubName = useSetRecoilState(githubAccount);

  const { mutate: cardInfo } = useMutation(
    "cardInfo",
    () => memberListuseMutationGetCardInfo(),
    {
      onError: (err) => {
        console.log(err);
      },
      onSuccess: (res) => {
        console.log(res);
        setGithubName(res.githubAccount);
        setFollower(res.follower);
        setFollowing(res.following);
        setGithubProfileImgUrl(res.githubProfileImageUrl);
        setLastCommitMsg(res.recentCommitMessage);
        setGithubConnection(res.hasGithub);
        setNickName(res.nickname);
        setCardId(res.profileCardId);
        setField(res.field);
        setIntroduce(res.introduction);
        setSkill(res.skill);
        setStatusMsg(res.statusMessage);
        setTagList(res.tagSet);
        setImgUrl(res.profileImage);
        setSkillUrl(res.skillImage);
        res.snsSet.map((data) => {
          if (data.name === "twitter") return setTwitterId(data.account);
          if (data.name === "github") return setGithubId(data.account);
          else return setInstagramId(data.account);
        });
      },
    }
  );

  const myCardOnClick = () => {
    if (getCookieToken("accessToken")) {
      cardInfo();
      setClick("click");
    } else {
      Swal.fire({
        title: "로그인을 해주세요",
        confirmButtonColor: "#DCC6C6",
        cancelButtonColor: "#738598",
        showCancelButton: true,
        confirmButtonText: "로그인",
        cancelButtonText: "취소",
        padding: "2em",
        closeOnClickOutside: false,
      }).then((data) => {
        if (data.isConfirmed) navigate("/login");
      });
    }
  };

  return (
    <MyCardButton onClick={() => myCardOnClick()}>
      <FaUserAlt />
    </MyCardButton>
  );
};

const MyCardButton = styled.button`
  position: fixed;
  top: 90vh;
  right: 3%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  background-color: white;
  border-radius: 50%;
  color: #000000;
  font-size: ${({ theme }) => theme.fontSizes.name};
  cursor: pointer;
  /*background: ${({ theme }) => theme.colors.subColor2};
   width: 80px;
  height: 80px;
  border: none;
  transition: all 0.5s;
  cursor: pointer;
  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 80px;
    height: 80px;
    background: ${({ theme }) => theme.colors.subColor2};
    transition: all 0.5s;
  }
  &::before {
    transform: rotate(30deg);
  }
  &::after {
    transform: rotate(60deg);
  }
  &:hover {
    scale: 0.8;
    transform: rotate(45deg);
    &::before,
    &::after {
      scale: 0.8;
      transform: rotate(90deg);
    }
    span {
      transform: rotate(-45deg) translate(-25%, -120%);
    }
  }
  span {
    position: absolute;
    z-index: 1;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: ${({ theme }) => theme.fontSizes.xl};
    font-weight: bold;
  } */
`;

export default MyCardBtn;
