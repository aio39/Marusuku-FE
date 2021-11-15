import { CommonProps } from '@/types/common'
import { Menu } from '@/types/Menu'
import useSWR from 'swr'
import useSWRImmutable from 'swr/immutable'
import { NEWS, Shop } from '../../../../types/Shop'
import { axiosI, fetcher } from '../../../fetcher'
import laggy from '../../middleware/laggy'

// const URL_SHOP = '/api/shops'

type Pagination<T> = {
  current_page: number
  last_page: number
  per_page: number
  total: number
  data: T[]
}

type Pagination_Query = {
  page?: number
  perPage?: number
}

type makePaginationURLParams = {
  prefix: string
} & Pagination_Query

type uesMenusP = {
  shop_id?: number
} & Pagination_Query

const makePaginationURL = ({ prefix, page, perPage }: makePaginationURLParams) => {
  return `${prefix}?${page ? 'page=' + page : ''}&${perPage ? 'per_page' + perPage : ''}`
}

const makeMenusURL = (shop_id: number, menu_id?: number) => {
  return `/api/shops/${shop_id}/menus/` + (menu_id ?? '')
}

const useMenus = ({ shop_id, page, perPage }: uesMenusP) => {
  const swrResponses = useSWR<Pagination<Menu>>(
    shop_id ? makePaginationURL({ prefix: makeMenusURL(shop_id), page, perPage }) : null,
    fetcher,
    {
      use: [laggy],
    }
  )
  return swrResponses
}

export { useMenus }
