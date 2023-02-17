import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { AiOutlineIdcard } from "react-icons/ai";
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import Swal from "sweetalert2";

import {
  userEmail,
  userEmailMessage,
  userNickname,
  userNicknameMessage,
  userPassword,
  userPasswordMessage,
} from "../store/registerAtom";
import { useNavigate } from "react-router";
import { loginGithubId } from "../store/userInfoAtom";
import { signUpUseMutaionPostInfo } from "../apis/queries/signUpQuery";
import { useMutation } from "react-query";

export default function SignUp() {
  const navigate = useNavigate();

  const [githubId, setGithubId] = useRecoilState(loginGithubId);

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

  useEffect(() => {
    setNickname("");
    setEmail("");
    setPassword("");
  }, []);

  const { mutate: loginFindUserPassword } = useMutation(
    (userInfo) => signUpUseMutaionPostInfo(userInfo),
    {
      onSuccess: (res) => {
        Swal.fire({
          padding: "3em",
          title: "회원가입 성공",
          text: "이메일을 확인해주세요",
          buttons: "확인",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
          closeOnClickOutside: false,
        }).then(function () {
          navigate("/login");
        });
      },
      onError: (err) => {
        if (err.response.status === 409) {
          Swal.fire({
            padding: "3em",
            title: "이미 가입한 이메일입니다",
            buttons: "확인",
            showClass: {
              popup: "animate__animated animate__fadeInDown",
            },
            hideClass: {
              popup: "animate__animated animate__fadeOutUp",
            },
            closeOnClickOutside: false,
          });
        } else {
          Swal.fire({
            padding: "3em",
            title: "회원가입에 실패했습니다",
            buttons: "확인",
            showClass: {
              popup: "animate__animated animate__fadeInDown",
            },
            hideClass: {
              popup: "animate__animated animate__fadeOutUp",
            },
            closeOnClickOutside: false,
          });
        }
      },
    }
  );

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
  const userInfo = { nickname, email, password, githubId };

  const onClickSubmit = (e) => {
    e.preventDefault();
    loginFindUserPassword(userInfo);
  };

  return (
    <SignUpContainer>
      <SignUpFormWrapper>
        <SignUpTitleListWrapper>
          <TitleWrapper>
            <Title>SignUp</Title>
          </TitleWrapper>
        </SignUpTitleListWrapper>
        <SignUpForm>
          <SignUpInnerWrapper>
            {/* 닉네임 */}
            {nickname.length > 0 ? (
              <SignUpInputContainer>
                <AiOutlineIdcard className="icon" />
                <SignUpInputItem>
                  {isNickname ? (
                    <SignUpInput
                      onChange={onChangeNickname}
                      value={nickname}
                      type="text"
                      placeholder="닉네임"
                    />
                  ) : (
                    <SignUpInput
                      onChange={onChangeNickname}
                      value={nickname}
                      type="text"
                      placeholder="닉네임"
                    />
                  )}
                  <InputMessage>{nicknameMessage}</InputMessage>
                </SignUpInputItem>
              </SignUpInputContainer>
            ) : (
              <SignUpInputContainer>
                <AiOutlineIdcard className="icon" />
                <SignUpInputItem>
                  <SignUpInput
                    onChange={onChangeNickname}
                    value={nickname}
                    type="text"
                    placeholder="닉네임"
                  />
                </SignUpInputItem>
              </SignUpInputContainer>
            )}

            {/* 이메일 */}
            {email.length > 0 ? (
              <SignUpInputContainer>
                <AiOutlineMail className="icon" />
                <SignUpInputItem>
                  {isEmail ? (
                    <SignUpInput
                      onChange={onChangeEmail}
                      value={email}
                      type="email"
                      placeholder="이메일"
                    />
                  ) : (
                    <SignUpInput
                      onChange={onChangeEmail}
                      value={email}
                      type="email"
                      placeholder="이메일"
                    />
                  )}
                  <InputMessage>{emailMessage}</InputMessage>
                </SignUpInputItem>
              </SignUpInputContainer>
            ) : (
              <SignUpInputContainer>
                <AiOutlineMail className="icon" />
                <SignUpInputItem>
                  <SignUpInput
                    onChange={onChangeEmail}
                    value={email}
                    type="email"
                    placeholder="이메일"
                  />
                </SignUpInputItem>
              </SignUpInputContainer>
            )}

            {/* 비밀번호 */}
            {password.length > 0 ? (
              <SignUpInputContainer>
                <RiLockPasswordLine className="icon" />
                <SignUpInputItem>
                  {isPassword ? (
                    <SignUpInput
                      onChange={onChangePassword}
                      value={password}
                      type="password"
                      placeholder="비밀번호"
                    />
                  ) : (
                    <SignUpInput
                      onChange={onChangePassword}
                      value={password}
                      type="password"
                      placeholder="비밀번호"
                    />
                  )}
                  <InputMessage>{passwordMessage}</InputMessage>
                </SignUpInputItem>
              </SignUpInputContainer>
            ) : (
              <SignUpInputContainer>
                <RiLockPasswordLine className="icon" />
                <SignUpInputItem>
                  <SignUpInput
                    onChange={onChangePassword}
                    value={password}
                    type="password"
                    placeholder="비밀번호"
                  />
                </SignUpInputItem>
              </SignUpInputContainer>
            )}
            {isNickname && isEmail && isPassword ? (
              <SignUpButton
                onClick={onClickSubmit}
                style={{
                  backgroundColor: "#738598",
                  color: "white",
                  border: "none",
                }}
                type="submit"
              >
                가입하기
              </SignUpButton>
            ) : (
              <SignUpButton style={{ pointerEvents: "none" }}>
                가입하기
              </SignUpButton>
            )}
          </SignUpInnerWrapper>
        </SignUpForm>
      </SignUpFormWrapper>
    </SignUpContainer>
  );
}

