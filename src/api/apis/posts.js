import apiCall from '../service';

export const createPosts = async ({ folderId, url, tags = [], token }) => {
  return apiCall({
    method: 'post',
    url: '/content/posts',
    data: {
      folderId,
      url,
      tags,
    },
    token,
  });
};

export const getSearchPosts = async ({ tags, folderId, sort, token }) => {
  let keywords = '';
  tags.forEach(tag => (keywords += `keywords[]=${tag}`));

  return apiCall({
    method: 'get',
    url: `/content/posts/search?${keywords}&folderId=${folderId}&sort=${sort}`,
    token,
  });
};

export const deletePosts = async ({ postIds = [], token }) => {
  return apiCall({
    method: 'delete',
    url: '/content/posts',
    data: {
      postIds,
    },
    token,
  });
};

export const deletePostsPermanently = async ({ postIds = [], token }) => {
  return apiCall({
    method: 'delete',
    url: '/content/posts/permanently',
    data: {
      postIds,
    },
    token,
  });
};

export const getDeletedPosts = async token => {
  return apiCall({
    method: 'get',
    url: '/content/posts/bin',
    token,
  });
};

export const restorePosts = async token => {
  return apiCall({
    method: 'put',
    url: '/content/posts/restore',
    token,
  });
};

export const getPost = async ({ id, token }) => {
  return apiCall({
    method: 'get',
    url: `/content/posts/${id}`,
    token,
  });
};
