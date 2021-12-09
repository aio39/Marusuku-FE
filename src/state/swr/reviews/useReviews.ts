import { fetcher } from '@/state/fetcher'
import { CommonFSW, Pagination } from '@/types/common'
import useSWR from 'swr'
import { createFSWQueryString } from '../createQueryString'
import laggy from '../middleware/laggy'
import { Review } from './../../../types/Review'

const URL_REVIEWS = '/api/reviews'

const useReviews = (query?: CommonFSW) => {
  let url = URL_REVIEWS + '?'
  query && (url += createFSWQueryString(query))

  const swrResponses = useSWR<Pagination<Review>>(query ? url : null, fetcher, {
    use: [laggy],
  })

  return swrResponses
}

const useReview = (review_id: number) => {
  const url = `${URL_REVIEWS}/${review_id}`
  const swrResponses = useSWR<Review>(url, fetcher, {
    use: [laggy],
  })
  return swrResponses
}

export { useReviews, useReview }
