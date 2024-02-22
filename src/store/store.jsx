import { atom } from 'recoil';

const dataByLinkState = atom({
  key: 'dataByLink',
  default: {
    folderId: null,
    url: '',
    tags: [],
  },
});

const userState = atom({
  key: 'userState',
  default: {
    isLogIn: false,
    id: '',
    nickname: '',
  },
});

const tokenState = atom({
  key: 'tokenState',
  default: '',
});

export { dataByLinkState, userState, tokenState };
