import instance from './instance';

const handleApiError = (error, url) => {
  console.log(`${url}: ${error.message}`);
};

const apiCall = async ({ method, url, data, token }) => {
  try {
    if (token) {
      instance.defaults.headers.common.Authorization = `Bearer ${token}`;
    }

    const response = await instance[method](url, data);
    return response.data;
  } catch (error) {
    handleApiError(error, url);
    throw error;
  }
};

export default apiCall;
