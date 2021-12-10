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
import { Calendar, Day } from 'react-modern-calendar-datepicker'
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
  const { data: subscribeData } = useSubscribes(
    userData ? { filter: [['user_id', userData.id]] } : undefined
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
    const subs: Subscribe[] = []
    const now = dayjs(timestamp)
    subscribeData?.data.forEach((data) => {
      const subDay = dayjs(data.end_date)
      if (now.get('M') === subDay.get('M') && now.get('year') === subDay.get('year')) {
        subs.push(data)
      }
      setViewSubscribeData(subs)
    })
  }, [subscribeData, timestamp])

  useEffect(() => {
    const NextMonthBtn = document.getElementsByClassName(
      'Calendar__monthArrowWrapper -left'
    )[0] as HTMLButtonElement
    const BeforeMonthBtn = document.getElementsByClassName(
      'Calendar__monthArrowWrapper -right'
    )[0] as HTMLButtonElement

    NextMonthBtn.addEventListener('click', () => {
      setTimestamp((pre) => dayjs(pre).add(1, 'month').valueOf())
    })
    BeforeMonthBtn.addEventListener('click', () => {
      setTimestamp((pre) => dayjs(pre).subtract(1, 'month').valueOf())
    })
  }, [setTimestamp])

  const selectedDays = useMemo(() => {
    const days: (Day & { id: number })[] = []
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
            onChange={handleDaySelect}
            calendarClassName="custom-calendar"
            colorPrimary="#39c5bb"
            shouldHighlightWeekends
          />
        </Box>

        <SubscribeCardWrapper
          data={
            viewSubscribeData &&
            viewSubscribeData.map((data) =>
              objectPick(data, 'id', 'menu', 'shop', 'settlement_date', 'is_continue')
            )
          }
        />
      </VStack>
    </MobileEmptyLayout>
  )
}

export default SubscribeCalendar
