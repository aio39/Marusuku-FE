import useSWR, { mutate } from 'swr';
import { LoginData, User } from '../../types/User';
import { axiosI, fetcher } from '../fetcher';

const URL_USER = '/api/user';
const URL_LOGIN = '/api/login';
const URL_LOGOUT = '/api/logout';

const useUser = () => {
  const { data, error, mutate } = useSWR<User>(URL_USER, fetcher);
  console.log(data);
  console.log('eror임', error);
  return { data, error, mutate };
};

const useLogin = async (loginData: LoginData) => {
  try {
    const { data, status } = await axiosI.post<User>(`${URL_LOGIN}`, loginData);
    mutate(URL_USER, data, false);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const useLogOut = async () => {
  try {
    const { data, status } = await axiosI.get(`${URL_LOGOUT}`);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
export { useLogin, useUser, useLogOut };
