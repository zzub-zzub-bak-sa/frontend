import apiCall from '../service';

export const createUser = async ({ id, nickname }) => {
  return apiCall({
    method: 'post',
    url: '/account/users',
    data: {
      id,
      nickname,
    },
  });
};

export const signin = async ({ id }) => {
  return apiCall({
    method: 'post',
    url: '/account/users/sign-in',
    data: {
      id,
    },
  });
};

export const withdrawApproval = async () => {
  return apiCall({
    method: 'post',
    url: '/account/user/withdraw',
  });
};

export const updateUser = async ({ nickname }) => {
  return apiCall({
    method: 'put',
    url: '/account/users',
    data: {
      nickname,
    },
  });
};

export const getMe = async () => {
  return apiCall({
    method: 'get',
    url: '/account/users/me',
  });
};
