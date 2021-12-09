import { CommonProps } from './common'

export type Location = {
  coordinates: [number, number]
  type: 'Point'
}

export type Category = {
  id: number
  name: string
}

export type Shop = {
  name: string
  description?: string
  homepage?: string
  phone?: string
  score: number
  score_count: number
  score_total: number
  updated_at: string
  create_at: string
  img?: string
  lat: number
  lng: number
  address: string
  address2?: string
  location: Location
  category: Category
} & CommonProps

export type NEWS = {
  // [k in 't' | 'b' | 'r' | 'l']: number
  t: number
  b: number
  r: number
  l: number
}

export type DistanceSearchData = {
  distance: number
  lng: number
  lat: number
}
