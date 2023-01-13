import { atom } from 'recoil';
import { v1 } from 'uuid';

export const commentAtom = atom({
  key: `commentAtom/${v1}`,
  default:"",
});

export const validAtom = atom({
  key: `validAtom/${v1}`,
  default: false,
});

export const commentListAtom = atom({
  key: `commentListAtom/${v1}`,
  default: [],
});