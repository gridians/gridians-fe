import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { setCookieToken } from "../cookie/cookie";
import Swal from "sweetalert2";
import {
  postLoginUseQueryUserInfo,
  postLoginQueryFindUserPassword,
} from "../apis/queries/loginQuery";
import { useMutation } from "react-query";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);

  const userLoginInfo = { email, password };
  const { mutate: postLoginInfo } = useMutation(
    () => postLoginUseQueryUserInfo(userLoginInfo),
    {
      onSuccess: (res) => {
        setCookieToken("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        localStorage.setItem("name", res.nickname);
        navigate("/home");
      },
      onError: () => {},
    }
  );

  const { mutate: loginFindUserPassword } = useMutation(
    (email) => postLoginQueryFindUserPassword(email),
    {
      onSuccess: (res) => {
        console.log(res);
      },
      onError: () => {},
    }
  );

  const idOnChange = (e) => {
    setEmail(e.target.value);
    const regEmail =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    const userEmailCurrent = e.target.value;
    if (!regEmail.test(userEmailCurrent)) {
      setEmailMessage("이메일 형식이 올바르지 않습니다.");
      setIsEmail(false);
    } else {
      setEmailMessage("");
      setIsEmail(true);
    }
  };

  const pwOnChange = (e) => {
    setPassword(e.target.value);
    const regPassword = /(?=.*\d)(?=.*[a-zA-ZS]).{8,16}/;
    const userPasswordCurrent = e.target.value;

    if (!regPassword.test(userPasswordCurrent)) {
      setPasswordMessage("영어, 숫자, 특수문자 조합해서 입력해주세요 (8~16자)");
      setIsPassword(false);
    } else {
      setPasswordMessage("");
      setIsPassword(true);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    postLoginInfo();
  };

  const onClickFindPw = (e) => {
    e.preventDefault();
    Swal.fire({
      text: "비밀번호 찾을 이메일을 입력해주세요",
      input: "text",
      showCancelButton: true,
      confirmButtonText: "확인",
      cancelButtonText: "돌아가기",
      preConfirm: (email) => {
        loginFindUserPassword(email);
      },
    });
  };

  return (
    <LoginContainer>
      <LoginFormWrapper>
        <LoginTitleListWrapper>
          <LoginTitleWrapper>
            <MainTitle>Login</MainTitle>
          </LoginTitleWrapper>
        </LoginTitleListWrapper>
        <LoginForm>
          <LoginFormInnerWrapper>
            <IdContainer>
              <p>이메일</p>
              {email.length > 0 ? (
                <>
                  <IdInput
                    value={email}
                    onChange={idOnChange}
                    placeholder="이메일을 입력해주세요"
                  />
                  <InputMessage>{emailMessage}</InputMessage>
                </>
              ) : (
                <>
                  <IdInput
                    value={email}
                    onChange={idOnChange}
                    placeholder="이메일을 입력해주세요"
                  />
                </>
              )}
            </IdContainer>
            <PwContainer>
              <p>비밀번호</p>
              {password.length > 0 ? (
                <>
                  <PwInput
                    type={"password"}
                    value={password}
                    onChange={pwOnChange}
                    placeholder="비밀번호를 입력해주세요"
                  />
                  <InputMessage>{passwordMessage}</InputMessage>
                </>
              ) : (
                <>
                  <PwInput
                    type={"password"}
                    value={password}
                    onChange={pwOnChange}
                    placeholder="비밀번호를 입력해주세요"
                  />
                </>
              )}
            </PwContainer>
            {isEmail && isPassword ? (
              <LoginBtn
                style={{
                  backgroundColor: "#738598",
                  color: "white",
                  border: "none",
                }}
                onClick={onSubmit}
                type="submit"
              >
                로그인
              </LoginBtn>
            ) : (
              <LoginBtn style={{ pointerEvents: "none" }} onClick={onSubmit}>
                로그인
              </LoginBtn>
            )}
            {/* <GithubBtn /> */}
            <MenuList>
              <MenuItem>
                <FindPwContainer onClick={onClickFindPw}>
                  비밀번호 찾기
                </FindPwContainer>
              </MenuItem>

              <MenuItem>
                <RegisterMoveBtn>
                  <Link className="signupButton" to="/signup">
                    가입이 아직이신가요?
                  </Link>
                </RegisterMoveBtn>
              </MenuItem>
            </MenuList>
          </LoginFormInnerWrapper>
        </LoginForm>
      </LoginFormWrapper>
    </LoginContainer>
  );
};

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px 350px;
  height: 90vh;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.mainBackgroundColor};
  a {
    color: ${({ theme }) => theme.colors.white};
  }
  @media ${(props) => props.theme.mobile} {
    padding: 0;
  }
