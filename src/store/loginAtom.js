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