import { CommonFSW, Pagination } from '@/types/common'
import useSWR from 'swr'
import useSWRImmutable from 'swr/immutable'
import { NEWS, Shop } from '../../../types/Shop'
import { axiosI, fetcher } from '../../fetcher'
import { createFSWQueryString, createNEWSQueryString } from '../createQueryString'
import laggy from '../middleware/laggy'

const URL_SHOP = '/api/shops'

const useShops = (query?: CommonFSW, news?: NEWS) => {
  let url = URL_SHOP + '?'
  query && (url += createFSWQueryString(query))
  news && (url += createNEWSQueryString(news))

  const swrResponses = useSWR<Pagination<Shop>>(url, fetcher, {
    use: [laggy],
    // suspense: true,
  })

  return swrResponses
}

const useShop = (id?: number) => {
  return useSWRImmutable<Shop>(id ? `${URL_SHOP}/${id}` : null, fetcher)
}

const useMyShop = () => {
  return useSWRImmutable<Shop>(URL_SHOP, fetcher)
}

export { useShops, useMyShop, useShop }
