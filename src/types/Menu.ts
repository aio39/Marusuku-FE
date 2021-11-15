import { CommonProps } from './common'

export type Menu = {
  name: string
  cycle_month: number
  limit_day?: number
  limit_week?: number
  limit_month?: number
  limit_year?: number
  price: number
  vanish: number
  score?: number
  desc?: string
  img?: string
  shop_id: number
} & CommonProps

export type MenuInputs = Omit<Menu, 'shop_id' | keyof CommonProps>
