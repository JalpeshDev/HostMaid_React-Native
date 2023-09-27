import axios from 'axios';
import {localStorage} from '../localStorageProvider';
import {url} from '../apiUrl';

const axiosInstance = axios.create({baseURL: url});
axiosInstance.defaults.timeout = 1000 * 15;

axiosInstance.interceptors.request.use(async config => {
  const token = await localStorage.getItemObject('token');
  console.log('token', token);

  if (token) {
    (config.headers['Content-Type'] = 'application/json'),
      (config.headers['Authorization'] = `${token}`);
  }
  return config;
});
export default axiosInstance;
