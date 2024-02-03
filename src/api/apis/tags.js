import apiCall from '../service';

export const getTags = async ({ keyword }) => {
  return apiCall({
    method: 'get',
    url: `/content/tags?keyword=${keyword}`,
  });
};

export const getTagsByFolderId = async ({ folderId }) => {
  return apiCall({
    method: 'get',
    url: `/content/tags/folders/${folderId}`,
  });
};
