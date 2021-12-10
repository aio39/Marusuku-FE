import MobileEmptyLayout from '@/components/common/layouts/mobileLayout/MobileEmptyLayout'
import TopHiddenByScrollBtn from '@/components/common/layouts/mobileLayout/TopHiddenByScrollBtn'
import { SubscribeCardWrapper } from '@/components/subscribe/SubscribeCard'
import UserInformation from '@/components/user/UserInformation'
import objectPick from '@/helper/objectPick'
import useColorStore from '@/state/hooks/useColorStore'
import { qrcodeSelectedIdState } from '@/state/recoil/tempAtoms'
import { useSubscribes } from '@/state/swr/users/useSubscribe'
import { useUser } from '@/state/swr/useUser'
import { Subscribe } from '@/types/Subscribe'
import { Box, Text, VStack } from '@chakra-ui/react'
import dayjs from 'dayjs'
import { useEffect, useMemo, useState } from 'react'
import { Calendar, Day, utils } from 'react-modern-calendar-datepicker'
import 'react-modern-calendar-datepicker/lib/DatePicker.css'
import { useRecoilState } from 'recoil'

// const preselectedDays = [
//   {
//     year: 2021,
//     month: 11,
//     day: 2,
//   },
//   {
//     year: 2021,
//     month: 11,
//     day: 15,
//   },
//   {
//     year: 2021,
//     month: 11,
//     day: 30,
//   },
// ]

const SubscribeCalendar = () => {
  const { data: userData } = useUser()
  const [selectedId, setSelectedId] = useRecoilState(qrcodeSelectedIdState)
  // NOTE 캘린더에 옳바르게 표기하기 위해 정렬 필수임. 첫번째에 맞춰서 나오기 때문.
  const { data: subscribeData } = useSubscribes(
    userData ? { filter: [['user_id', userData.id]], sort: ['end_date'] } : undefined
  )
  const [timestamp, setTimestamp] = useState<number>(Date.now()) // NOTE 0~11
  const [viewSubscribeData, setViewSubscribeData] = useState<Subscribe[]>()
  const handleDaySelect = (pre: (Day & { id?: number })[]) => {
    const sel = pre[pre.length - 1]
    console.log(sel.id)
    if (sel && sel.id) {
      setSelectedId(sel.id)
    } else {
      setSelectedId(undefined)
    }
  }

  useEffect(() => {
    setSelectedId(undefined)
    return () => {
      setSelectedId(undefined)
    }
  }, [])

  useEffect(() => {
    const subscribeInMonth: Subscribe[] = []
    const now = dayjs(timestamp)
    subscribeData?.data.forEach((data) => {
      const subDay = dayjs(data.end_date)
      if (now.get('month') === subDay.get('month') && now.get('year') === subDay.get('year')) {
        subscribeInMonth.push(data)
      }
      setViewSubscribeData(subscribeInMonth)
    })
  }, [subscribeData, timestamp])

  useEffect(() => {
    const NextMonthBtn = document.getElementsByClassName(
      'Calendar__monthArrowWrapper -left'
    )[0] as HTMLButtonElement
    const BeforeMonthBtn = document.getElementsByClassName(
      'Calendar__monthArrowWrapper -right'
    )[0] as HTMLButtonElement

    const nextHandler = () => {
      setTimestamp((pre) => dayjs(pre).add(1, 'month').valueOf())
    }

    const beforeHandler = () => {
      setTimestamp((pre) => dayjs(pre).subtract(1, 'month').valueOf())
    }

    NextMonthBtn.addEventListener('click', nextHandler)
    BeforeMonthBtn.addEventListener('click', beforeHandler)

    //  NOTE! 언제나 이벤트 제거에 신경쓰자
    return () => {
      NextMonthBtn.removeEventListener('click', nextHandler)
      BeforeMonthBtn.removeEventListener('click', beforeHandler)
    }
  }, [setTimestamp])

  console.log('timestamp', dayjs(timestamp).toISOString())

  const selectedDays = useMemo(() => {
    const days: (Day & { id?: number })[] = []

    const today = utils('en').getToday()
    Object.assign(today, { className: 'today' })
    days.push(today)
    console.log(today)

    subscribeData?.data.forEach((data) => {
      if (data.is_continue) {
        const day = dayjs(data.end_date)
        days.push({
          day: day.get('date'),
          month: day.get('month') + 1,
          year: day.get('year'),
          id: data.id,
        })
      }
    })
    return days
  }, [subscribeData])

  // console.log('month', dayjs(timestamp).get('M'))
  return (
    <MobileEmptyLayout>
      <TopHiddenByScrollBtn>
        <Text flexGrow="2">구독 달력</Text>
      </TopHiddenByScrollBtn>
      <VStack width="100vw" mt="0" px="8px" bgColor={useColorStore('surface')}>
        <UserInformation />
        <Box>
          <Calendar
            value={selectedDays}
            // value={[]}
            onChange={handleDaySelect}
            // calendarClassName="custom-calendar"
            locale={myCustomLocale}
            colorPrimary="#39c5bb"
            shouldHighlightWeekends
          />
        </Box>

        <SubscribeCardWrapper
          data={
            viewSubscribeData &&
            viewSubscribeData.map((data) =>
              objectPick(data, 'id', 'menu', 'shop', 'settlement_date', 'is_continue', 'end_date')
            )
          }
        />
      </VStack>
    </MobileEmptyLayout>
  )
}

export default SubscribeCalendar

const myCustomLocale = {
  // months list by order
  months: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],

  // week days by order
  weekDays: [
    {
      name: 'Sunday', // used for accessibility
      short: 'S', // displayed at the top of days' rows
      isWeekend: true, // is it a formal weekend or not?
    },
    {
      name: 'Monday',
      short: 'M',
    },
    {
      name: 'Tuesday',
      short: 'T',
    },
    {
      name: 'Wednesday',
      short: 'W',
    },
    {
      name: 'Thursday',
      short: 'T',
    },
    {
      name: 'Friday',
      short: 'F',
    },
    {
      name: 'Saturday',
      short: 'S',
      isWeekend: true,
    },
  ],

  // just play around with this number between 0 and 6
  weekStartingIndex: 0,

  // return a { year: number, month: number, day: number } object
  getToday(gregorainTodayObject) {
    return gregorainTodayObject
  },

  // return a native JavaScript date here
  toNativeDate(date) {
    return new Date(date.year, date.month - 1, date.day)
  },

  // return a number for date's month length
  getMonthLength(date) {
    return new Date(date.year, date.month, 0).getDate()
  },

  // return a transformed digit to your locale
  transformDigit(digit) {
    return digit
  },

  // texts in the date picker
  nextMonth: '다음 달',
  previousMonth: '전 달',
  openMonthSelector: '월 선택',
  openYearSelector: '연도 선택',
  closeMonthSelector: '월 선택 닫기',
  closeYearSelector: '연도 선택 닫기',
  defaultPlaceholder: '선택...',

  // for input range value
  from: 'from',
  to: 'to',

  // used for input value when multi dates are selected
  digitSeparator: ',',

  // if your provide -2 for example, year will be 2 digited
  yearLetterSkip: 0,

  // is your language rtl or ltr?
  isRtl: false,
}
