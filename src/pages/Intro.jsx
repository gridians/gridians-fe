import React from "react";
import styled from "styled-components";

export default function Intro() {
  return (
    <IntroContainer>
      <IntroCircleContainer></IntroCircleContainer>
      <Backdrop>
        <BackdropSpan>getMember();</BackdropSpan>
      </Backdrop>
    </IntroContainer>
  );
}

const IntroContainer = styled.div`
  width: 100%;
  height: 90vh;
  position: relative;
`;
const IntroCircleContainer = styled.div`
  width: 600px;
  height: 600px;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-20%, -25%);
  background-image: url("https://seeklogo.com/images/G/github-logo-5F384D0265-seeklogo.com.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
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
  /* filter: blur(5px);
  -webkit-filter: blur(5px); */
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #d6bebf; ;
`;
const BackdropSpan = styled.span`
  font-size: 9em;
  color: ${({ theme }) => theme.colors.white};
  font-weight: bold;
  transform: rotate(-10deg);
  text-shadow: 7px 7px 4px gray;
  margin-bottom: 50px;
`;
