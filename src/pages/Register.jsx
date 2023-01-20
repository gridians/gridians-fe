import axios from "axios";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";

import {
  userEmail,
  userEmailMessage,
  userName,
  userNameMessage,
  userNickname,
  userNicknameMessage,
  userPassword,
  userPasswordMessage,
} from "../store/registerAtom";

export default function Register() {
  const [name, setName] = useRecoilState(userName);
  const [nickname, setNickname] = useRecoilState(userNickname);
  const [email, setEmail] = useRecoilState(userEmail);
  const [password, setPassword] = useRecoilState(userPassword);

  const [nameMessage, setNameMessage] = useRecoilState(userNameMessage);
  const [nicknameMessage, setNicknameMessage] =
    useRecoilState(userNicknameMessage);
  const [emailMessage, setEmailMessage] = useRecoilState(userEmailMessage);
  const [passwordMessage, setPasswordMessage] =
    useRecoilState(userPasswordMessage);

  const [isName, setIsName] = useState(false);
  const [isNickname, setIsNickname] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);

  // 이름 유효성 검사
  const onChangeName = (e) => {
    // 한글만 작성
    const regName = /^[가-힣]+$/;
    const UserNameCurrent = e.target.value;
    setName(e.target.value);

    if (e.target.value.length < 2 || e.target.value.length > 5) {
      setNameMessage("2~5글자 사이를 입력해주세요.");
      setIsName(false);
    } else if (!regName.test(UserNameCurrent)) {
      setNameMessage("이름을 정확히 입력해주세요.");
    } else {
      setNameMessage("");
      setIsName(true);
    }
  };

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
    // loginApi();
    // postUserInfo();
  };

  // const loginApi = async () => {
  //   try {
  //     const res = await axios.post("http://58.231.19.218/user/signup", {
  //       name,
  //       nickname,
  //       email,
  //       password,
  //     });
  //     if (res.status === 200) {
  //       // router.push("/");
  //     }
  //     console.log(res);
  //     return res.data;
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <RegisterContainer>
      <RegisterTitle>회원가입</RegisterTitle>
      <RegisterWrapper>
        <RegisterForm>
          {/* 이름 */}
          {name.length > 0 ? (
            <RegisterInputContainer>
              {isName ? (
                <RegisterInputTitle>이름</RegisterInputTitle>
              ) : (
                <RegisterErrorInputTitle>이름</RegisterErrorInputTitle>
              )}
              <RegisterInputItem>
                {isName ? (
                  <RegisterInput
                    onChange={onChangeName}
                    value={name}
                    type="text"
                    placeholder="예) 홍길동"
                  />
                ) : (
                  <RegisterInput
                    style={{ borderBottom: "2px solid #3F3B6C" }}
                    onChange={onChangeName}
                    value={name}
                    type="text"
                    placeholder="예) 홍길동"
                  />
                )}
                <InputMessage>{nameMessage}</InputMessage>
              </RegisterInputItem>
            </RegisterInputContainer>
          ) : (
            <RegisterInputContainer>
              <RegisterInputTitle>이름</RegisterInputTitle>
              <RegisterInputItem>
                <RegisterInput
                  onChange={onChangeName}
                  value={name}
                  type="text"
                  placeholder="예) 홍길동"
                />
              </RegisterInputItem>
            </RegisterInputContainer>
          )}

          {/* 닉네임 */}
          {nickname.length > 0 ? (
            <RegisterInputContainer>
              {isNickname ? (
                <RegisterInputTitle>닉네임</RegisterInputTitle>
              ) : (
                <RegisterErrorInputTitle>닉네임</RegisterErrorInputTitle>
              )}
              <RegisterInputItem>
                {isNickname ? (
                  <RegisterInput
                    onChange={onChangeNickname}
                    value={nickname}
                    type="text"
                  />
                ) : (
                  <RegisterInput
                    style={{ borderBottom: "2px solid #3F3B6C" }}
                    onChange={onChangeNickname}
                    value={nickname}
                    type="text"
                  />
                )}
                <InputMessage>{nicknameMessage}</InputMessage>
              </RegisterInputItem>
            </RegisterInputContainer>
          ) : (
            <RegisterInputContainer>
              <RegisterInputTitle>닉네임</RegisterInputTitle>
              <RegisterInputItem>
                <RegisterInput
                  onChange={onChangeNickname}
                  value={nickname}
                  type="text"
                />
              </RegisterInputItem>
            </RegisterInputContainer>
          )}

          {/* 이메일 */}
          {email.length > 0 ? (
            <RegisterInputContainer>
              {isEmail ? (
                <RegisterInputTitle>이메일</RegisterInputTitle>
              ) : (
                <RegisterErrorInputTitle>이메일</RegisterErrorInputTitle>
              )}
              <RegisterInputItem>
                {isEmail ? (
                  <RegisterInput
                    onChange={onChangeEmail}
                    value={email}
                    type="email"
                    placeholder="예) polymorph123@polymorph.com"
                  />
                ) : (
                  <RegisterInput
                    onChange={onChangeEmail}
                    value={email}
                    type="email"
                    placeholder="예) polymorph123@polymorph.com"
                    style={{ borderBottom: "2px solid #3F3B6C" }}
                  />
                )}
                <InputMessage>{emailMessage}</InputMessage>
              </RegisterInputItem>
            </RegisterInputContainer>
          ) : (
            <RegisterInputContainer>
              <RegisterInputTitle>이메일</RegisterInputTitle>
              <RegisterInputItem>
                <RegisterInput
                  onChange={onChangeEmail}
                  value={email}
                  type="email"
                  placeholder="예) polymorph123@polymorph.com"
                />
              </RegisterInputItem>
            </RegisterInputContainer>
          )}

          {/* 비밀번호 */}
          {password.length > 0 ? (
            <RegisterInputContainer>
              {isPassword ? (
                <RegisterInputTitle>비밀번호</RegisterInputTitle>
              ) : (
                <RegisterErrorInputTitle>비밀번호</RegisterErrorInputTitle>
              )}
              <RegisterInputItem>
                {isPassword ? (
                  <RegisterInput
                    onChange={onChangePassword}
                    value={password}
                    type="password"
                  />
                ) : (
                  <RegisterInput
                    style={{ borderBottom: "2px solid #3F3B6C" }}
                    onChange={onChangePassword}
                    value={password}
                    type="password"
                  />
                )}
                <InputMessage>{passwordMessage}</InputMessage>
              </RegisterInputItem>
            </RegisterInputContainer>
          ) : (
            <RegisterInputContainer>
              <RegisterInputTitle>비밀번호</RegisterInputTitle>
              <RegisterInputItem>
                <RegisterInput
                  onChange={onChangePassword}
                  value={password}
                  type="password"
                />
              </RegisterInputItem>
            </RegisterInputContainer>
          )}
          {isName && isNickname && isEmail && isPassword ? (
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
  background-color: ${({ theme }) => theme.colors.mainBackgroundColor};
  overflow: hidden;
`;
const RegisterWrapper = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 10%;
`;
const RegisterTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.titleSize};
  color: ${({ theme }) => theme.colors.subColor1};
  margin-top: 50px;
`;

const RegisterForm = styled.form`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px solid ${({ theme }) => theme.colors.subColor4};
  border-radius: 10px;
  padding: 20px 0;
`;
const RegisterInputContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  padding: 10px;
  width: 60%;
`;
const RegisterInputTitle = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.subColor3};
  font-weight: bold;
`;
const RegisterErrorInputTitle = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.subColor2};
  font-weight: bold;
`;
const RegisterInputItem = styled.div`
  position: relative;
`;
const RegisterInput = styled.input`
  border: none;
  width: 100%;
  background-color: transparent;
  border-bottom: 2px solid ${({ theme }) => theme.colors.subColor3};
  padding: 10px 0;
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  &:focus {
    outline: none;
    border-bottom: 2px solid ${({ theme }) => theme.colors.black};
  }
  &::placeholder {
    font-size: ${({ theme }) => theme.fontSizes.small};
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
  border: 2px solid ${({ theme }) => theme.colors.subColor2};
  background-color: transparent;
  margin-top: 70px;
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  color: black;
  cursor: pointer;
`;
