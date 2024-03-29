import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { FaReact } from "@react-icons/all-files/fa/FaReact";
import { FaFigma } from "@react-icons/all-files/fa/FaFigma";
import { FaNodeJs } from "@react-icons/all-files/fa/FaNodeJs";
import { FaDatabase } from "@react-icons/all-files/fa/FaDatabase";
import { FaAngular } from "@react-icons/all-files/fa/FaAngular";
import { FaPhp } from "@react-icons/all-files/fa/FaPhp";
import { FaHtml5 } from "@react-icons/all-files/fa/FaHtml5";
import { FaCss3 } from "@react-icons/all-files/fa/FaCss3";
import { FaJava } from "@react-icons/all-files/fa/FaJava";
import { FaGithub } from "@react-icons/all-files/fa/FaGithub";
import { FaCopyright } from "@react-icons/all-files/fa/FaCopyright";
import { FaSwift } from "@react-icons/all-files/fa/FaSwift";
import { FaVuejs } from "@react-icons/all-files/fa/FaVuejs";
import { FaArrowDown } from "@react-icons/all-files/fa/FaArrowDown";
import profile1 from "../image/profileImage/profile1.webp";
import profile2 from "../image/profileImage/profile2.webp";
import profile3 from "../image/profileImage/profile3.webp";
import profile4 from "../image/profileImage/profile4.webp";
import profile5 from "../image/profileImage/profile5.webp";
import profile6 from "../image/profileImage/profile6.webp";
import profile7 from "../image/profileImage/profile7.webp";
import profile8 from "../image/profileImage/profile8.webp";
import profile9 from "../image/profileImage/profile9.webp";
import profile10 from "../image/profileImage/profile10.webp";
import profile11 from "../image/profileImage/profile11.webp";
import profile12 from "../image/profileImage/profile12.webp";
import profile13 from "../image/profileImage/profile13.webp";
import profile14 from "../image/profileImage/profile14.webp";
import profile15 from "../image/profileImage/profile15.webp";
import profile16 from "../image/profileImage/profile16.webp";
import { useNavigate } from "react-router";
export default function Intro() {
  const [arrow, setArrow] = useState(false);
  useEffect(() => {
    setTimeout(() => setArrow(true), 7600);
  }, []);
  const navigate = useNavigate();
  const navigateToHome = () => {
    navigate("/home");
  };
  return (
    <IntroContainer>
      <IntroOverlay>
        <OverlayTitleContainer className="first-title">
          <OverlayTitle>다른 개발자들</OverlayTitle>
          <span className="sub-title">을 보면서</span>
        </OverlayTitleContainer>
        <OverlayTitleContainer className="first-title">
          <span className="sub-title">궁금한 게 많으실 거예요</span>
        </OverlayTitleContainer>

        <OverlayTitleContainer className="title-margin second-title">
          <span className="sub-title">
            이 사람들은 대체 어떻게 <OverlayTitle>개발</OverlayTitle>하면서
            살까?
          </span>
        </OverlayTitleContainer>

        <OverlayTitleContainer className="second-title">
          <span className="sub-title ">
            <OverlayTitle>이력서</OverlayTitle>나&nbsp;
            <OverlayTitle>포트폴리오</OverlayTitle>는 어떻게 관리하지?
          </span>
        </OverlayTitleContainer>

        <OverlayTitleContainer className="title-margin last-title">
          <span className="sub-title">
            이곳에서 모든 궁금증이 다&nbsp;<OverlayTitle>해결</OverlayTitle>되실
            겁니다!
          </span>
        </OverlayTitleContainer>
      </IntroOverlay>
      <IntroWrapper>
        <IntroProfileWrapper className="grid-wrapper10">
          <IntroIconWrapper>
            <FaCss3 className="icon" />
          </IntroIconWrapper>
          <IntroProfileImage src={`${profile10}`} className="grid10" />
          <IntroProfileTitleContainer>
            <IntroProfileName>Tim</IntroProfileName>
            <IntroProfileJob>Css</IntroProfileJob>
          </IntroProfileTitleContainer>
        </IntroProfileWrapper>

        <IntroProfileWrapper className="grid-wrapper11">
          <IntroIconWrapper>
            <FaJava className="icon" />
          </IntroIconWrapper>
          <IntroProfileImage src={`${profile11}`} className="grid11" />
          <IntroProfileTitleContainer>
            <IntroProfileName>Stephanie</IntroProfileName>
            <IntroProfileJob>Java</IntroProfileJob>
          </IntroProfileTitleContainer>
        </IntroProfileWrapper>

        <IntroProfileWrapper className="grid-wrapper12">
          <IntroIconWrapper>
            <FaGithub className="icon" />
          </IntroIconWrapper>
          <IntroProfileImage src={`${profile12}`} className="grid12" />
          <IntroProfileTitleContainer>
            <IntroProfileName>God</IntroProfileName>
            <IntroProfileJob>Github</IntroProfileJob>
          </IntroProfileTitleContainer>
        </IntroProfileWrapper>

        <IntroProfileWrapper className="grid-wrapper13">
          <IntroIconWrapper>
            <FaCopyright className="icon" />
          </IntroIconWrapper>
          <IntroProfileImage src={`${profile13}`} className="grid13" />
          <IntroProfileTitleContainer>
            <IntroProfileName>Chorok</IntroProfileName>
            <IntroProfileJob>C</IntroProfileJob>
          </IntroProfileTitleContainer>
        </IntroProfileWrapper>

        <IntroProfileWrapper className="grid-wrapper9">
          <IntroIconWrapper>
            <FaHtml5 className="icon" />
          </IntroIconWrapper>
          <IntroProfileImage src={`${profile9}`} className="grid9" />
          <IntroProfileTitleContainer>
            <IntroProfileName>Sally</IntroProfileName>
            <IntroProfileJob>Html</IntroProfileJob>
          </IntroProfileTitleContainer>
        </IntroProfileWrapper>

        <IntroProfileWrapper className="grid-wrapper2">
          <IntroIconWrapper>
            <FaFigma className="icon" />
          </IntroIconWrapper>
          <IntroProfileImage src={`${profile2}`} className="grid2" />
          <IntroProfileTitleContainer>
            <IntroProfileName>Jenny</IntroProfileName>
            <IntroProfileJob>UI</IntroProfileJob>
          </IntroProfileTitleContainer>
        </IntroProfileWrapper>

        <IntroProfileWrapper className="grid-wrapper3">
          <IntroIconWrapper>
            <FaNodeJs className="icon" />
          </IntroIconWrapper>
          <IntroProfileImage src={`${profile3}`} className="grid3" />
          <IntroProfileTitleContainer>
            <IntroProfileName>Hoody</IntroProfileName>
            <IntroProfileJob>Back-end</IntroProfileJob>
          </IntroProfileTitleContainer>
        </IntroProfileWrapper>

        <IntroProfileWrapper className="grid-wrapper14">
          <IntroIconWrapper>
            <FaFigma className="icon" />
          </IntroIconWrapper>
          <IntroProfileImage src={`${profile14}`} className="grid14" />
          <IntroProfileTitleContainer>
            <IntroProfileName>Geum</IntroProfileName>
            <IntroProfileJob>UX</IntroProfileJob>
          </IntroProfileTitleContainer>
        </IntroProfileWrapper>

        <IntroProfileWrapper className="grid-wrapper8">
          <IntroIconWrapper>
            <FaAngular className="icon" />
          </IntroIconWrapper>
          <IntroProfileImage src={`${profile8}`} className="grid8" />
          <IntroProfileTitleContainer>
            <IntroProfileName>Joker</IntroProfileName>
            <IntroProfileJob>Angular</IntroProfileJob>
          </IntroProfileTitleContainer>
        </IntroProfileWrapper>

        <IntroProfileWrapper className="grid-wrapper1">
          <IntroIconWrapper>
            <FaReact className="icon" />
          </IntroIconWrapper>
          <IntroProfileImage src={`${profile1}`} className="grid1" />
          <IntroProfileTitleContainer>
            <IntroProfileName>Byung-ho</IntroProfileName>
            <IntroProfileJob>Rapper</IntroProfileJob>
          </IntroProfileTitleContainer>
        </IntroProfileWrapper>

        <IntroProfileWrapper className="grid-wrapper4">
          <IntroIconWrapper>
            <FaDatabase className="icon" />
          </IntroIconWrapper>
          <IntroProfileImage src={`${profile4}`} className="grid4" />
          <IntroProfileTitleContainer>
            <IntroProfileName>John</IntroProfileName>
            <IntroProfileJob>DB</IntroProfileJob>
          </IntroProfileTitleContainer>
        </IntroProfileWrapper>

        <IntroProfileWrapper className="grid-wrapper15">
          <IntroIconWrapper>
            <FaReact className="icon" />
          </IntroIconWrapper>
          <IntroProfileImage src={`${profile15}`} className="grid15" />
          <IntroProfileTitleContainer>
            <IntroProfileName>Wall</IntroProfileName>
            <IntroProfileJob>React</IntroProfileJob>
          </IntroProfileTitleContainer>
        </IntroProfileWrapper>

        <IntroProfileWrapper className="grid-wrapper7">
          <IntroIconWrapper>
            <FaPhp className="icon" />
          </IntroIconWrapper>
          <IntroProfileImage src={`${profile7}`} className="grid7" />
          <IntroProfileTitleContainer>
            <IntroProfileName>Ryan</IntroProfileName>
            <IntroProfileJob>Php</IntroProfileJob>
          </IntroProfileTitleContainer>
        </IntroProfileWrapper>

        <IntroProfileWrapper className="grid-wrapper6">
          <IntroIconWrapper>
            <FaVuejs className="icon" />
          </IntroIconWrapper>
          <IntroProfileImage src={`${profile6}`} className="grid6" />
          <IntroProfileTitleContainer>
            <IntroProfileName>Xia</IntroProfileName>
            <IntroProfileJob>Vue</IntroProfileJob>
          </IntroProfileTitleContainer>
        </IntroProfileWrapper>

        <IntroProfileWrapper className="grid-wrapper5">
          <IntroIconWrapper>
            <FaSwift className="icon" />
          </IntroIconWrapper>
          <IntroProfileImage src={`${profile5}`} className="grid5" />
          <IntroProfileTitleContainer>
            <IntroProfileName>Matter</IntroProfileName>
            <IntroProfileJob>Ios</IntroProfileJob>
          </IntroProfileTitleContainer>
        </IntroProfileWrapper>

        <IntroProfileWrapper className="grid-wrapper16">
          <IntroIconWrapper>
            <FaJava className="icon" />
          </IntroIconWrapper>
          <IntroProfileImage src={`${profile16}`} className="grid16" />
          <IntroProfileTitleContainer>
            <IntroProfileName>tupac</IntroProfileName>
            <IntroProfileJob>Java</IntroProfileJob>
          </IntroProfileTitleContainer>
        </IntroProfileWrapper>
      </IntroWrapper>
      <PageRouterButtonContainer>
        <ArrowContainer>
          {arrow === true && <FaArrowDown className="icon" />}
        </ArrowContainer>
        <PageRouterButton className="button-86" onClick={navigateToHome}>
          시작하기
        </PageRouterButton>
      </PageRouterButtonContainer>
    </IntroContainer>
  );
}
const gridAnimation = keyframes`
  from{ 
    opacity: 0;
    display:none;
  }
  to{
    opacity: 1;
    display:flex;
  }
`;
const overlayAnimation = keyframes`
  from{ 
    opacity: 0;
  }
  to{
    opacity: 1;
  }
`;
const arrowAnimation = keyframes`
  0% {
    margin-top: 0px;
    opacity: 0;
    }
	100% {
    margin-top: 20px;
    opacity: 1;
    }
`;

const IntroContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.mainBackgroundColor};
  position: relative;
  @media ${(props) => props.theme.mobile} {
    padding: 50px 0;
  }
`;
const IntroOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  animation: ${overlayAnimation} 1s ease forwards;
  animation-delay: 5s;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 3;
  opacity: 0;
  .title-margin {
    margin-top: 80px;
  }
  .first-title {
    animation: ${overlayAnimation} 1s ease forwards;
    animation-delay: 5.3s;
  }
  .second-title {
    animation: ${overlayAnimation} 1s ease forwards;
    animation-delay: 6.3s;
  }
  .last-title {
    animation: ${overlayAnimation} 1s ease forwards;
    animation-delay: 7.3s;
  }

  @media ${(props) => props.theme.mobile} {
    .title-margin {
      margin-top: 50px;
      padding: 0;
    }
  }
`;
const OverlayTitleContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.white};
  opacity: 0;
  .sub-title {
    font-size: ${({ theme }) => theme.fontSizes.subTitleSize};
  }
  @media ${(props) => props.theme.mobile} {
    .sub-title {
      font-size: ${({ theme }) => theme.fontSizes.base};
    }
  }
`;
const OverlayTitle = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.titleSize};
  font-weight: bold;
  @media ${(props) => props.theme.mobile} {
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }
`;
const IntroWrapper = styled.div`
  width: 50%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  gap: 10px;
  padding: 20px 0;
  @media ${(props) => props.theme.mobile} {
    width: 100%;
    column-gap: 5px;
    row-gap: 5px;
  }
  .grid-wrapper1 {
    animation-delay: 0.3s;
  }
  .grid-wrapper2 {
    animation-delay: 0.5s;
  }
  .grid-wrapper3 {
    animation-delay: 0.8s;
  }
  .grid-wrapper4 {
    animation-delay: 1.2s;
  }
  .grid-wrapper5 {
    animation-delay: 1.5s;
  }
  .grid-wrapper6 {
    animation-delay: 1.8s;
  }
  .grid-wrapper7 {
    animation-delay: 2.1s;
  }
  .grid-wrapper8 {
    animation-delay: 2.4s;
  }
  .grid-wrapper9 {
    animation-delay: 2.7s;
  }
  .grid-wrapper10 {
    animation-delay: 3s;
  }
  .grid-wrapper11 {
    animation-delay: 3.3s;
  }
  .grid-wrapper12 {
    animation-delay: 3.6s;
  }
  .grid-wrapper13 {
    animation-delay: 3.9s;
  }
  .grid-wrapper14 {
    animation-delay: 4.2s;
  }
  .grid-wrapper15 {
    animation-delay: 4.5s;
  }
  .grid-wrapper16 {
    animation-delay: 4.8s;
  }
`;
const IntroProfileWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  border-radius: 10px;
  padding-top: 30px;
  background-color: black;
  animation: ${gridAnimation} 1s forwards;
  opacity: 0;
  .icon {
    width: 30px;
    height: 30px;
    color: white;
  }
  @media ${(props) => props.theme.mobile} {
    width: 100%;
    height: 60%;
    .icon {
      width: 15px;
      height: 15px;
    }
    padding: 0;
  }
