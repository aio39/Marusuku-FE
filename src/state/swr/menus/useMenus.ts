import { fetcher } from '@/state/fetcher'
import { CommonFSW, Pagination } from '@/types/common'
import { Menu } from '@/types/Menu'
import useSWR from 'swr'
import { createFSWQueryString } from '../createQueryString'
import laggy from '../middleware/laggy'

const URL_MENUS = '/api/menus'

const useMenus = (query?: CommonFSW) => {
  let url = URL_MENUS + '?'
  query && (url += createFSWQueryString(query))

  const swrResponses = useSWR<Pagination<Menu>>(query ? url : null, fetcher, {
    use: [laggy],
  })

  return swrResponses
}

const useMenu = (menu_id: number) => {
  const url = `${URL_MENUS}/${menu_id}`

  const swrResponses = useSWR<Menu>(url, fetcher, {
    use: [laggy],
  })
  return swrResponses
}

export { useMenus, useMenu }
