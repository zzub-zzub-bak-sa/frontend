import apiCall from '../service';

export const createFolder = async ({ name, assetType, token }) => {
  return apiCall({
    method: 'post',
    url: '/content/folders',
    data: {
      name,
      assetType,
    },
    token,
  });
};

export const getFolderBySharing = async ({ keyword, token }) => {
  return apiCall({
    method: 'get',
    url: `/content/folders/by-sharing?keyword=${keyword}`,
    token,
  });
};

export const getFolderForHome = async ({ sort = 'alphabet', token }) => {
  return apiCall({
    method: 'get',
    url: `/content/folders/home${sort ? `?sort=${sort}` : ''}}`,
    token,
  });
};

export const getFolder = async ({ id, sort = 'newest', token }) => {
  return apiCall({
    method: 'get',
    url: `/content/folders/${id}?sort=${sort}`,
    token,
  });
};

export const updateFolder = async ({ id, name, assetType, token }) => {
  return apiCall({
    method: 'put',
    url: `/content/folders/${id}`,
    data: {
      name,
      assetType,
    },
    token,
  });
};

export const deleteFolder = async ({ id, token }) => {
  return apiCall({
    method: 'delete',
    url: `/content/folders/${id}`,
    token,
  });
};

export const getSearch = async ({ keyword, token }) => {
  return apiCall({
    method: 'get',
    url: `/content/folders/search?keyword=${keyword}`,
    token,
  });
};

export const getAutoComplete = async ({ keyword, token }) => {
  return apiCall({
    method: 'get',
    url: `/content/folders/auto-complete?keyword=${keyword}`,
    token,
  });
};
