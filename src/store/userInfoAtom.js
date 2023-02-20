import { atom, selector } from "recoil";
import { v1 } from "uuid";
import { cookieApi } from '../apis/untils';

const localStorageEffect =
  ( {setSelf, onSet} ) => {
    const nicknameKey = `nickname`;
    const savedValue = localStorage.getItem(nicknameKey);

    // Callbacks to set or reset the value of the atom.
    if (savedValue != null) {
      setSelf(savedValue);
    }

    // Subscribe to changes in the atom value.
     onSet((newValue, _, isReset) => {
       isReset
         ? localStorage.removeItem(nicknameKey)
         : localStorage.setItem(nicknameKey, JSON.stringify(newValue));
     });
  };

export const loginUserNickname = atom({
  key: `loginUserNickname/${v1()}`,
  default: "",
  effects_UNSTABLE: [localStorageEffect],
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

export const loginGithubId = atom({
  key:`loginGithubId/${v1()}`,
  default: "",
})


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
      const res = await cookieApi.get("/user/valid");
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