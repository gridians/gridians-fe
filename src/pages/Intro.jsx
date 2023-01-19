import React from "react";
import styled, { keyframes } from "styled-components";
import { FaReact } from "react-icons/fa";
import profile1 from "../image/profileImage/profile1.png";
import profile2 from "../image/profileImage/profile2.png";
import profile3 from "../image/profileImage/profile3.png";
import profile4 from "../image/profileImage/profile4.png";
import profile5 from "../image/profileImage/profile5.png";
import profile6 from "../image/profileImage/profile6.png";
import profile7 from "../image/profileImage/profile7.png";
import profile8 from "../image/profileImage/profile8.png";
import profile9 from "../image/profileImage/profile9.png";
import profile10 from "../image/profileImage/profile10.png";
import profile11 from "../image/profileImage/profile11.png";
import profile12 from "../image/profileImage/profile12.png";
import profile13 from "../image/profileImage/profile13.png";
import profile14 from "../image/profileImage/profile14.png";
import profile15 from "../image/profileImage/profile15.png";
import profile16 from "../image/profileImage/profile16.png";
export default function Intro() {
  return (
    <IntroContainer>
      <IntroWrapper>
        <IntroProfileWrapper>
          <IntroProfileImage className="grid10"></IntroProfileImage>
        </IntroProfileWrapper>
        <IntroProfileWrapper>
          <IntroProfileImage className="grid11"></IntroProfileImage>
        </IntroProfileWrapper>
        <IntroProfileWrapper>
          <IntroProfileImage className="grid12"></IntroProfileImage>
        </IntroProfileWrapper>
        <IntroProfileWrapper>
          <IntroProfileImage className="grid13"></IntroProfileImage>
        </IntroProfileWrapper>
        <IntroProfileWrapper>
          <IntroProfileImage className="grid9"></IntroProfileImage>
        </IntroProfileWrapper>
        <IntroProfileWrapper>
          <IntroProfileImage className="grid2"></IntroProfileImage>
        </IntroProfileWrapper>
        <IntroProfileWrapper>
          <IntroProfileImage className="grid3"></IntroProfileImage>
        </IntroProfileWrapper>
        <IntroProfileWrapper>
          <IntroProfileImage className="grid14"></IntroProfileImage>
        </IntroProfileWrapper>
        <IntroProfileWrapper>
          <IntroProfileImage className="grid8"></IntroProfileImage>
        </IntroProfileWrapper>
        <IntroProfileWrapper>
          <IntroIconWrapper>
            <FaReact className="icon" />
          </IntroIconWrapper>
          <IntroProfileImage className="grid1"></IntroProfileImage>
          <IntroProfileTitleContainer>
            <IntroProfileName>Byung-ho</IntroProfileName>
            <IntroProfileJob>developer</IntroProfileJob>
          </IntroProfileTitleContainer>
        </IntroProfileWrapper>
        <IntroProfileWrapper>
          <IntroProfileImage className="grid4"></IntroProfileImage>
        </IntroProfileWrapper>
        <IntroProfileWrapper>
          <IntroProfileImage className="grid15"></IntroProfileImage>
        </IntroProfileWrapper>
        <IntroProfileWrapper>
          <IntroProfileImage className="grid7"></IntroProfileImage>
        </IntroProfileWrapper>
        <IntroProfileWrapper>
          <IntroProfileImage className="grid6"></IntroProfileImage>
        </IntroProfileWrapper>
        <IntroProfileWrapper>
          <IntroProfileImage className="grid5"></IntroProfileImage>
        </IntroProfileWrapper>
        <IntroProfileWrapper>
          <IntroProfileImage className="grid16"></IntroProfileImage>
        </IntroProfileWrapper>
      </IntroWrapper>
    </IntroContainer>
  );
}
const gridAnimation = keyframes`
  from{ 
    opacity:0;
      background-color: black;
  }
  to{
    opacity:1;
      background-color: transparent;
  }
`;
const IntroContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const IntroWrapper = styled.div`
  width: 50%;
  height: 100%;
  border: 1px solid black;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  gap: 10px;
  border: 1px solid black;
  padding: 20px;

  .grid1 {
    animation-delay: 0.5s;
    background-image: url(${profile1});
    background-position: center;
    background-size: 80%;
    background-repeat: no-repeat;
  }
  .grid2 {
    animation-delay: 1s;
    background-color: black;
  }
  .grid3 {
    animation-delay: 1.5s;
    background-color: black;
  }
  .grid4 {
    animation-delay: 2s;
    background-color: black;
  }
  .grid5 {
    animation-delay: 2.5s;
    background-color: black;
  }
  .grid6 {
    animation-delay: 3s;
    background-color: black;
  }
  .grid7 {
    animation-delay: 3.5s;
    background-color: black;
  }
  .grid8 {
    animation-delay: 4s;
    background-color: black;
  }
  .grid9 {
    animation-delay: 4.5s;
    background-color: black;
  }
  .grid10 {
    animation-delay: 5s;
    background-color: black;
  }
  .grid11 {
    animation-delay: 5.5s;
    background-color: black;
  }
  .grid12 {
    animation-delay: 6s;
    background-color: black;
  }
  .grid13 {
    animation-delay: 6.5s;
    background-color: black;
  }
  .grid14 {
    animation-delay: 7s;
    background-color: black;
  }
  .grid15 {
    animation-delay: 7.5s;
    background-color: black;
  }
  .grid16 {
    animation-delay: 8s;
    background-color: black;
  }
`;
const IntroProfileWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  position: relative;
  border-radius: 10px;

  .icon {
    /* size: 24; */
    width: 40px;
    height: 40px;
    color: white;
  }
`;
const IntroIconWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  position: absolute;
  right: 10px;
  top: 10px;
`;
const IntroProfileImage = styled.div`
  width: 100%;
  height: 100%;
  animation: ${gridAnimation} 1s forwards;
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
  font-size: ${({ theme }) => theme.fontSizes.xxxl};
  margin-bottom: 5px;
`;
const IntroProfileJob = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.small};
`;
