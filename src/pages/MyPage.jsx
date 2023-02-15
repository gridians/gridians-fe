import React, { useRef, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { AiOutlineFileImage } from "react-icons/ai";
import { AiOutlineIdcard } from "react-icons/ai";
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdPassword } from "react-icons/md";
import _debounce from "lodash/debounce";
import {
  myPageUserEmail,
  myPageUserEmailMessage,
  myPageUserNewPassword,
  myPageUserNewPasswordConfirm,
  myPageUserNewPasswordConfirmMessage,
  myPageUserNewPasswordMessage,
  myPageUserNickname,
  myPageUserNicknameMessage,
  myPageUserNicknameValue,
  myPageUserPassword,
  myPageUserPasswordMessage,
} from "../store/myPageAtom";
import { removeCookieToken } from "../cookie/cookie";

import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { myPageUseMutationPutUserProfile } from "../apis/queries/myPageQuery";
import Swal from "sweetalert2";
import {
  useMutationMyPageDeleteUserInfo,
  useMutationMyPagePostEditEmail,
  useMutationMyPagePutEditUserInfo,
  useMutationMyPagePutUserProfile,
  useQueryMyPageGetUserValid,
} from "../apis/customQuery/myPageCustomQuery";
import { useCallback } from "react";
import debounce from "lodash/debounce";

