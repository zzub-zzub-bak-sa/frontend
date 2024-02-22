import instance from './instance';

const handleApiError = error => {
  console.log(`${error.message}`);
};

const apiCall = async ({ method, url, data, token }) => {
  try {
    if (token) {
      instance.defaults.headers.common.Authorization = `Bearer ${token}`;
    }

    const response = await instance[method](url, data);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export default apiCall;
