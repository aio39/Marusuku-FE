import { fetcher } from '@/state/fetcher'
import { CommonFSW, Pagination } from '@/types/common'
import { Subscribe } from '@/types/Subscribe'
import useSWR from 'swr'
import { createFSWQueryString } from '../createQueryString'
const URL_USER = '/api/users'
const URL_LOGIN = '/api/login'
const URL_LOGOUT = '/api/logout'
const URL_SUBSCRIBE = '/api/subscribes'

const useSubscribes = (query?: CommonFSW) => {
  let url = URL_SUBSCRIBE + '?'
  query && (url += createFSWQueryString(query))

  // 기본적으로 with에 shop과 menu 포한됨.
  const { data, error, mutate, isValidating } = useSWR<Pagination<Subscribe>>(
    query ? url : null,
    fetcher,
    {
      errorRetryCount: 1,
    }
  )
  return { data, error, mutate, isValidating }
}

const useSubscribe = (id?: number) => {
  let url = URL_SUBSCRIBE + '/' + id

  const { data, error, mutate, isValidating } = useSWR<Subscribe>(id ? url : null, fetcher, {
    errorRetryCount: 1,
  })
  return { data, error, mutate, isValidating }
}

export { useSubscribes, useSubscribe }
