import { mutate } from 'swr';
import useSWRImmutable from 'swr/immutable';
import { LoginData, User } from '../../types/User';
import { axiosI, fetcher } from '../fetcher';
const URL_USER = '/api/user';
const URL_LOGIN = '/api/login';
const URL_LOGOUT = '/api/logout';

const useUser = () => {
  const { data, error, mutate, isValidating } = useSWRImmutable<User>(
    URL_USER,
    fetcher,
    { errorRetryCount: 0 }
  );
  return { data, error, mutate, isValidating };
};

const useLogin = async (loginData: LoginData) => {
  try {
    const { data, status } = await axiosI.post<User>(`${URL_LOGIN}`, loginData);
    mutate(URL_USER, data, false);
    return true;
  } catch (error) {
    return false;
  }
};

const useLogOut = async () => {
  try {
    const { data, status } = await axiosI.get(`${URL_LOGOUT}`);
    return undefined;
  } catch (error) {
    return undefined;
  }
};
export { useLogin, useUser, useLogOut };
