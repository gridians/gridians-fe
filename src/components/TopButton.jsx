import React from "react";
import styled, { keyframes } from "styled-components";
import { BsArrowUp } from "react-icons/bs";

const TopButton = () => {
  const topBtnOnClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <TopBtn onClick={() => topBtnOnClick()}>
      <BsArrowUp />
      <span>Top</span>
    </TopBtn>
  );
};

const arrow = keyframes`
    0%{
        top: -100%;
    }
    100%{
        top: -150%;
    }
`;

const TopBtn = styled.button`
  position: fixed;
  top: 85vh;
  right: 3%;
  width: 40px;
  background-color: transparent;
  border: none;
  font-size: ${({ theme }) => theme.fontSizes.xxxl};
  cursor: pointer;
  &:hover {
    font-size: ${({ theme }) => theme.fontSizes.name};
    svg {
      top: -100%;
      animation: null;
    }
  }
  svg {
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: ${({ theme }) => theme.fontSizes.xxxl};
    animation: ${arrow} 0.8s ease-in-out infinite alternate;
    animation-iteration-count: infinite;
  }
`;

export default TopButton;
