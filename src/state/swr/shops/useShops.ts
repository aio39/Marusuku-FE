import useSWR from 'swr'
import useSWRImmutable from 'swr/immutable'
import { NEWS, Shop } from '../../../types/Shop'
import { axiosI } from '../../fetcher'
import laggy from '../middleware/laggy'

const URL_SHOP = '/api/shops'

const fetcher = (url: string, ...rest: number[]) => {
  const news = {
    b: rest[0],
    l: rest[1],
    r: rest[2],
    t: rest[3],
    take: rest[4] ?? 50,
  }
  return axiosI
    .get(url, { params: news })
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      console.log(err, '에러데이터')
      throw new Error('An error occurred while fetching the data.')
    })
}

const useShops = (news?: NEWS, take?: number) => {
  const swrResponses = useSWR<Shop[]>(
    () => {
      if (!news) {
        return null
      } else {
        const { b, l, r, t } = news
        return [URL_SHOP + '/find', b, l, r, t, take]
      }
    },
    fetcher,
    {
      use: [laggy],
    }
  )
  return swrResponses
}

const useMyShop = () => {
  return useSWRImmutable<Shop>(URL_SHOP, fetcher)
}

const useShop = (id?: number) => {
  return useSWRImmutable<Shop>(id ? `${URL_SHOP}/${id}` : null, fetcher)
}

export { useShops, useMyShop, useShop }
