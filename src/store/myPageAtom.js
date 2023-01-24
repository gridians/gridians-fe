import { atom } from "recoil";
import { v1 } from "uuid";

export const myPageUserNickname = atom({
  key: `myPageUserNickname/${v1()}`,
  default: "",
});
export const myPageUserEmail = atom({
  key: `myPageUserEmail/${v1()}`,
  default: "",
});
export const myPageUserPassword = atom({
  key: `myPageUserPassword//${v1()}`,
  default: "",
});
export const myPageUserNewPassword = atom({
  key: `myPageUserNewPassword//${v1()}`,
  default: "",
});

export const myPageUserNewPasswordConfirm = atom({
  key: `myPageUserNewPasswordConfirm//${v1()}`,
  default: "",
});

export const myPageUserNicknameMessage = atom({
  key: `myPageUserNicknameMessage/${v1()}`,
  default: "",
});
export const myPageUserEmailMessage = atom({
  key: `myPageUserEmailMessage/${v1()}`,
  default: "",
});
export const myPageUserPasswordMessage = atom({
  key: `myPageUserPasswordMessage/${v1()}`,
  default: "",
});
export const myPageUserNewPasswordMessage = atom({
  key: `myPageUserNewPasswordMessage/${v1()}`,
  default: "",
});
export const myPageUserNewPasswordConfirmMessage = atom({
  key: `myPageUserNewPasswordConfirmMessage/${v1()}`,
  default: "",
});