export default function MyPage() {
  const navigate = useNavigate();
  const [nickname, setNickname] = useRecoilState(myPageUserNickname);
  const [email, setEmail] = useRecoilState(myPageUserEmail);
  const [password, setPassword] = useRecoilState(myPageUserPassword);
  const [newPassword, setNewPassword] = useRecoilState(myPageUserNewPassword);
  const [newPasswordConfirm, setNewPasswordConfirm] = useRecoilState(
    myPageUserNewPasswordConfirm
  );
  const [imageSrc, setImageSrc] = useState();
  const fileInputRef = useRef(null);

  // 유저 정보
  const { data: getUserInfoValue } = useQueryMyPageGetUserValid();
  console.log(getUserInfoValue);

  // 이메일 변경
  const { mutate: postEditEmail } = useMutationMyPagePostEditEmail();
  const handleEditEmail = () => {
    postEditEmail(email, {
      onSuccess: (res) => {
        console.log(res);
      },
      onError: (err) => {},
    });
  };

  // 닉네임, 비밀번호 변경
  const userInfo = { nickname, password, newPassword };
  const { mutate: putEditNickname } = useMutationMyPagePutEditUserInfo();
  const handleEditNickname = () => {
    putEditNickname(userInfo, {
      onSuccess: (res) => {
        console.log(res);
      },
      onError: (err) => {},
    });
  };

  // 유저 회원탈퇴
  const { mutate: deleteUserInfo } = useMutationMyPageDeleteUserInfo();
  const handleDeleteUserInfo = (deleteInfo) => {
    deleteUserInfo(deleteInfo, {
      onSuccess: () => {
        Swal.fire({
          title: "탈퇴되었습니다",
          cancelButtonColor: "#738598",
          button: "확인",
        }).then(() => {
          removeCookieToken();
          window.location.replace("/login");
        });
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  const { mutate: putUserProfile, isLoading: UserProfileLoading } = useMutation(
    "putUserProfile",
    () => myPageUseMutationPutUserProfile(imageSrc),
    {
      onSuccess: (data) => {
        console.log(data);
        window.location.reload();
      },
      onError: (error) => {
        console.log(error);
        if (error.response.data.status === 500) {
          Swal.fire({
            text: "이미지를 넣어주세요",
            button: "돌아가기",
          });
          return;
        }
      },
    }
  );

  const uploadProfile = (e) => {
    const fileList = e.target.files;
    const maxSizw = 2 * 1024 * 1024;
    const fileSize = fileList[0].size;
    if (fileSize > maxSizw) {
      Swal.fire({
        text:
          "2MB 이하 파일만 등록할 수 있습니다.\n\n" +
          "현재파일 용량 : " +
          Math.round((fileSize / 1024 / 1024) * 100) / 100 +
          "MB",
      });
      return (e.target.value = null);
    }
    const reader = new FileReader();
    reader.readAsDataURL(fileList[0]);
    reader.onload = () => {
      const base64data = reader.result;
      setImageSrc(base64data);
    };
  };

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

  // useEffect(() => {
  //   if (token === undefined) {
  //     navigate("/login");
  //   }
  //   return () => {};
  // }, [navigate, token]);

  const regPassword = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}/;
  // 닉네임 유효성 검사
  const onChangeNickname = _debounce((e) => {
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
  }, 3000);

  // 이메일 유효성 검사
  const onChangeEmail = (e) => {
    const regEmail =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    const userEmailCurrent = e.target.value;
    setEmail(e.target.value);
    console.log(email);
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
    const userPasswordCurrent = e.target.value;
    setPassword(e.target.value);

    if (!regPassword.test(userPasswordCurrent)) {
      setPasswordMessage(
        "영어, 숫자, 특수문자를 조합해서 입력해주세요 (8~16자)"
      );
      setIsPassword(false);
    } else {
      setPasswordMessage("");
      setIsPassword(true);
    }
  };

  const onChangeNewPassword = (e) => {
    // 새 비밀번호
    //  문자, 숫자 1개이상 포함, 8자리 이상
    const userNewPasswordCurrent = e.target.value;
    setNewPassword(e.target.value);

    if (!regPassword.test(userNewPasswordCurrent)) {
      setNewPasswordMessage(
        "영어, 숫자, 특수문자를 조합해서 입력해주세요 (8~16자)"
      );
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
      Swal.fire({
        text: "현재 비밀번호를 입력해주세요",
        button: "돌아가기",
      });
      return;
    }
  };
  const onChangeNewPasswordConfirm = (e) => {
    // 새 비밀번호 확인
    //  문자, 숫자, 특수문자 1개이상 포함, 8자리 이상
    const userNewPasswordConfirmCurrent = e.target.value;
    setNewPasswordConfirm(e.target.value);

    if (!regPassword.test(userNewPasswordConfirmCurrent)) {
      setNewPasswordConfirmMessage(
        "영어, 숫자, 특수문자를 조합해서 입력해주세요 (8~16자)"
      );
      setIsNewPasswordConfirm(false);
    } else if (newPassword !== userNewPasswordConfirmCurrent) {
      setNewPasswordConfirmMessage("비밀번호가 일치하지 않습니다");
      setIsNewPasswordConfirm(false);
    } else {
      setNewPasswordConfirmMessage("");
      setIsNewPasswordConfirm(true);
    }
  };

  const onClickInputFile = async (e) => {
    e.preventDefault();
    // const formData = new FormData();
    // Array.from(imageSrc).forEach((el) => {
    //   formData.append("userFile", el);
    // });
    // // formData.append("imageSrc",)
    // for (const value of formData.values()) {
    //   console.log(value);
    // }
    // try {
    //   const res = await api.put(`/user/profile`, formData, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //       // accept: "application/json,",
    //       Authorization: `Bearer ${getCookieToken("accessToken")}`,
    //     },
    //   });
    //   console.log(res);
    // } catch (err) {
    //   console.log(err);
    // }

    putUserProfile();
  };

  const onClickEmailSubmit = (e) => {
    e.preventDefault();
    handleEditEmail(email);
    setEmail("");
    if (emailMessage.length > 0) {
      Swal.fire({
        text: "이메일이 올바르지 않습니다",
        button: "돌아가기",
      });
      return;
    } else {
      Swal.fire({
        text: "이메일을 확인해주세요",
        button: "돌아가기",
      });
      return;
    }
  };

  const onClickSubmit = (e) => {
    e.preventDefault();
    if (nicknameMessage.length > 0) {
      Swal.fire({
        text: "닉네임이 올바르지 않습니다",
        button: "돌아가기",
      });
      return;
    } else if (password.length >= 1 && passwordMessage.length > 0) {
      Swal.fire({
        text: "비밀번호가 올바르지 않습니다",
        button: "돌아가기",
      });

      return;
    } else if (password.length >= 1 && newPassword.length <= 0) {
      Swal.fire({
        text: "새비밀번호를 입력해주세요",
        button: "돌아가기",
      });
      return;
    } else if (
      newPassword !== newPasswordConfirm &&
      newPasswordConfirm.length <= 0
    ) {
      Swal.fire({
        text: "비밀번호확인을 입력해주세요",
        button: "돌아가기",
      });
      return;
    } else if (newPassword !== newPasswordConfirm) {
      Swal.fire({
        text: "비밀번호가 일치하지 않습니다",
        button: "돌아가기",
      });
      return;
    } else {
      handleEditNickname(userInfo);
      setNickname("");
      setPassword("");
      setNewPassword("");
      setNewPasswordConfirm("");
      navigate("/home");
    }
  };
  const onClickDeleteUser = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "탈퇴하시겠습니까?",
      text: "비밀번호를 입력해주세요",
      input: "password",
      confirmButtonColor: "#DCC6C6",
      cancelButtonColor: "#738598",
      showCancelButton: true,
      confirmButtonText: "탈퇴하기",
      cancelButtonText: "취소하기",
      preConfirm: (password) => {
        console.log(password);
        handleDeleteUserInfo(password);
      },
    });
  };
  // const isLoading = getUserInfoValue || UserInfoLoading || UserProfileLoading;

  return (
    <MyPageContainer>
      <MyPageWrapper>
        <MyPageFormInfoWrapper>
          <MyPageFormInfoTitleWrapper>
            <Title>MyPage</Title>
          </MyPageFormInfoTitleWrapper>

          <MyPageInputContainerInnerWrapper>
            <MyPageInputWrapper className="profileImageContainer">
              {getUserInfoValue?.email !== undefined && (
                <ProfileImage src={`${getUserInfoValue?.profileImage}`} />
              )}
            </MyPageInputWrapper>
            <MyPageInputContainer className="editInputContainer">
              <MyPageInputWrapper>
                <MyPageSpanContainer>
                  <MyPageSpan>{getUserInfoValue?.email}</MyPageSpan>
                </MyPageSpanContainer>
              </MyPageInputWrapper>
            </MyPageInputContainer>

            <MyPageInputContainer className="editInputContainer">
              <MyPageInputWrapper>
                <MyPageSpanContainer>
                  <MyPageSpan>{getUserInfoValue?.nickname}</MyPageSpan>
                </MyPageSpanContainer>
              </MyPageInputWrapper>
            </MyPageInputContainer>
          </MyPageInputContainerInnerWrapper>
        </MyPageFormInfoWrapper>

        <MyPageForm>
          {/* EditContainer */}
          <MyPageFormEditInfoWrapper>
            {/* 이미지 업로드 */}
            <MyPageInputContainer>
              <AiOutlineFileImage className="icon" />
              <MyPageInputWrapper>
                <MyPageInput
                  type="file"
                  className="fileInput"
                  accept="image/jpg, image/jpeg, image/png"
                  ref={fileInputRef}
                  onChange={uploadProfile}
                />
                <EditButtonContainer className="email-button-container">
                  <EditButton onClick={onClickInputFile} type="submit">
                    변경하기
                  </EditButton>
                </EditButtonContainer>
              </MyPageInputWrapper>
            </MyPageInputContainer>

            {/* 이메일 */}
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
                  <EditButtonContainer className="email-button-container">
                    <EditButton onClick={onClickEmailSubmit} type="submit">
                      인증하기
                    </EditButton>
                  </EditButtonContainer>
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
                  <EditButtonContainer className="email-button-container">
                    <EditButton style={{ pointerEvents: "none" }}>
                      인증하기
                    </EditButton>
                  </EditButtonContainer>
                </MyPageInputWrapper>
              </MyPageInputContainer>
            )}

            {/* 닉네임 */}
            {nickname.length > 0 ? (
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

            {/* 비밀번호 */}
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
                  <InputMessage className="passwordMessage">
                    {passwordMessage}
                  </InputMessage>
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

            {/* 비밀번호 변경 */}
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
                  <InputMessage className="passwordMessage">
                    {newPasswordMessage}
                  </InputMessage>
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

            {/* 비밀번호 확인 */}
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
                  <InputMessage className="passwordMessage">
                    {newPasswordConfirmMessage}
                  </InputMessage>
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

            <EditButtonContainer>
              <EditButton onClick={onClickSubmit} type="submit">
                변경하기
              </EditButton>
              <EditButton>연동해제</EditButton>
              <EditButton onClick={onClickDeleteUser}>회원탈퇴</EditButton>
            </EditButtonContainer>
          </MyPageFormEditInfoWrapper>
        </MyPageForm>
      </MyPageWrapper>
    </MyPageContainer>
  );
}

