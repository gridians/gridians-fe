import { atom } from 'recoil';
import { v1 } from "uuid";

export const userName = atom({
  key: `userName/${v1()}`,
  default: "",
});
export const userNickname = atom({
  key: `userNickname/${v1()}`,
  default: "",
});
export const userEmail = atom({
  key: `userEmail/${v1()}`,
  default: "",
});
export const userPassword = atom({
  key: `userPassword//${v1()}`,
  default: "",
});

export const userNameMessage = atom({
  key: `userNameMessage/${v1()}`,
  default: "",
});
export const userNicknameMessage = atom({
  key: `userNicknameMessage/${v1()}`,
  default: "",
});
export const userEmailMessage = atom({
  key: `userEmailMessage/${v1()}`,
  default: "",
});
export const userPasswordMessage = atom({
  key: `userPasswordMessage/${v1()}`,
  default: "",
});
