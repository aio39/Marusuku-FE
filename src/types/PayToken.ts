import { CommonProps } from './common'

export type PayToken = {
  user_id: number
  shop_id: number
  menu_id: number
  uuid: string
} & CommonProps