const SignUpContainer = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px 350px;
  background-color: ${({ theme }) => theme.colors.mainBackgroundColor};
  @media ${(props) => props.theme.mobile} {
    padding: 0;
  }
`;
const SignUpFormWrapper = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  @media ${(props) => props.theme.mobile} {
    flex-direction: column;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
const SignUpTitleListWrapper = styled.div`
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
const TitleWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
  background-color: ${({ theme }) => theme.colors.subColor3};
  @media ${(props) => props.theme.mobile} {
    height: 100%;
    margin: 0px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom: 1px solid white;
  }
`;
const Title = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.titleSize};
  font-weight: bold;
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: 10px;
  @media ${(props) => props.theme.mobile} {
    font-size: ${({ theme }) => theme.fontSizes.xxxl};
  }
`;

const SignUpForm = styled.form`
  width: 100%;
  height: 100%;
  position: relative;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  padding: 40px 80px;
  background-color: ${({ theme }) => theme.colors.subColor3};
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media ${(props) => props.theme.mobile} {
    height: 60%;
    padding: 0;
    border-radius: 0;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`;
const SignUpInnerWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const SignUpInputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 30px;
  padding: 10px;
  width: 90%;
  color: ${({ theme }) => theme.colors.white};
  .icon {
    width: 40px;
    height: 40px;
  }
  @media ${(props) => props.theme.mobile} {
    margin-top: -20px;
    margin-bottom: 30px;
    .icon {
      width: 30px;
      height: 30px;
    }
  }
`;
const SignUpInputItem = styled.div`
  width: 80%;
  height: 100%;
  position: relative;
`;
const SignUpInput = styled.input`
  border: none;
  width: 80%;
  margin-left: 10px;
  background-color: transparent;
  border-bottom: 1px solid ${({ theme }) => theme.colors.white};
  padding: 10px;
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  &:focus {
    outline: none;
  }
  &::placeholder {
    font-size: ${({ theme }) => theme.fontSizes.small};
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
const InputMessage = styled.div`
  display: block;
  position: absolute;
  color: ${({ theme }) => theme.colors.subColor2};
  line-height: 16px;
  font-size: ${({ theme }) => theme.fontSizes.small};
  margin-top: 5px;
  @media ${(props) => props.theme.mobile} {
    font-size: ${({ theme }) => theme.fontSizes.mobileSmall};
    margin-left: 5px;
  }
`;
const SignUpButton = styled.button`
  display: block;
  margin-top: 100px;
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
    margin-top: 20px;
    width: 50%;
  }
`;
