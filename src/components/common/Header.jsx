import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <HeaderBox>
      <HeaderWrap>
        <Link to="/">
          <Logo>Devember</Logo>
        </Link>
        <Menu>
          <Link to="/">로그인</Link>
          <Link to="/">등록하기</Link>
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
  padding: 20px 100px;
  background-color: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};
`;
const HeaderWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
const Logo = styled.span`
  color: ${({ theme }) => theme.colors.white};
  font-size: 2.2rem;
  font-family: ${({ theme }) => theme.fontFace.font1};
`;
const Menu = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  a {
    margin-right: 15px;
    color: ${({ theme }) => theme.colors.white};
    font-weight: bold;
    cursor: pointer;
    border-radius: 10px;
    padding: 6px;
    &:hover {
      font-size: ${({ theme }) => theme.fontSizes.xl};
    }
  }
  span {
    color: ${({ theme }) => theme.colors.white};
  }
`;

export default Header;
