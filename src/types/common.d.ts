export type TimeStamps = {
  updated_at: string
  create_at: string
}

type CommonProps = {
  id: number
} & TimeStamps

type CommonFSW = {
  filter?: [string, string | number][]
  sort?: string[]
  with?: string[]
  start?: string
  end?: string
  per_page?: number
}

type Pagination<T> = {
  data: T[]
  meta: {
    current_page: number
    from: number
    to: number
    last_page: number
    total: number
  }
}
