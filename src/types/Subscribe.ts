import { CommonProps } from '@/types/common'

export type Subscribe = {
  settlement_date: number
  user_id: number
  shop_id: number
  menu_id: number
  continue: boolean
} & CommonProps
