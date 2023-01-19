import React from "react";
import styled, { keyframes } from "styled-components";

export default function Intro() {
  return (
    <IntroContainer>
      <IntroWrapper>
        <IntroGrid className="grid10"></IntroGrid>
        <IntroGrid className="grid11"></IntroGrid>
        <IntroGrid className="grid12"></IntroGrid>
        <IntroGrid className="grid13"></IntroGrid>
        <IntroGrid className="grid9"></IntroGrid>
        <IntroGrid className="grid2"></IntroGrid>
        <IntroGrid className="grid3"></IntroGrid>
        <IntroGrid className="grid14"></IntroGrid>
        <IntroGrid className="grid8"></IntroGrid>
        <IntroGrid className="grid1"></IntroGrid>
        <IntroGrid className="grid4"></IntroGrid>
        <IntroGrid className="grid15"></IntroGrid>
        <IntroGrid className="grid7"></IntroGrid>
        <IntroGrid className="grid6"></IntroGrid>
        <IntroGrid className="grid5"></IntroGrid>
        <IntroGrid className="grid16"></IntroGrid>
      </IntroWrapper>
    </IntroContainer>
  );
}
const gridAnimation = keyframes`
  from{ opacity:0;}
  to{ opacity:1;}
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
  height: 80%;
  border: 1px solid black;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
`;
const IntroGrid = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid red;
  animation: ${gridAnimation} 1s;
`;
