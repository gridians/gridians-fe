import React from "react";
import styled, { keyframes } from "styled-components";
import { BsArrowUp } from "react-icons/bs";
import { MdKeyboardArrowUp } from "react-icons/md";

const TopButton = () => {
  const topBtnOnClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <TopBtn onClick={() => topBtnOnClick()}>
      <MdKeyboardArrowUp />
    </TopBtn>
  );
};

const arrow = keyframes`
    0%{
        top: -70%;
    }
    100%{
        top: -115%;
    }
`;

const TopBtn = styled.button`
  position: fixed;
  top: 83vh;
  right: 3%;
  display: flex;
  justify-content: center;
  width: 60px;
  height: 60px;
  background-color: white;
  border-radius: 50%;
  color: #414141;
  font-size: ${({ theme }) => theme.fontSizes.titleSize};
  cursor: pointer;
  &:hover {
    font-size: ${({ theme }) => theme.fontSizes.name};
    svg {
      top: -90%;
      animation: null;
    }
  }
  svg{
    margin-top:3px;
  }
  /* svg {
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: ${({ theme }) => theme.fontSizes.xxxl};
    animation: ${arrow} 0.8s ease-in-out infinite alternate;
    animation-iteration-count: infinite;
  } */
`;

export default TopButton;
