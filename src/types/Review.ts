import { User } from '@/types/User'
import { CommonProps } from './common'

export type Review = {
  content?: string
  score: number
  shop_id: number
  menu_id: number
  user_id: number
  user: User
} & CommonProps

export type ReviewInputs = Omit<Review, 'shop_id' | 'user_id' | 'menu_id' | keyof CommonProps>
