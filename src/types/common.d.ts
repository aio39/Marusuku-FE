export type TimeStamps = {
  updated_at: string
  create_at: string
}

type CommonProps = {
  id: number
} & TimeStamps
