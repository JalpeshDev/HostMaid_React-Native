import axios from 'axios';
import {url} from '../apiUrl';
import {localStorage} from '../localStorageProvider';

const ImgaesAxiosInstance = axios.create({baseURL: url});
ImgaesAxiosInstance.defaults.timeout = 1000 * 120;

ImgaesAxiosInstance.interceptors.request.use(async config => {
  const token = await localStorage.getItemObject('token');
  if (token) {
    (config.headers['Content-Type'] = 'multipart/form-data'),
      (config.headers['Authorization'] = `${token}`);
  }
  return config;
});
export default ImgaesAxiosInstance;
