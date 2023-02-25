import React from "react";
import styled from "styled-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getCookieToken, removeCookieToken } from "../../cookie/cookie";
import Swal from "sweetalert2";
import { useMutation } from "react-query";
import { cardEnrollUseMutationPostToken } from "../../apis/queries/cardEnrollQuery";

const Header = () => {
  const navaigate = useNavigate();
  //카드 등록 react-query
  const { mutate: cardEnroll } = useMutation(
    () => cardEnrollUseMutationPostToken(),
    {
      onError: (err) => {
        console.log("err");
        if (err.status === 409) {
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
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
      closeOnClickOutside: false,
    }).then((data) => {
      if (data.isConfirmed) {
        cardEnroll();
        navaigate("/memberlistpage");
      }
    });
  };

  // useEffect(() => {

  // },[])
  return (
    <HeaderBox>
      <HeaderWrap>
        <Link to="/home">
          <Logo>Gradient</Logo>
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
  color: ${({ theme }) => theme.colors.black};
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
const Logo = styled.span`
  color: ${({ theme }) => theme.colors.white};
  font-size: 2.2rem;
  font-family: ${({ theme }) => theme.fontFace.font1};
  @media ${(props) => props.theme.mobile} {
    font-size: ${({ theme }) => theme.fontSizes.base};
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
    font-size: ${({ theme }) => theme.fontSizes.small};
    a {
      color: ${({ theme }) => theme.colors.black};
      font-weight: bold;
      cursor: pointer;
      padding: 6px;
      margin-left: 10px;
      &:hover {
        font-size: ${({ theme }) => theme.fontSizes.base};
        color: ${({ theme }) => theme.colors.subColor2};
      }
    }
  }
`;

export default Header;
