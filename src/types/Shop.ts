import { CommonProps } from './common'

export type Location = {
  coordinates: [number, number]
  type: 'Point'
}

export type Shop = {
  name: string
  desc?: string
  homepage?: string
  phone?: string
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
} & CommonProps

export type NEWS = {
  [k in 't' | 'b' | 'r' | 'l']: number
}
