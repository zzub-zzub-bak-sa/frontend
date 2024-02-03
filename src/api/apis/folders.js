import apiCall from '../service';

export const postFolders = async ({ name, assetType }) => {
  return apiCall({
    method: 'post',
    url: '/content/folders',
    data: {
      name,
      assetType,
    },
  });
};

export const getFolderBySharing = async ({ keyword }) => {
  return apiCall({
    method: 'get',
    url: `/content/folders/by-sharing?keyword=${keyword}`,
  });
};

export const getFolderForHome = async ({ sort = 'alphabet' | 'newest' | 'oldest' }) => {
  return apiCall({
    method: 'get',
    url: `/content/folders/home?sort=${sort}`,
  });
};

export const getFolder = async ({ id, sort = 'newest' | 'oldest' | 'recommend' }) => {
  return apiCall({
    method: 'get',
    url: `/content/folders/${id}?sort=${sort}`,
  });
};

export const updateFolder = async ({ id, name, assetType }) => {
  return apiCall({
    method: 'put',
    url: `/content/folders/${id}`,
    data: {
      name,
      assetType,
    },
  });
};

export const deleteFolder = async ({ id }) => {
  return apiCall({
    method: 'delete',
    url: `/content/folders/${id}`,
  });
};

export const getSearch = async ({ keyword }) => {
  return apiCall({
    method: 'get',
    url: `/content/folders/search?keyword=${keyword}`,
  });
};

export const getAutoComplete = async ({ keyword }) => {
  return apiCall({
    method: 'get',
    url: `/content/folders/auto-complete?keyword=${keyword}`,
  });
};
