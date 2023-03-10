import React from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { getCookieToken, removeCookieToken } from "../../cookie/cookie";
import Swal from "sweetalert2";
import { useMutation } from "react-query";
import { cardEnrollUseMutationPostToken } from "../../apis/queries/cardEnrollQuery";
import logoImage from "../../image/logo/Group_1004.png";
import { useRecoilState } from "recoil";
import { cardClick, cardReset } from "../../store/cardInfoAtom";

const Header = () => {
  const [click, setClick] = useRecoilState(cardClick);
  //카드 정보를 수정중인지 아닌지 판별
  const [retouch, setRetouch] = useRecoilState(cardReset);

  //카드 등록 react-query
  const { mutate: cardEnroll } = useMutation(
    () => cardEnrollUseMutationPostToken(),
    {
      onSuccess: (data) => {},
      onError: (err) => {
        if (err.response.status === 409) {
          Swal.fire({
            title: "이미 등록된 회원입니다",
            cancelButtonColor: "#738598",
            cancelButtonText: "돌아가기",
            padding: "3em",
          });
        }
      },
    }
  );

  const onClickBackground = () => {
    setRetouch(false);
    setClick("reset");
  };

  const location = useLocation();
  if (location.pathname === "/") return null;

  const onClickLogOut = () => {
    Swal.fire({
      title: "로그아웃 하시겠습니까?",
      confirmButtonColor: "#DCC6C6",
      cancelButtonColor: "#738598",
      showCancelButton: true,
      confirmButtonText: "로그아웃",
      cancelButtonText: "돌아가기",
      padding: "3em",
    }).then((result) => {
      if (result.isConfirmed) {
        removeCookieToken();
        localStorage.clear();
        window.location.replace("/login");
      } else {
        return;
      }
    });
  };

  const onClickEnroll = () => {
    Swal.fire({
      title: "카드를 생성 하시겠습니까?",
      confirmButtonColor: "#DCC6C6",
      cancelButtonColor: "#738598",
      showCancelButton: true,
      confirmButtonText: "생성하기",
      cancelButtonText: "돌아가기",
      padding: "3em",
      closeOnClickOutside: false,
    }).then((data) => {
      if (data.isConfirmed) {
        cardEnroll();
      }
    });
  };

  return (
    <HeaderBox onClick={() => onClickBackground()}>
      <HeaderWrap>
        <Link to="/home">
          <Logo>
            <img src={logoImage} alt="logo" />
          </Logo>
        </Link>
        {getCookieToken("accessToken") === undefined ? (
          <Menu>
            {location.pathname === "/signup" ? (
              <Link style={{ color: "#B3B600" }} to="/signup">
                회원가입
              </Link>
            ) : (
              <Link to="/signup">회원가입</Link>
            )}

            {location.pathname === "/login" ? (
              <Link style={{ color: "#B3B600" }} to="/login">
                로그인
              </Link>
            ) : (
              <Link to="/login">로그인</Link>
            )}
          </Menu>
        ) : (
          <Menu>
            <Link onClick={onClickLogOut}>로그아웃</Link>

            {location.pathname === "/enroll" ? (
              <Link style={{ color: "#B3B600" }}>카드&nbsp;생성</Link>
            ) : (
              <Link onClick={onClickEnroll}>카드&nbsp;생성</Link>
            )}

            {location.pathname === "/mypage" ? (
              <Link style={{ color: "#B3B600" }}>내&nbsp;정보</Link>
            ) : (
              <Link to="/mypage">내&nbsp;정보</Link>
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
  height: 10vh;
  padding: 20px 300px;
  background-color: ${({ theme }) => theme.colors.mainBackgroundColor};
  color: ${({ theme }) => theme.colors.white};
  @media ${(props) => props.theme.mobile} {
    overflow: hidden;
    padding: 0 20px;
  }
`;
const HeaderWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1440px;
`;
const Logo = styled.div`
  color: ${({ theme }) => theme.colors.white};
  font-weight: 600;
  display: flex;
  align-items: center;
  img {
    width: 180px;
    height: 60px;
  }
  @media ${(props) => props.theme.mobile} {
    font-size: ${({ theme }) => theme.mobileFontSizes.xxxl};
  }
`;
const Menu = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  display: flex;
  align-items: center;
  justify-content: space-between;
  a {
    color: ${({ theme }) => theme.colors.white};
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
  @media ${(props) => props.theme.mobile} {
    font-size: ${({ theme }) => theme.mobileFontSizes.xl};
    a {
      color: ${({ theme }) => theme.colors.white};
      font-weight: bold;
      cursor: pointer;
      padding: 6px;
      margin-left: 10px;
    }
  }
`;

export default Header;
