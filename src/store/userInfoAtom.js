import { useEffect } from 'react';
import { atom, selector, selectorFamily } from "recoil";
import { v1 } from "uuid";
import { api, cookieApi } from '../apis/untils';
import { getCookieToken } from '../cookie/cookie';

export const loginUserNickname = atom({
  key: `loginUserNickname/${v1()}`,
  default: "",
});

export const loginUserEmail = atom({
  key: `loginUserEmail/${v1()}`,
  default: "",
});

export const loginUserPassword = atom({
  key: `loginUserPassword/${v1()}`,
  default: "",
});

export const loginUserPasswordLength = atom({
  key: `loginUserPasswordLength/${v1()}`,
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
    get: async ({ get }) => {
      const res = await cookieApi.get("/user/valid"
      );
        return res.data.email;
    },
    set: ({ set }, newValue) => {
      console.log(newValue);
      set(loginUserEmail, newValue);
  }
});

export const userNicknameSelector = selector({
  key: `user/${v1()}`,
  get: ({ get }) => {
    return get(loginUserNickname);
  },
});

export const userPasswordLengthSelector = selector({
  key: `user/${v1()}`,
  get: ({ get }) => {
    return get(loginUserPasswordLength);
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