const MyPageContainer = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  padding: 70px 350px;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.mainBackgroundColor};
  @media ${(props) => props.theme.mobile} {
    padding: 0;
    justify-content: center;
  }
`;
const MyPageWrapper = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  @media ${(props) => props.theme.mobile} {
    flex-direction: column;
    height: auto;
  }
`;
const MyPageFormInfoWrapper = styled.div`
  width: 40%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.subColor3};
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  display: flex;
  flex-direction: column;
  color: white;
  .profileImageContainer {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .editInputContainer {
    margin-top: 10px;
  }
  .editIcon {
    width: 40px;
    height: 40px;
  }
  @media ${(props) => props.theme.mobile} {
    border-radius: 0;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    width: 100%;
    height: 80px;
  }
`;
const MyPageFormInfoTitleWrapper = styled.div`
  width: 100%;
  margin-top: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  border: 1px solid white;
  background-color: white;
  @media ${(props) => props.theme.mobile} {
    display: none;
  }
`;
const Title = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.titleSize};
  font-weight: bold;
  margin-bottom: 10px;
`;

const MyPageForm = styled.form`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  padding: 40px 0px;
  background-color: ${({ theme }) => theme.colors.white};
  .icon {
    width: 40px;
    height: 40px;
  }
  .show-icon {
    width: 30px;
    height: 30px;
  }
  @media ${(props) => props.theme.mobile} {
    border-radius: 0;
    padding: 0;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    .icon {
      width: 25px;
      height: 25px;
    }
    .show-icon {
      width: 15px;
      height: 15px;
    }
  }
