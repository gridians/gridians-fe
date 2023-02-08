import { atom } from "recoil";
import { v1 } from "uuid";

export const imgSrc = atom({
  key: `imgSrc/${v1()}`,
  default: "",
});
export const skillSrc = atom({
  key: `skillSrc/${v1()}`,
  default: "",
});
export const nickNameText = atom({
  key: `nickNameText/${v1()}`,
  default: "",
});
export const statusMessage = atom({
  key: `statusMessage/${v1()}`,
  default: "",
});
export const position = atom({
  key: `position/${v1()}`,
  default: "",
});
export const language = atom({
  key: `language/${v1()}`,
  default: "",
});
export const introduceText = atom({
  key: `introduceText/${v1()}`,
  default: "",
});
export const github = atom({
  key: `github/${v1()}`,
  default: "",
});
export const instagram = atom({
  key: `instagram/${v1()}`,
  default: "",
});
export const twitter = atom({
  key: `twitter/${v1()}`,
  default: "",
});
export const tag = atom({
  key: `tag/${v1()}`,
  default: [],
});