import apiCall from '../service';

export const createPosts = async ({ folderId, url, tags = [] }) => {
  return apiCall({
    method: 'post',
    url: '/content/posts',
    data: {
      folderId,
      url,
      tags,
    },
  });
};

export const getSearchPosts = async ({ tags, folderId, sort }) => {
  let keywords = '';
  tags.forEach(tag => (keywords += `keywords[]=${tag}`));

  return apiCall({
    method: 'get',
    url: `/content/posts/search?${keywords}&folderId=${folderId}&sort=${sort}`,
  });
};

export const deletePosts = async ({ postIds = [] }) => {
  return apiCall({
    method: 'delete',
    url: '/content/posts',
    data: {
      postIds,
    },
  });
};

export const deletePostsPermanently = async ({ postIds = [] }) => {
  return apiCall({
    method: 'delete',
    url: '/content/posts/permanently',
    data: {
      postIds,
    },
  });
};

export const getDeletedPosts = async () => {
  return apiCall({
    method: 'get',
    url: '/content/posts/bin',
  });
};

export const restorePosts = async () => {
  return apiCall({
    method: 'put',
    url: '/content/posts/restore',
  });
};

export const getPost = async ({ id }) => {
  return apiCall({
    method: 'get',
    url: `/content/posts/${id}`,
  });
};
