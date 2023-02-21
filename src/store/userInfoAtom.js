import { atom } from "recoil";
import { v1 } from "uuid";

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

export const userBookMarkList = atom({
  key:`userBookMarkList/${v1()}`,
  default: "",
})

