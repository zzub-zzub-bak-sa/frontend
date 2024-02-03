import { Alert } from 'react-native';
import instance from './instance';

const handleApiError = error => {
  Alert.alert(`${error.message}`);
};

const apiCall = async ({ method, url, data }) => {
  try {
    const response = await instance[method](url, data);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export default apiCall;
