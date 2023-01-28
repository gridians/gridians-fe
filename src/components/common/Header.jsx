import React, { useEffect } from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { getCookieToken, removeCookieToken } from "../../cookie/cookie";
import swal from "sweetalert";

const Header = () => {
  const location = useLocation();
  if (location.pathname === "/") return null;

  const onCLickLogOut = () => {
    removeCookieToken();
  };

  // useEffect(() => {

  // },[])
  return (
    <HeaderBox>
      <HeaderWrap>
        <Link to="/home">
          <Logo>Devember</Logo>
        </Link>
        {getCookieToken("accessToken") === undefined ? (
          <Menu>
            {location.pathname === "/register" ? (
              <Link style={{ color: "#B3B600" }} to="/register">
                SignUp
              </Link>
            ) : (
              <Link to="/register">SignUp</Link>
            )}

            {location.pathname === "/login" ? (
              <Link style={{ color: "#B3B600" }} to="/login">
                Login
              </Link>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </Menu>
        ) : (
          <Menu>
            <Link to="/login" onClick={onCLickLogOut}>
              LogOut
            </Link>

            {location.pathname === "/enroll" ? (
              <Link style={{ color: "#B3B600" }} to="/enroll">
                Enroll
              </Link>
            ) : (
              <Link
                onClick={() => {
                  swal({
                    text: "등록하시겠습니까?",
                    button: "확인",
                    showClass: {
                      popup: "animate__animated animate__fadeInDown",
                    },
                    hideClass: {
                      popup: "animate__animated animate__fadeOutUp",
                    },
                    closeOnClickOutside: false,
                  });
                }}
              >
                Enroll
              </Link>
            )}
          </Menu>
        )}
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
  width: 1440px;
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
