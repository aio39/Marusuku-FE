import axios from 'axios';
import { LOCAL_URL } from '../const';

const config = {
  baseURL: 'http://' + LOCAL_URL,
  withCredentials: true,
  timeout: 5000,
};

const axiosI = axios.create(config);

const fetcher = (url: string) =>
  axiosI
    .get(url)
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((err) => {
      console.log(err, '에러데이터');
      throw new Error('An error occurred while fetching the data.');
    });

export { fetcher, axiosI };
