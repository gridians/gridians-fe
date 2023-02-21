import React from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import Swal from "sweetalert2";
import { memberListuseMutationGetCardInfo } from "../apis/queries/memberListQuery";
import { getCookieToken } from "../cookie/cookie";
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
} from "../store/cardInfoAtom";

const MyCardBtn = ({ setClick }) => {
  const navigate = useNavigate();

  const [statusMsg, setStatusMsg] = useRecoilState(statusMessage);
  const [field, setField] = useRecoilState(position);
  const [skill, setSkill] = useRecoilState(language);
  const [tagList, setTagList] = useRecoilState(tag);
  const [imgUrl, setImgUrl] = useRecoilState(imgSrc);
  const [skillUrl, setSkillUrl] = useRecoilState(skillSrc);
  const [nickName, setNickName] = useRecoilState(nickNameText);
  const [introduce, setIntroduce] = useRecoilState(introduceText);
  const [githubId, setGithubId] = useRecoilState(github);
  const [instagramId, setInstagramId] = useRecoilState(instagram);
  const [twitterId, setTwitterId] = useRecoilState(twitter);
  const [cardId, setCardId] = useRecoilState(cardIdNum);

  const { mutate: cardInfo, isLoading: cardInfoLoading } = useMutation(
    "cardInfo",
    () => memberListuseMutationGetCardInfo(),
    {
      onSuccess: (res) => {
        console.log(res);
        setCardId(res.profileCardId);
        setField(res.field);
        setIntroduce(res.introduction);
        setSkill(res.skill);
        setStatusMsg(res.statusMessage);
        setTagList(res.tagSet);
        setImgUrl(res.profileImage);
        setSkillUrl(res.skillImage);
        setNickName(localStorage.getItem("name"));
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
        confirmButtonText: "로그인하기",
        cancelButtonText: "NO",
        padding: "2em",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
        closeOnClickOutside: false,
      }).then((data) => {
        if (data.isConfirmed) navigate("/login");
      });
    }
  };

  return (
    <MyCardButton onClick={() => myCardOnClick()}>
      <span>MyCard</span>
    </MyCardButton>
  );
};

const MyCardButton = styled.button`
  position: fixed;
  top: 85vh;
  right: 10%;
  background: ${({ theme }) => theme.colors.subColor2};
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
  }
`;

export default MyCardBtn;
