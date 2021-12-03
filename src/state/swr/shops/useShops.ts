import { fetcher } from '@/state/fetcher'
import { createFSWQueryString, createNotNestedQueryString } from '@/state/swr/createQueryString'
import laggy from '@/state/swr/middleware/laggy'
import { CommonFSW, Pagination } from '@/types/common'
import { DistanceSearchData, NEWS, Shop } from '@/types/Shop'
import useSWR, { SWRResponse } from 'swr'
import useSWRImmutable from 'swr/immutable'
import useSWRInfinite, { SWRInfiniteResponse } from 'swr/infinite'

const URL_SHOP = '/api/shops'

type IUseShops = {
  (query?: CommonFSW, news?: NEWS, isPass?: boolean): SWRResponse<Pagination<Shop>, any>
  (query?: CommonFSW, distance?: DistanceSearchData, isPass?: boolean): SWRResponse<
    Pagination<Shop>,
    any
  >
}

type IUseShopsInfinite = {
  (query?: CommonFSW, news?: NEWS, isPass?: boolean): SWRInfiniteResponse<Pagination<Shop>, any>
  (query?: CommonFSW, distance?: DistanceSearchData, isPass?: boolean): SWRInfiniteResponse<
    Pagination<Shop>,
    any
  >
}

const useShops: IUseShops = (query, condition, isPass) => {
  let url = URL_SHOP + '?'
  query && (url += createFSWQueryString(query))
  condition && (url += createNotNestedQueryString(condition))

  const swrResponses = useSWR<Pagination<Shop>>(isPass ? null : url, fetcher, {
    use: [laggy],
    // suspense: true,
  })

  return swrResponses
}

const useShopsInfinite: IUseShopsInfinite = (query, condition, isPass) => {
  const getKey = (pageIndex, previousPageData) => {
    if (isPass) return null
    if (previousPageData && !previousPageData.data.length) return null // reached the end
    let url = URL_SHOP + '?'
    query && (url += createFSWQueryString(query))
    condition && (url += createNotNestedQueryString(condition))
    console.log('url', pageIndex, url)
    return url + `page=${pageIndex + 1}`
  }

  const swrResponses = useSWRInfinite<Pagination<Shop>>(getKey, fetcher, {
    // use: [laggy],
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

export { useShops, useMyShop, useShop, useShopsInfinite }
