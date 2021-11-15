import { Shop } from './Shop'
export type User = {
  id: number
  name: string
  email: string
  photo?: string
  shop?: Shop
}

export type CreteUserData = Pick<User, 'name' | 'email'> & {
  password: string
  confirm: string
}

export type LoginData = {
  email: string
  password: string
}
