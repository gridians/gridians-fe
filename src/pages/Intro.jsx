import React from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import githubIcon from "../image/githubIcon.png";

export default function Intro() {
  return (
    <IntroContainer>
      <IntroCircleContainer></IntroCircleContainer>
      <Backdrop>
        <BackdropLeftBracket>{"{"}</BackdropLeftBracket>

        <BackdropSpanContainer>
          <BackdropSpan>getProfile();</BackdropSpan>
          <BackdropStartSpan>
            <StyledLink to="/home">
              <span className="span1">{"→"}</span>
              <span className="span2">S</span>
              <span className="span3">t</span>
              <span className="span4">a</span>
              <span className="span5">r</span>
              <span className="span6">t</span>
              <span className="span7">()</span>
              <span className="span8">;</span>
              <span style={{ visibility: "hidden" }}>;</span>
            </StyledLink>
          </BackdropStartSpan>
        </BackdropSpanContainer>

        <BackdropRightBracket>{"}"}</BackdropRightBracket>
      </Backdrop>
    </IntroContainer>
  );
}

const IntroContainer = styled.div`
  width: 100%;
  height: 90vh;
  position: relative;
  overflow: hidden;
`;
const IntroCircleContainer = styled.div`
  width: 500px;
  height: 500px;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-20%, -25%);
  background-image: url(${githubIcon});
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
`;

const typing = keyframes`
   from {
    width: 0;
    border-right: 3px solid;
  }
`;

const blink = keyframes`
  0%{
    border: 3px solid;
  }
  50%{
    border-color: transparent;
  }
  100%{
    border:none;
  }
`;

const typing1 = keyframes`
  from {
    width: 0;
    visibility: visible;
    pointer-events: none;
  }
  to{
    pointer-events: none;
  }
`;

const blink1 = keyframes`
  0%{
    visibility: visible;
  }
  50%{
    border-color: transparent;
    visibility: visible;
  }
  100%{
    visibility: visible;
  }
`;
const Backdrop = styled.div`
  width: 700px;
  height: 700px;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #d6bebf;
`;
const BackdropSpanContainer = styled.div`
  width: 100%;
  transform: rotate(-10deg);
  display: flex;
  flex-direction: column;
`;
const BackdropSpan = styled.span`
  font-size: 8em;
  color: ${({ theme }) => theme.colors.white};
  width: 10ch;
  padding-bottom: 10px;
  font-weight: bold;
  text-shadow: 7px 7px 4px gray;
  overflow: hidden;
  margin-top: 100px;
  animation: ${typing} 3s steps(30), ${blink} 0.5s step-end backwards alternate;
`;
const BackdropStartSpan = styled.div`
  font-size: 8em;
  color: ${({ theme }) => theme.colors.white};
  width: 6ch;
  padding-bottom: 20px;
  font-weight: bold;
  text-shadow: 7px 7px 4px gray;
  border-right: 3px solid;
  overflow: hidden;
  visibility: hidden;
  animation: ${typing1} 3s steps(22), ${blink1} 0.5s step-end infinite alternate;
  animation-delay: 3s;
  position: relative;

  .span1 {
    display: none;
  }
  &:hover {
    overflow: visible;
    border: none;
    cursor: pointer;
    .span1 {
      position: absolute;
      transition-property: display margin-top rotate;
      transition-duration: 0.5s;
      transform: rotate(-20deg);
      margin-top: 60px;
      display: flex;
    }
    .span2 {
      position: absolute;
      transform: rotate(-40deg);
      transition-property: margin rotate;
      transition-duration: 0.5s;
      margin-bottom: 60px;
      margin-left: 100px;
    }
    .span3 {
      position: absolute;
      transition-property: margin rotate;
      transition-duration: 0.5s;
      transform: rotate(20deg);
      margin-top: 60px;
      margin-left: 200px;
    }
    .span4 {
      position: absolute;
      transition-property: margin rotate;
      transition-duration: 0.5s;
      transform: rotate(-30deg);
      margin-bottom: 60px;
      margin-left: 300px;
    }
    .span5 {
      position: absolute;
      transition-property: margin rotate;
      transition-duration: 0.5s;
      transform: rotate(20deg);
      margin-top: 60px;
      margin-left: 400px;
    }
    .span6 {
      position: absolute;
      transition-property: margin rotate;
      transition-duration: 0.5s;
      margin-top: 60px;
      margin-left: 500px;
      transform: rotate(20deg);
      display: flex;
    }
    .span7 {
      display: none;
    }
    .span8 {
      display: none;
    }
  }
`;
const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.colors.white};
`;
const BackdropLeftBracket = styled.span`
  position: absolute;
  font-size: 8em;
  color: ${({ theme }) => theme.colors.white};
  width: 10ch;
  font-weight: bold;
  transform: rotate(-10deg);
  text-shadow: 7px 7px 4px gray;
  top: 100px;
  right: 0px;
`;
const BackdropRightBracket = styled.span`
  position: absolute;
  font-size: 8em;
  color: ${({ theme }) => theme.colors.white};
  width: 10ch;
  font-weight: bold;
  transform: rotate(-10deg);
  text-shadow: 7px 7px 4px gray;
  bottom: 100px;
  left: 650px;
`;