`;

const LoginFormWrapper = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  @media ${(props) => props.theme.mobile} {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const LoginTitleListWrapper = styled.div`
  width: 40%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  @media ${(props) => props.theme.mobile} {
    width: 100%;
    height: 10%;
    border-radius: 0;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    background-color: ${({ theme }) => theme.colors.subColor3};
  }
`;
const LoginTitleWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-top: 100px;
  background-color: ${({ theme }) => theme.colors.subColor3};
  color: white;
  @media ${(props) => props.theme.mobile} {
    height: 100%;
    align-items: center;
    margin: 0px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom: 1px solid white;
  }
`;
const MainTitle = styled.span`
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontSizes.titleSize};
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: 10px;
  @media ${(props) => props.theme.mobile} {
    font-size: ${({ theme }) => theme.fontSizes.xxxl};
  }
`;

const LoginForm = styled.form`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.subColor3};
  padding: 40px 100px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media ${(props) => props.theme.mobile} {
    height: 60%;
    padding: 0;
    border-radius: 0;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`;

const LoginFormInnerWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media ${(props) => props.theme.mobile} {
    align-items: center;
  }
`;

const LoginBtn = styled.button`
  display: block;
  margin: 15px 0;
  width: 100%;
  height: 40px;
  border-radius: 10px;
  border: none;
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  background-color: transparent;
  transition: all 0.5s;
  cursor: pointer;
  @media ${(props) => props.theme.mobile} {
    width: 50%;
    font-size: ${({ theme }) => theme.fontSizes.base};
  }
`;

const IdContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  padding: 10px 0;
  position: relative;
  height: 100px;
  color: ${({ theme }) => theme.colors.white};
  p {
    margin-bottom: 10px;
    font-size: ${({ theme }) => theme.fontSizes.base};
  }
  @media ${(props) => props.theme.mobile} {
    width: 90%;
    p {
      font-size: ${({ theme }) => theme.fontSizes.small};
    }
  }
`;
const IdInput = styled.input`
  padding: 5px;
  width: 100%;
  background-color: transparent;
  outline: none;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.base};
  &::placeholder {
    color: ${({ theme }) => theme.colors.subColor4};
  }
  @media ${(props) => props.theme.mobile} {
    padding: 5px;
    font-size: ${({ theme }) => theme.fontSizes.small};
    &::placeholder {
      font-size: ${({ theme }) => theme.fontSizes.mobileSmall};
      color: ${({ theme }) => theme.colors.subColor4};
    }
  }
`;

const PwContainer = styled(IdContainer)``;
const PwInput = styled(IdInput)``;

const MenuList = styled.ul`
  display: flex;
  justify-content: space-evenly;
  margin: 0;
  padding: 20px 0;
  list-style: none;
  @media ${(props) => props.theme.mobile} {
    width: 100%;
  }
`;
const MenuItem = styled.li`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  a {
    &:hover {
      font-weight: bold;
    }
  }
`;

const RegisterMoveBtn = styled.div`
  a {
    border-bottom: 1px solid white;
    padding-bottom: 2px;
    &:hover {
      font-weight: bold;
    }
  }
  @media ${(props) => props.theme.mobile} {
    font-size: ${({ theme }) => theme.fontSizes.mobileSmall};
  }
`;

const InputMessage = styled.div`
  display: block;
  position: absolute;
  color: ${({ theme }) => theme.colors.subColor2};
  line-height: 16px;
  font-size: ${({ theme }) => theme.fontSizes.small};
  bottom: 0;
  @media ${(props) => props.theme.mobile} {
    font-size: ${({ theme }) => theme.fontSizes.mobileSmall};
  }
`;

const FindPwContainer = styled.button`
  border-bottom: 1px solid white;
  border-top: none;
  border-left: none;
  border-right: none;
  padding: 2px;
  background-color: transparent;
  color: white;
  font-size: ${({ theme }) => theme.fontSizes.base};
  cursor: pointer;
  &:hover {
    font-weight: bold;
  }
  @media ${(props) => props.theme.mobile} {
    font-size: ${({ theme }) => theme.fontSizes.mobileSmall};
  }
`;
export default Login;
