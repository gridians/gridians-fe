import React, { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { AiOutlineIdcard } from "react-icons/ai";
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdPassword } from "react-icons/md";
import swal from "sweetalert";

import {
  myPageUserEmail,
  myPageUserEmailMessage,
  myPageUserNewPassword,
  myPageUserNewPasswordConfirm,
  myPageUserNewPasswordConfirmMessage,
  myPageUserNewPasswordMessage,
  myPageUserNickname,
  myPageUserNicknameMessage,
  myPageUserPassword,
  myPageUserPasswordMessage,
} from "../store/myPageAtom";

export default function MyPage() {
  const [nickname, setNickname] = useRecoilState(myPageUserNickname);
  const [email, setEmail] = useRecoilState(myPageUserEmail);
  const [password, setPassword] = useRecoilState(myPageUserPassword);
  const [newPassword, setNewPassword] = useRecoilState(myPageUserNewPassword);
  const [newPasswordConfirm, setNewPasswordConfirm] = useRecoilState(
    myPageUserNewPasswordConfirm
  );

  const [nicknameMessage, setNicknameMessage] = useRecoilState(
    myPageUserNicknameMessage
  );
  const [emailMessage, setEmailMessage] = useRecoilState(
    myPageUserEmailMessage
  );
  const [passwordMessage, setPasswordMessage] = useRecoilState(
    myPageUserPasswordMessage
  );
  const [newPasswordMessage, setNewPasswordMessage] = useRecoilState(
    myPageUserNewPasswordMessage
  );
  const [newPasswordConfirmMessage, setNewPasswordConfirmMessage] =
    useRecoilState(myPageUserNewPasswordConfirmMessage);

  const [isNickname, setIsNickname] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isNewPassword, setIsNewPassword] = useState(false);
  const [isNewPasswordConfirm, setIsNewPasswordConfirm] = useState(false);

  const [edit, setEdit] = useState(false);

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

  const onChangeNewPassword = (e) => {
    // 새 비밀번호
    //  문자, 숫자 1개이상 포함, 8자리 이상
    const regPassword = /(?=.*\d)(?=.*[a-zA-ZS]).{8,16}/;
    const userNewPasswordCurrent = e.target.value;
    setNewPassword(e.target.value);

    if (!regPassword.test(userNewPasswordCurrent)) {
      setNewPasswordMessage("영어, 숫자 조합해서 입력해주세요 (8~16자)");
      setIsNewPassword(false);
      return;
    } else {
      setNewPasswordMessage("");
      setIsNewPassword(true);
    }
    if (
      newPassword.length + 1 > 7 &&
      newPassword.length <= 16 &&
      password === ""
    ) {
      swal({
        text: "현재 비밀번호를 입력해주세요",
        button: "돌아가기",
      });
      return;
    }
  };

  const onChangeNewPasswordConfirm = (e) => {
    // 새 비밀번호 확인
    //  문자, 숫자 1개이상 포함, 8자리 이상
    const regPassword = /(?=.*\d)(?=.*[a-zA-ZS]).{8,16}/;
    const userNewPasswordConfirmCurrent = e.target.value;
    setNewPasswordConfirm(e.target.value);

    if (!regPassword.test(userNewPasswordConfirmCurrent)) {
      setNewPasswordConfirmMessage("영어, 숫자 조합해서 입력해주세요 (8~16자)");
      setIsNewPasswordConfirm(false);
    } else if (newPassword !== userNewPasswordConfirmCurrent) {
      setNewPasswordConfirmMessage("비밀번호가 일치하지 않습니다");
      setIsNewPasswordConfirm(false);
    } else {
      setNewPasswordConfirmMessage("");
      setIsNewPasswordConfirm(true);
    }
  };

  const onClickEdit = (e) => {
    setEdit((edit) => !edit);
    e.preventDefault();
  };
  const onClickSubmit = (e) => {
    e.preventDefault();
    if (nicknameMessage.length > 0) {
      swal({
        text: "닉네임이 올바르지 않습니다",
        button: "돌아가기",
      });
      return;
    } else if (emailMessage.length > 0) {
      swal({
        text: "이메일이 올바르지 않습니다",
        button: "돌아가기",
      });
      return;
    } else if (passwordMessage.length > 0) {
      swal({
        text: "비밀번호가 올바르지 않습니다",
        button: "돌아가기",
      });
      return;
    } else if (password.length >= 1 && newPassword.length <= 0) {
      swal({
        text: "새비밀번호를 입력해주세요",
        button: "돌아가기",
      });
      return;
    } else if (newPasswordMessage.length > 0) {
      swal({
        text: "새비밀번호가 올바르지 않습니다",
        button: "돌아가기",
      });
      return;
    } else if (
      newPassword !== newPasswordConfirm &&
      newPasswordConfirm.length <= 0
    ) {
      swal({
        text: "비밀번호확인을 입력해주세요",
        button: "돌아가기",
      });
      return;
    } else if (newPassword !== newPasswordConfirm) {
      swal({
        text: "비밀번호가 일치하지 않습니다",
        button: "돌아가기",
      });
      return;
    } else {
      console.log("good");
    }
    // loginApi();
    // postUserInfo();
  };

  return (
    <MyPageContainer>
      <MyPageWrapper>
        <MyPageForm>
          {/* 닉네임 */}
          {edit ? (
            <>
              {nickname || email || password ? (
                <MyPageInputContainer>
                  <AiOutlineIdcard className="icon" />
                  <MyPageInputWrapper>
                    {isNickname ? (
                      <MyPageInput
                        onChange={onChangeNickname}
                        value={nickname}
                        type="text"
                        placeholder="닉네임"
                      />
                    ) : (
                      <MyPageInput
                        onChange={onChangeNickname}
                        value={nickname}
                        type="text"
                        placeholder="닉네임"
                      />
                    )}
                    <InputMessage>{nicknameMessage}</InputMessage>
                  </MyPageInputWrapper>
                </MyPageInputContainer>
              ) : (
                <MyPageInputContainer>
                  <AiOutlineIdcard className="icon" />
                  <MyPageInputWrapper>
                    <MyPageInput
                      onChange={onChangeNickname}
                      value={nickname}
                      type="text"
                      placeholder="닉네임"
                    />
                  </MyPageInputWrapper>
                </MyPageInputContainer>
              )}
            </>
          ) : (
            <MyPageInputContainer>
              <AiOutlineIdcard className="icon" />
              <MyPageInputWrapper>
                <MyPageSpanContainer>
                  <MyPageSpan>닉네임</MyPageSpan>
                </MyPageSpanContainer>
              </MyPageInputWrapper>
            </MyPageInputContainer>
          )}

          {/* 이메일 */}
          {edit ? (
            <>
              {email.length > 0 ? (
                <MyPageInputContainer>
                  <AiOutlineMail className="icon" />
                  <MyPageInputWrapper>
                    {isEmail ? (
                      <MyPageInput
                        onChange={onChangeEmail}
                        value={email}
                        type="email"
                        placeholder="이메일"
                      />
                    ) : (
                      <MyPageInput
                        onChange={onChangeEmail}
                        value={email}
                        type="email"
                        placeholder="이메일"
                      />
                    )}
                    <InputMessage>{emailMessage}</InputMessage>
                  </MyPageInputWrapper>
                </MyPageInputContainer>
              ) : (
                <MyPageInputContainer>
                  <AiOutlineMail className="icon" />
                  <MyPageInputWrapper>
                    <MyPageInput
                      onChange={onChangeEmail}
                      value={email}
                      type="email"
                      placeholder="이메일"
                    />
                  </MyPageInputWrapper>
                </MyPageInputContainer>
              )}
            </>
          ) : (
            <MyPageInputContainer>
              <AiOutlineMail className="icon" />
              <MyPageInputWrapper>
                <MyPageSpanContainer>
                  <MyPageSpan>이메일</MyPageSpan>
                </MyPageSpanContainer>
              </MyPageInputWrapper>
            </MyPageInputContainer>
          )}

          {/* 비밀번호 */}
          {edit ? (
            <>
              {password.length > 0 ? (
                <MyPageInputContainer>
                  <RiLockPasswordLine className="icon" />
                  <MyPageInputWrapper>
                    {isPassword ? (
                      <MyPageInput
                        onChange={onChangePassword}
                        value={password}
                        type="password"
                        placeholder="현재 비밀번호"
                      />
                    ) : (
                      <MyPageInput
                        onChange={onChangePassword}
                        value={password}
                        type="password"
                        placeholder="현재 비밀번호"
                      />
                    )}
                    <InputMessage>{passwordMessage}</InputMessage>
                  </MyPageInputWrapper>
                </MyPageInputContainer>
              ) : (
                <MyPageInputContainer>
                  <RiLockPasswordLine className="icon" />
                  <MyPageInputWrapper>
                    <MyPageInput
                      onChange={onChangePassword}
                      value={password}
                      type="password"
                      placeholder="현재 비밀번호"
                    />
                  </MyPageInputWrapper>
                </MyPageInputContainer>
              )}
            </>
          ) : (
            <MyPageInputContainer>
              <RiLockPasswordLine className="icon" />
              <MyPageInputWrapper>
                <MyPageSpanContainer>
                  <MyPageSpan>***</MyPageSpan>
                </MyPageSpanContainer>
              </MyPageInputWrapper>
            </MyPageInputContainer>
          )}

          {/* 비밀번호 변경 */}
          {edit && (
            <>
              {newPassword.length > 0 ? (
                <MyPageInputContainer>
                  <MdPassword className="icon" />
                  <MyPageInputWrapper>
                    {isNewPassword ? (
                      <MyPageInput
                        onChange={onChangeNewPassword}
                        value={newPassword}
                        type="password"
                        placeholder="새비밀번호"
                      />
                    ) : (
                      <MyPageInput
                        onChange={onChangeNewPassword}
                        value={newPassword}
                        type="password"
                        placeholder="새비밀번호"
                      />
                    )}
                    <InputMessage>{newPasswordMessage}</InputMessage>
                  </MyPageInputWrapper>
                </MyPageInputContainer>
              ) : (
                <MyPageInputContainer>
                  <MdPassword className="icon" />
                  <MyPageInputWrapper>
                    <MyPageInput
                      onChange={onChangeNewPassword}
                      value={newPassword}
                      type="password"
                      placeholder="새비밀번호"
                    />
                  </MyPageInputWrapper>
                </MyPageInputContainer>
              )}
            </>
          )}

          {/* 비밀번호 확인 */}
          {edit && (
            <>
              {newPasswordConfirm.length > 0 ? (
                <MyPageInputContainer>
                  <MdPassword className="icon" />
                  <MyPageInputWrapper>
                    {isNewPasswordConfirm ? (
                      <MyPageInput
                        onChange={onChangeNewPasswordConfirm}
                        value={newPasswordConfirm}
                        type="password"
                        placeholder="새비밀번호 확인"
                      />
                    ) : (
                      <MyPageInput
                        onChange={onChangeNewPasswordConfirm}
                        value={newPasswordConfirm}
                        type="password"
                        placeholder="새비밀번호 확인"
                      />
                    )}
                    <InputMessage>{newPasswordConfirmMessage}</InputMessage>
                  </MyPageInputWrapper>
                </MyPageInputContainer>
              ) : (
                <MyPageInputContainer>
                  <MdPassword className="icon" />
                  <MyPageInputWrapper>
                    <MyPageInput
                      onChange={onChangeNewPasswordConfirm}
                      value={newPasswordConfirm}
                      type="password"
                      placeholder="새비밀번호 확인"
                    />
                  </MyPageInputWrapper>
                </MyPageInputContainer>
              )}
            </>
          )}

          {edit ? (
            <>
              {nickname || email || password ? (
                <EditButtonContainer>
                  <EditButton onClick={onClickSubmit} type="submit">
                    변경완료
                  </EditButton>
                </EditButtonContainer>
              ) : (
                <EditButtonContainer>
                  <EditButton onClick={onClickEdit}>변경취소</EditButton>
                </EditButtonContainer>
              )}
            </>
          ) : (
            <EditButtonContainer>
              <EditButton onClick={onClickEdit} type="submit">
                변경하기
              </EditButton>
              <EditButton>연동해제</EditButton>
              <EditButton>회원탈퇴</EditButton>
            </EditButtonContainer>
          )}
        </MyPageForm>
      </MyPageWrapper>
    </MyPageContainer>
  );
}

