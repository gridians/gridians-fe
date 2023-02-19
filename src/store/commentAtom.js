import axios from 'axios';
import { atom, selector } from 'recoil';
import { v1 } from 'uuid';

export const cardId = atom({
  key: `cardAtom/${v1}`,
  default:"",
});

export const cardIdSelector = selector({
  key: `cardIdSelector/${v1}`,
  get: ({ get }) => {
    return get(cardId);
  },
  set:({set}, newValue)=>{
    set(cardId, newValue)
  }
  
})
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