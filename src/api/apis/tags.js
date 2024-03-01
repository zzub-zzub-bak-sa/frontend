import apiCall from '../service';

export const getTags = async ({ keyword, token }) => {
  return apiCall({
    method: 'get',
    url: `/content/tags?keyword=${keyword}`,
    token,
  });
};

export const getTagsByFolderId = async ({ folderId, token }) => {
  return apiCall({
    method: 'get',
    url: `/content/tags/folders/${folderId}`,
    token,
  });
};
