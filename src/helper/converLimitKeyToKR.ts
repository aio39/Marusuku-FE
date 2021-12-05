import { MenuLimit } from '@/types/Menu'

const convertLimitKeyToKR = (key: keyof MenuLimit) => {
  switch (key) {
    case 'limit_day':
      return '일 사용 횟수'

    case 'limit_week':
      return '주 사용 횟수'

    case 'limit_month':
      return '월 사용 횟수'

    case 'limit_year':
      return '연 사용 횟수'

    default:
      return ''
  }
}

export default convertLimitKeyToKR