const MyPageContainer = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.subBackgroundColor};
`;
const MyPageWrapper = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 0 10%;
`;

const MyPageForm = styled.form`
  width: 80%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  padding: 20px 0;
  background-color: rgba(255, 255, 255, 0.8);
  .icon {
    width: 40px;
    height: 40px;
  }
  .show-icon {
    width: 30px;
    height: 30px;
  }
`;
const MyPageInputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  padding: 10px;
  width: 100%;
`;
const MyPageInputWrapper = styled.div`
  width: 80%;
  height: 100%;
  position: relative;
`;
const MyPageInput = styled.input`
  border: none;
  width: 70%;
  margin-left: 50px;
  background-color: transparent;
  border-bottom: 2px solid ${({ theme }) => theme.colors.black};
  padding: 10px 0;
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
const MyPageSpanContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const MyPageSpan = styled.span`
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: bold;
`;
const InputMessage = styled.div`
  display: block;
  position: absolute;
  color: ${({ theme }) => theme.colors.subColor2};
  line-height: 16px;
  font-size: ${({ theme }) => theme.fontSizes.small};
  margin-top: 5px;
  margin-left: 40px;
`;

const EditButtonContainer = styled.div`
  width: 100%;
  margin-top: 70px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  color: ${({ theme }) => theme.colors.white};
`;
const EditButton = styled.button`
  width: 90px;
  height: 40px;
  border-radius: 10px;
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontSizes.base};
  cursor: pointer;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.black};
  &:hover {
    background-color: ${({ theme }) => theme.colors.black};
    color: ${({ theme }) => theme.colors.white};
  }
`;