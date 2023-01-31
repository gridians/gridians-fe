import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { api } from "../apis/untils";
import GithubBtn from "../components/GithubBtn";
import { setRefreshToken } from "../cookie/cookie";
import Swal from "sweetalert2";
import { useMutation } from "react-query";
import { postLoginUseQueryUserInfo } from "../apis/queries/query";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);

  const { mutate: postLoginInfo } = useMutation(
    "postLoginUserInfo",
    () => postLoginUseQueryUserInfo(userLoginInfo),
    {
      onSuccess: (res) => {
        setRefreshToken("accessToken", res.data.token);
        Swal.fire({
          title: "로그인 중...",
          padding: "3em",
          timer: 1500,
          didOpen: () => {
            Swal.showLoading();
          },
        }).then(function () {
          navigate("/home");
        });
      },
    }
  );

  const userLoginInfo = { email, password };

  const idOnChange = (e) => {
    setEmail(e.target.value);
    const regEmail =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    const userEmailCurrent = e.target.value;
    setEmail(e.target.value);

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

  const onSubmit = async (e) => {
    e.preventDefault();
    postLoginInfo();
    // try {
    //   const res = await api.post(
    //     "/user/auth/login",
    //     {
    //       email,
    //       password,
    //     },
    //     { withCredentials: true }
    //   );
    //   if (res.status === 200) {
    //     setRefreshToken("accessToken", res.data.token);
    //     Swal.fire({
    //       title: "로그인 중...",
    //       padding: "3em",
    //       timer: 1500,
    //       didOpen: () => {
    //         Swal.showLoading();
    //       },
    //     }).then(function () {
    //       navigate("/home");
    //     });
    //   }
    //   console.log(res);
    // } catch (err) {
    //   return;
    // }
  };
  return (
    <LoginContainer>
      <Title>Login</Title>
      <LoginForm>
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

        <GithubBtn />
        <MenuList>
          <MenuItem>
            <Link to="/findid">아이디 찾기</Link>
          </MenuItem>
          <MenuItem>
            <Link to="/findpw">비밀번호 찾기</Link>
          </MenuItem>
        </MenuList>
      </LoginForm>
      <RegisterMoveBtn>
        <Link to="/register">가입이 아직이신가요?</Link>
      </RegisterMoveBtn>
    </LoginContainer>
  );
};

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 90vh;
  color: ${({ theme }) => theme.colors.black};
  background-color: ${({ theme }) => theme.colors.subBackgroundColor};
  a {
    color: ${({ theme }) => theme.colors.black};
  }
`;

const Title = styled.h1`
  margin-top: 100px;
  font-size: ${({ theme }) => theme.fontSizes.titleSize};
`;

const LoginForm = styled.form`
  margin-top: 20px;
  padding: 40px 40px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 10px;
`;

const LoginBtn = styled.button`
  display: block;
  margin: 15px 0;
  width: 100%;
  height: 40px;
  border-radius: 10px;
  border: none;
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  background-color: transparent;
  transition: all 0.5s;
  cursor: pointer;
`;

const IdContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  padding: 10px 0;
  position: relative;
  height: 100px;
  p {
    margin-bottom: 10px;
    font-size: ${({ theme }) => theme.fontSizes.base};
    span {
      font-size: ${({ theme }) => theme.fontSizes.small};
    }
  }
`;
const IdInput = styled.input`
  padding: 5px;
  width: 400px;
  background-color: transparent;
  outline: none;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.fontSizes.base};
  &::placeholder {
    color: ${({ theme }) => theme.colors.subColor4};
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
`;
const MenuItem = styled.li`
  a {
    &:hover {
      font-weight: bold;
      text-decoration: underline;
    }
  }
`;

const RegisterMoveBtn = styled.div`
  margin-top: 20px;
  width: 490px;
  a {
    text-decoration: underline;
    &:hover {
      font-weight: bold;
    }
  }
`;

const InputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 30px;
  padding: 10px;
  width: 60%;
`;

const InputMessage = styled.div`
  display: block;
  position: absolute;
  color: ${({ theme }) => theme.colors.subColor2};
  line-height: 16px;
  font-size: ${({ theme }) => theme.fontSizes.small};
  bottom: 0;
`;
export default Login;
