import axios from 'axios';
import { atom, selector } from 'recoil';
import { v1 } from 'uuid';

export const commentAtom = atom({
  key: `commentAtom/${v1}`,
  default:"",
});

// export const validAtom = atom({
//   key: `validAtom/${v1}`,
//   default: false,
// });

// export const commentListAtom = atom({
//   key: `commentListAtom/${v1}`,
//   default: [],
// });

// export const getUserComment = selector({
//   key: `getUseComment/${v1}`,
//   get: async () => {
//     const res = await axios.get(
//       "http://175.215.143.189:8080/cards/1/comments/3"
//     );
//     console.log(res);
//     return res.data;
//   },
// });