import dayjs from 'dayjs'

const FORMAT = {
  YMD: 'YYYY/MM/DD',
  YMDHM: 'YYYY/MM/DD A hh/mm',
}

const convertDate = (data: string, format: keyof typeof FORMAT = 'YMD') => {
  return dayjs(data).format(FORMAT[format])
}

export default convertDate
