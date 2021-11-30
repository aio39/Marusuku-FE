import { CommonProps } from '@/types/common'
import { Menu } from './Menu'
import { Shop } from './Shop'

export type Subscribe = {
  settlement_date: string
  end_date: string
  user_id: number
  shop_id: number
  menu_id: number
  menu: Menu
  shop: Shop
  continue: boolean
} & CommonProps
