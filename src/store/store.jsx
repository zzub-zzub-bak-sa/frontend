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
    token: '',
    isLogIn: false,
    id: '',
    nickname: '',
  },
});

export { dataByLinkState, userState };
