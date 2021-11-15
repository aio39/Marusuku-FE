import { CommonProps } from './common'

export type Menu = {
  name: string
  cycle_month: number
  limit_day?: number
  limit_week?: number
  limit_month?: number
  limit_year?: number
  limit_day_amount?: number
  limit_week_amount?: number
  limit_month_amount?: number
  limit_year_amount?: number
  price: number
  vanish: number
  score?: number
  desc?: string
  img?: string
  shop_id: number
} & CommonProps

export type MenuInputs = Omit<Menu, 'shop_id' | 'vanish' | keyof CommonProps>
