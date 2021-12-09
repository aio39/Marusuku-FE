import MobileEmptyLayout from '@/components/common/layouts/mobileLayout/MobileEmptyLayout'
import TopHiddenByScrollBtn from '@/components/common/layouts/mobileLayout/TopHiddenByScrollBtn'
import UserInformation from '@/components/user/UserInformation'
import useColorStore from '@/state/hooks/useColorStore'
import { Box, Text, VStack } from '@chakra-ui/react'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { Calendar, Day } from 'react-modern-calendar-datepicker'
import 'react-modern-calendar-datepicker/lib/DatePicker.css'

const preselectedDays = [
  {
    year: 2021,
    month: 11,
    day: 2,
  },
  {
    year: 2021,
    month: 11,
    day: 15,
  },
  {
    year: 2021,
    month: 11,
    day: 30,
  },
]

const SubscribeCalendar = () => {
  const [selectedDay, setSelectedDay] = useState(preselectedDays)
  const [timestamp, setTimestamp] = useState<number>(Date.now()) // NOTE 0~11
  const handleDaySelect = (pre: Day[]) => {
    console.log(pre[pre.length - 1])
  }

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

  console.log('month', dayjs(timestamp).get('M'))
  return (
    <MobileEmptyLayout>
      <TopHiddenByScrollBtn>
        <Text flexGrow="2">QR 코드</Text>
      </TopHiddenByScrollBtn>
      <VStack width="100vw" mt="0" px="8px" bgColor={useColorStore('surface')}>
        <UserInformation />
        <Box>
          <Calendar
            value={selectedDay}
            onChange={handleDaySelect}
            calendarClassName="custom-calendar"
            colorPrimary="#39c5bb"
            shouldHighlightWeekends
          />
        </Box>
      </VStack>
    </MobileEmptyLayout>
  )
}

export default SubscribeCalendar
