import { fetcher } from '@/state/fetcher'
import { createFSWQueryString, createNEWSQueryString } from '@/state/swr/createQueryString'
import laggy from '@/state/swr/middleware/laggy'
import { CommonFSW, Pagination } from '@/types/common'
import { NEWS, Shop } from '@/types/Shop'
import useSWR from 'swr'
import useSWRImmutable from 'swr/immutable'

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
