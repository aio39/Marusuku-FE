import dayjs from 'dayjs'

const convertDate = (data: string) => {
  return dayjs(data).format('YYYY/MM/DD')
}

export default convertDate
