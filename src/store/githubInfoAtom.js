import { atom } from "recoil";
import { v1 } from "uuid";

export const githubConnection = atom({
  key: `githubConnection/${v1()}`,
  default: false,
});
export const githubProfileImageUrl = atom({
  key: `githubProfileImageUrl/${v1()}`,
  default: "",
});
export const githubAccount = atom({
  key: `githubAccount/${v1()}`,
  default: "",
});
export const follower = atom({
  key: `follower/${v1()}`,
  default: "",
});
export const following = atom({
  key: `following/${v1()}`,
  default: "",
});
export const recentCommitMessage = atom({
  key: `recentCommitMessage/${v1()}`,
  default: "",
});
