import { fetcher } from '@/state/fetcher'
import { Subscribe } from '@/types/Subscribe'
import useSWRImmutable from 'swr/immutable'
const URL_USER = '/api/users'
const URL_LOGIN = '/api/login'
const URL_LOGOUT = '/api/logout'

const useSubscribe = (user_id?: number) => {
  const { data, error, mutate, isValidating } = useSWRImmutable<Subscribe[]>(
    user_id ? `/api/users/${user_id}/subscribes` : null,
    fetcher,
    {
      errorRetryCount: 1,
    }
  )
  return { data, error, mutate, isValidating }
}

export { useSubscribe }
