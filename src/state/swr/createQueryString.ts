import { CommonFSW } from '@/types/common'
import { NEWS } from '@/types/Shop'

const createFSWQueryString = (query: CommonFSW): string => {
  const { filter, sort, start, end, with: aWith, per_page } = query
  const url = new URLSearchParams()
  if (filter) {
    let filterString = ''
    for (const [area, value] of filter) {
      filterString += area + ':' + value
    }
    url.set('filter', filterString)
  }
  if (sort) {
    url.set('sort', sort.join(','))
  }
  if (aWith) {
    url.set('with', aWith.join(','))
  }

  if (start && end) {
    url.set('start', start)
    url.set('end', end)
  }

  if (per_page) {
    url.set('per_page', per_page.toString())
  }

  return url.toString() + '&'
}

const createNEWSQueryString = (query: NEWS): string => {
  const url = new URLSearchParams()
  Object.entries(query).forEach((entry) => {
    const [key, value] = entry
    url.set(key, value.toString())
  })
  return url.toString() + '&'
}

export { createFSWQueryString, createNEWSQueryString }