`;
const IntroIconWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  position: absolute;
  right: 30px;
  top: 25px;
  @media ${(props) => props.theme.mobile} {
    right: 5px;
    top: 5px;
  }
`;

const IntroProfileImage = styled.img`
  width: 40%;
  height: 40%;
  object-fit: cover;
  @media ${(props) => props.theme.mobile} {
    width: 40px;
    height: 40px;
    margin-top: 40px;
  }
`;
const IntroProfileTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  font-weight: bold;
`;
const IntroProfileName = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.name};
  color: ${({ theme }) => theme.colors.white};
  @media ${(props) => props.theme.mobile} {
    font-size: ${({ theme }) => theme.mobileFontSizes.base};
  }
`;
const IntroProfileJob = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.small};
  color: ${({ theme }) => theme.colors.subColor1};
  margin-bottom: 10px;
  @media ${(props) => props.theme.mobile} {
    font-size: ${({ theme }) => theme.mobileFontSizes.base};
  }
`;
const PageRouterButtonContainer = styled.div`
  position: absolute;
  bottom: 100px;
  right: 100px;
  z-index: 4;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  .button-86 {
    all: unset;
    width: 100px;
    height: 30px;
    font-size: 18px;
    background: transparent;
    border: none;
    position: relative;
    cursor: pointer;
    z-index: 1;
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    font-weight: bold;
  }

  .button-86::after,
  .button-86::before {
    content: "";
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: -99999;
    transition: all 0.4s;
  }

  .button-86::before {
    transform: translate(0%, 0%);
    width: 100%;
    height: 100%;
    background: #28282d;
    border-radius: 10px;
  }

  .button-86::after {
    transform: translate(10px, 10px);
    width: 35px;
    height: 35px;
    background: #cbc1c1d3;
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border-radius: 50px;
  }

  .button-86:hover::before {
    transform: translate(5%, 20%);
    width: 110%;
    height: 110%;
  }

  .button-86:hover::after {
    border-radius: 10px;
    transform: translate(0, 0);
    width: 100%;
    height: 100%;
  }

  .button-86:active::after {
    transition: 0s;
    transform: translate(0, 5%);
  }
  @media ${(props) => props.theme.mobile} {
    right: 10px;
    bottom: 20px;
    .button-86::after {
      display: none;
    }
    .button-86 {
      all: unset;
      width: 50px;
      height: 10px;
      font-size: 12px;
      background: transparent;
      border: none;
      position: relative;
      z-index: 1;
      padding: 10px 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      white-space: nowrap;
      user-select: none;
      -webkit-user-select: none;
      touch-action: manipulation;
      font-weight: bold;
    }
  }
`;
const PageRouterButton = styled.button``;
const ArrowContainer = styled.div`
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  .icon {
    width: 40px;
    height: 40px;
    animation: ${arrowAnimation} 0.5s linear 0s infinite alternate;
  }
  @media ${(props) => props.theme.mobile} {
    width: 50px;
    height: 50px;
    .icon {
      width: 20px;
      height: 20px;
    }
  } ;
`;
