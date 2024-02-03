import axios from 'axios';
import { BASE_URL } from '@env';

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    Accept: 'application/json',
  },
  withCredentials: true,
});

export default instance;
