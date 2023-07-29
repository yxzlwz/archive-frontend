import axios from 'axios';
import { store } from './store';

export const Axios = axios.create({
  baseURL: '/api',
});

Axios.interceptors.request.use(
  async config => {
    if (config.url.indexOf('http') !== 0) {
      if (store.state.jwt) {
        config.headers.Authorization = store.state.jwt;
      }
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

Axios.interceptors.response.use(
  response => {
    const data = response.data;
    if (data.status && data.status !== 'success') {
      window.message.error(data.message);
      return Promise.reject(response);
    }
    return data;
  },
  response => {
    window.message.error(response.message);
  }
);

export default {
  Axios,
  install(app) {
    app.config.globalProperties.$axios = Axios;
  },
};
