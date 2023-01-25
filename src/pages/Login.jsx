import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import GithubBtn from "../components/GithubBtn";
import axios from "axios";

const Login = () => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const idOnChange = (id) => {
    setId(id.target.value);
  };
  const pwOnChange = (pw) => {
    setPw(pw.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://58.231.19.218:8000/user/login",
        {
          email: id,
          password: pw,
        },
        { withCredentials: true }
      );
      if (res.status === 200) {
        // router.push("/");
      }
      console.log(res);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <LoginContainer>
      <Title>Login</Title>
      <LoginForm>
        <IdContainer>
          <p>
            아이디<span>(E-mail)</span>
          </p>
          <IdInput
            value={id}
            onChange={(id) => idOnChange(id)}
            placeholder="아이디(E-mail)를 입력해주세요"
          />
        </IdContainer>
        <PwContainer>
          <p>비밀번호</p>
          <PwInput
            type={"password"}
            value={pw}
            onChange={(pw) => pwOnChange(pw)}
            placeholder="영어, 숫자 조합해서 입력해주세요 (8~16자)"
          />
        </PwContainer>
        <LoginBtn onClick={(e) => onSubmit(e)}>로그인</LoginBtn>
        <GithubBtn />
        <MenuList>
          <MenuItem>
            <Link to="/findid">아이디 찾기</Link>
          </MenuItem>
          <MenuItem>
            <Link to={"/findpw"}>비밀번호 찾기</Link>
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
  background-color: ${({ theme }) => theme.colors.subColor2};
  border: 1px solid;
  border-radius: 10px;
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  transition: all 0.5s;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.black};
  }
`;

const IdContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  padding: 10px 0;
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


export default Login;
