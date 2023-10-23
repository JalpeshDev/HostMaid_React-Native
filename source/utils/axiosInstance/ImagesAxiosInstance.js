import axios from 'axios';
import {url} from '../apiUrl';
import {localStorage} from '../localStorageProvider';

const ImagesAxiosInstance = axios.create({baseURL: url});
ImagesAxiosInstance.defaults.timeout = 1000 * 120;

ImagesAxiosInstance.interceptors.request.use(async config => {
  const token = await localStorage.getItemObject('token');
  if (token) {
    (config.headers['Content-Type'] = 'multipart/form-data'),
      (config.headers['Authorization'] = `${token}`);
  }
  return config;
});
export default ImagesAxiosInstance;
