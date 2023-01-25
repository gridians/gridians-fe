import axios from "axios";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { AiOutlineIdcard } from "react-icons/ai";
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";

import {
  userEmail,
  userEmailMessage,
  userNickname,
  userNicknameMessage,
  userPassword,
  userPasswordMessage,
} from "../store/registerAtom";
import { api } from "../api/api";

export default function Register() {
  const [nickname, setNickname] = useRecoilState(userNickname);
  const [email, setEmail] = useRecoilState(userEmail);
  const [password, setPassword] = useRecoilState(userPassword);

  const [nicknameMessage, setNicknameMessage] =
    useRecoilState(userNicknameMessage);
  const [emailMessage, setEmailMessage] = useRecoilState(userEmailMessage);
  const [passwordMessage, setPasswordMessage] =
    useRecoilState(userPasswordMessage);

  const [isNickname, setIsNickname] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);

  // 닉네임 유효성 검사
  const onChangeNickname = (e) => {
    // 한글 영어 숫자
    const regNickname = /^[가-힣a-zA-Z0-9]+$/;
    const userNicknameCurrent = e.target.value;
    setNickname(e.target.value);

    if (e.target.value.length < 2 || e.target.value.length > 8) {
      setNicknameMessage("2~8글자 사이를 입력해주세요.");
      setIsNickname(false);
    } else if (!regNickname.test(userNicknameCurrent)) {
      setNicknameMessage("특수문자는 사용이 불가능합니다.");
    } else {
      setNicknameMessage("");
      setIsNickname(true);
    }
  };

  // 이메일 유효성 검사
  const onChangeEmail = (e) => {
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

  //비밀번호 유효성 검사
  const onChangePassword = (e) => {
    //  문자, 숫자 1개이상 포함, 8자리 이상
    const regPassword = /(?=.*\d)(?=.*[a-zA-ZS]).{8,16}/;
    const userPasswordCurrent = e.target.value;
    setPassword(e.target.value);

    if (!regPassword.test(userPasswordCurrent)) {
      setPasswordMessage("영어, 숫자 조합해서 입력해주세요 (8~16자)");
      setIsPassword(false);
    } else {
      setPasswordMessage("");
      setIsPassword(true);
    }
  };

  const onClickSubmit = () => {
    postRegister();
    console.log("click");
  };

  const postRegister = async () => {
    try {
      const res = await api.post("/user/signup", {
        nickname,
        email,
        password,
      });
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
    <RegisterContainer>
      <RegisterWrapper>
        <RegisterForm>
          {/* 닉네임 */}
          {nickname.length > 0 ? (
            <RegisterInputContainer>
              <AiOutlineIdcard className="icon" />
              <RegisterInputItem>
                {isNickname ? (
                  <RegisterInput
                    onChange={onChangeNickname}
                    value={nickname}
                    type="text"
                    placeholder="닉네임"
                  />
                ) : (
                  <RegisterInput
                    onChange={onChangeNickname}
                    value={nickname}
                    type="text"
                    placeholder="닉네임"
                  />
                )}
                <InputMessage>{nicknameMessage}</InputMessage>
              </RegisterInputItem>
            </RegisterInputContainer>
          ) : (
            <RegisterInputContainer>
              <AiOutlineIdcard className="icon" />
              <RegisterInputItem>
                <RegisterInput
                  onChange={onChangeNickname}
                  value={nickname}
                  type="text"
                  placeholder="닉네임"
                />
              </RegisterInputItem>
            </RegisterInputContainer>
          )}

          {/* 이메일 */}
          {email.length > 0 ? (
            <RegisterInputContainer>
              <AiOutlineMail className="icon" />
              <RegisterInputItem>
                {isEmail ? (
                  <RegisterInput
                    onChange={onChangeEmail}
                    value={email}
                    type="email"
                    placeholder="이메일"
                  />
                ) : (
                  <RegisterInput
                    onChange={onChangeEmail}
                    value={email}
                    type="email"
                    placeholder="이메일"
                  />
                )}
                <InputMessage>{emailMessage}</InputMessage>
              </RegisterInputItem>
            </RegisterInputContainer>
          ) : (
            <RegisterInputContainer>
              <AiOutlineMail className="icon" />
              <RegisterInputItem>
                <RegisterInput
                  onChange={onChangeEmail}
                  value={email}
                  type="email"
                  placeholder="이메일"
                />
              </RegisterInputItem>
            </RegisterInputContainer>
          )}

          {/* 비밀번호 */}
          {password.length > 0 ? (
            <RegisterInputContainer>
              <RiLockPasswordLine className="icon" />
              <RegisterInputItem>
                {isPassword ? (
                  <RegisterInput
                    onChange={onChangePassword}
                    value={password}
                    type="password"
                    placeholder="비밀번호"
                  />
                ) : (
                  <RegisterInput
                    onChange={onChangePassword}
                    value={password}
                    type="password"
                    placeholder="비밀번호"
                  />
                )}
                <InputMessage>{passwordMessage}</InputMessage>
              </RegisterInputItem>
            </RegisterInputContainer>
          ) : (
            <RegisterInputContainer>
              <RiLockPasswordLine className="icon" />
              <RegisterInputItem>
                <RegisterInput
                  onChange={onChangePassword}
                  value={password}
                  type="password"
                  placeholder="비밀번호"
                />
              </RegisterInputItem>
            </RegisterInputContainer>
          )}
          {isNickname && isEmail && isPassword ? (
            <RegisterButton
              onClick={onClickSubmit}
              style={{
                backgroundColor: "#738598",
                color: "white",
                border: "none",
              }}
              type="submit"
            >
              가입하기
            </RegisterButton>
          ) : (
            <RegisterButton
              onClick={onClickSubmit}
              style={{ pointerEvents: "none" }}
            >
              가입하기
            </RegisterButton>
          )}
        </RegisterForm>
      </RegisterWrapper>
    </RegisterContainer>
  );
}

const RegisterContainer = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.subBackgroundColor};
`;
const RegisterWrapper = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 0 10%;
`;

const RegisterForm = styled.form`
  width: 80%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  padding: 20px 0;
  background-color: rgba(255, 255, 255, 0.8);
`;
const RegisterInputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 30px;
  padding: 10px;
  width: 60%;
  .icon {
    width: 40px;
    height: 40px;
  }
`;
const RegisterInputItem = styled.div`
  width: 80%;
  height: 100%;
  position: relative;
`;
const RegisterInput = styled.input`
  border: none;
  width: 100%;
  margin-left: 10px;
  background-color: transparent;
  border-bottom: 2px solid ${({ theme }) => theme.colors.black};
  padding: 10px;
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  &:focus {
    outline: none;
  }
  &::placeholder {
    font-size: ${({ theme }) => theme.fontSizes.small};
    color: ${({ theme }) => theme.colors.subColor4};
  }
`;
const InputMessage = styled.div`
  display: block;
  position: absolute;
  color: ${({ theme }) => theme.colors.subColor2};
  line-height: 16px;
  font-size: ${({ theme }) => theme.fontSizes.small};
  margin-top: 5px;
`;
const RegisterButton = styled.div`
  width: 55%;
  text-align: center;
  padding: 10px;
  border-radius: 10px;
  background-color: transparent;
  margin-top: 70px;
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  color: black;
  cursor: pointer;
`;
