import { atom, selector } from "recoil";
import { v1 } from "uuid";

export const loginUserId = atom({
    key: `loginUserId/${v1()}`,
    default: "",
});

export const loginUserPw = atom({
    key: `loginUserPw/${v1()}`,
    default: "",
});

// export const userNicknameSelector = selector({
//   key: `user/${v1()}`,
//   get: ({ get }) => {
//     const nickname = get(userNickname);
//     return nickname;
//   },
//   set: ({ set }, newValue) => {
//     console.log(newValue);
//     set(userNickname, newValue);
//   },
// });

export const userEmailSelector = selector({
  key: `user/${v1()}`,
  get: ({ get }) => {
    const email = get(loginUserId);
    return email;
  },
  set: ({ set }, newValue) => {
    console.log(newValue);
    set(loginUserId, newValue);
  },
});

// export const userPasswordSelector = selector({
//   key: `user/${v1()}`,
//   get: ({ get }) => {
//     const password = get(userPassword);
//     return password;
//   },
//   set: ({ set }, newValue) => {
//     console.log(newValue);
//     set(userPassword, newValue);
//   },
// });