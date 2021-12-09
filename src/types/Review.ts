import { Menu } from '@/types/Menu'
import { Shop } from '@/types/Shop'
import { User } from '@/types/User'
import { CommonProps } from './common'

export type Review = {
  content?: string
  score: number
  shop_id: number
  menu_id: number
  user_id: number
  user: User
  shop: Shop
  menu: Menu
} & CommonProps

export type ReviewInputs = Omit<Review, 'shop_id' | 'user_id' | 'menu_id' | keyof CommonProps>
