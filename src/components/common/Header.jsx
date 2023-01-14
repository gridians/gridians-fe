import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Header = () => {
  if (window.location.pathname === "/") return null;
  return (
    <HeaderBox>
      <HeaderWrap>
        <Link to="/">
          <Logo>Devember</Logo>
        </Link>
        <Menu>
          <Link to="/home">Home</Link>
          <Link to="/register">SignUp</Link>
          <Link to="/home">Enroll</Link>
        </Menu>
      </HeaderWrap>
    </HeaderBox>
  );
};

const HeaderBox = styled.header`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 10vh;
  padding: 20px 300px;
  background-color: ${({ theme }) => theme.colors.mainColor};
  color: ${({ theme }) => theme.colors.subColor1};
`;
const HeaderWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
const Logo = styled.span`
  color: ${({ theme }) => theme.colors.subColor1};
  font-size: 2.2rem;
  font-family: ${({ theme }) => theme.fontFace.font1};
`;
const Menu = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 15%;
  a {
    color: ${({ theme }) => theme.colors.subColor1};
    font-weight: bold;
    cursor: pointer;
    border-radius: 20px;
    border: 3px solid black;
    padding: 6px;
    margin-left: 30px;
    &:hover {
      font-size: ${({ theme }) => theme.fontSizes.xxl};
    }
  }
  span {
    color: ${({ theme }) => theme.colors.white};
  }
`;

export default Header;
