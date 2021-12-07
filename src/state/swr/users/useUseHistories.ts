import { fetcher } from '@/state/fetcher'
import { CommonFSW, Pagination } from '@/types/common'
import { UseHistory } from '@/types/UseHistory'
import useSWR from 'swr'
import { createFSWQueryString } from '../createQueryString'
import laggy from '../middleware/laggy'

const URL_USE_HISTORY = '/api/use_histories'

const useUseHistories = (query?: CommonFSW) => {
  let url = URL_USE_HISTORY + '?'
  query && (url += createFSWQueryString(query))

  // 기본적으로 with에 shop과 menu 포한됨.
  const swrResponses = useSWR<Pagination<UseHistory>>(query ? url : null, fetcher, {
    // use: [laggy],
  })

  return swrResponses
}

const useUseHistory = (menu_id: number) => {
  const url = `${URL_USE_HISTORY}/${menu_id}`

  const swrResponses = useSWR<UseHistory>(url, fetcher, {
    use: [laggy],
  })
  return swrResponses
}

export { useUseHistories, useUseHistory }
