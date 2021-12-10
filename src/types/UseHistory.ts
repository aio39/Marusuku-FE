import { CommonProps } from '@/types/common'
import { Menu } from '@/types/Menu'
import { Shop } from '@/types/Shop'
import { User } from '@/types/User'

export type UseHistory = {
  discount: number
  user_id: number
  shop_id: number
  menu_id: number
  user: User
  menu: Menu
  shop: Shop
} & CommonProps
