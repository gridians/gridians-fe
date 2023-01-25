import { atom, selector } from 'recoil';
import { v1 } from "uuid";

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

export const userNicknameSelector = selector({
  key: `user/${v1()}`,
  get: ({ get }) => {
    const nickname = get(userNickname);
    return nickname;
  },
  set: ({ set }, newValue) => {
    console.log(newValue);
    set(userNickname, newValue);
  },
});

export const userEmailSelector = selector({
  key: `user/${v1()}`,
  get: ({ get }) => {
    const email = get(userEmail);
    return email;
  },
  set: ({ set }, newValue) => {
    console.log(newValue);
    set(userEmail, newValue);
  },
});

export const userPasswordSelector = selector({
  key: `user/${v1()}`,
  get: ({ get }) => {
    const password = get(userPassword);
    return password;
  },
  set: ({ set }, newValue) => {
    console.log(newValue);
    set(userPassword, newValue);
  },
});