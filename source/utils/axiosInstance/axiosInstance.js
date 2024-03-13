import axios from 'axios';
import { localStorage } from '../localStorageProvider';
import { url } from '../apiUrl';

const AxiosInstance = axios.create({ baseURL: url });
AxiosInstance.defaults.timeout = 1000 * 15;

AxiosInstance.interceptors.request.use(async config => {
  const token = await localStorage.getItemObject('token');

  if (token) {
    (config.headers['Content-Type'] = 'application/json'),
      (config.headers['Authorization'] = `${token}`);
  }
  return config;
});
export default AxiosInstance;
