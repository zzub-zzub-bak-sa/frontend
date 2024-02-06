import { atom } from 'recoil';

const dataByLinkState = atom({
  key: 'dataByLink',
  default: {
    folderId: null,
    url: '',
    tags: [],
  },
});

export {
  dataByLinkState,
  //
};