`;
const MyPageFormEditInfoWrapper = styled.div`
  height: 100%;
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media ${(props) => props.theme.mobile} {
    width: 100%;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`;
const MyPageInputContainerInnerWrapper = styled.div`
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media ${(props) => props.theme.mobile} {
    margin-top: 0;
    flex-direction: row;
    height: 80px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
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
  @media ${(props) => props.theme.mobile} {
    margin-top: 10px;
  }
`;
const MyPageInputWrapper = styled.div`
  width: 80%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  .fileInput::file-selector-button {
    display: none;
  }
  .fileInput {
    font-size: ${({ theme }) => theme.fontSizes.small};
    color: ${({ theme }) => theme.colors.subColor4};
    cursor: pointer;
  }
  .email-button-container {
    padding: 10px;
    margin: 0;
    position: absolute;
    right: -30px;
    width: 100px;
  }
  @media ${(props) => props.theme.mobile} {
    .fileInput {
      font-size: ${({ theme }) => theme.fontSizes.mobileSmall};
      color: ${({ theme }) => theme.colors.subColor4};
      cursor: pointer;
    }
    .email-button-container {
      padding: 10px;
      margin: 0;
      position: absolute;
      right: -30px;
      width: 100px;
    }
    .passwordMessage {
      margin-top: 80px;
    }
  }
`;
const ProfileImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 9999px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  @media ${(props) => props.theme.mobile} {
    width: 60px;
    height: 60px;
  }
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
  @media ${(props) => props.theme.mobile} {
    width: 70%;
    margin-left: 20px;
    font-size: ${({ theme }) => theme.fontSizes.small};
    &:focus {
      outline: none;
    }
    &::placeholder {
      font-size: ${({ theme }) => theme.fontSizes.mobileSmall};
      color: ${({ theme }) => theme.colors.subColor4};
    }
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
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: bold;
  @media ${(props) => props.theme.mobile} {
    font-size: ${({ theme }) => theme.fontSizes.small};
  }
`;
const InputMessage = styled.div`
  display: block;
  position: absolute;
  color: ${({ theme }) => theme.colors.subColor2};
  line-height: 16px;
  font-size: ${({ theme }) => theme.fontSizes.small};
  margin-top: 80px;
  margin-left: 40px;
  @media ${(props) => props.theme.mobile} {
    font-size: ${({ theme }) => theme.fontSizes.mobileSmall};
    margin-top: 70px;
    margin-left: 20px;
  }
`;

const EditButtonContainer = styled.div`
  width: 100%;
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  color: ${({ theme }) => theme.colors.white};
  @media ${(props) => props.theme.mobile} {
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: ${({ theme }) => theme.fontSizes.mobileSmall};
  }
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
  border: none;
  &:hover {
    background-color: ${({ theme }) => theme.colors.subColor6};
    color: ${({ theme }) => theme.colors.white};
    transition: all 0.5s;
  }
  @media ${(props) => props.theme.mobile} {
    width: 70px;
    height: 30px;
    font-size: ${({ theme }) => theme.fontSizes.mobileSmall};
  }
`;
