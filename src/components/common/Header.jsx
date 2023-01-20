import React from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  if (location.pathname === "/") return null;
  return (
    <HeaderBox>
      <HeaderWrap>
        <Link to="/home">
          <Logo>Devember</Logo>
        </Link>
        <Menu>
          <Link to="/register">SignUp</Link>
          <Link to="/login">Login</Link>
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
  background-color: ${({ theme }) => theme.colors.subBackgroundColor};
  color: ${({ theme }) => theme.colors.black};
`;
const HeaderWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
const Logo = styled.span`
  color: ${({ theme }) => theme.colors.black};
  font-size: 2.2rem;
  font-family: ${({ theme }) => theme.fontFace.font1};
`;
const Menu = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  display: flex;
  align-items: center;
  justify-content: space-between;
  a {
    color: ${({ theme }) => theme.colors.black};
    font-weight: bold;
    cursor: pointer;
    padding: 6px;
    margin-left: 30px;
    &:hover {
      font-size: ${({ theme }) => theme.fontSizes.xxl};
      color: ${({ theme }) => theme.colors.subColor2};
    }
  }
  span {
    color: ${({ theme }) => theme.colors.white};
  }
`;

export default Header;
