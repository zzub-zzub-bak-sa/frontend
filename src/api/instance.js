import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://mokkitlink.store/',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    Accept: 'application/json',
  },
  withCredentials: true,
});

export default instance;
