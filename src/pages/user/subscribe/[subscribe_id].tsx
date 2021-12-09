import MobileDefaultLayout from '@/components/common/layouts/mobileLayout/MobileLayout'
import TopHiddenByScrollBtn from '@/components/common/layouts/mobileLayout/TopHiddenByScrollBtn'
import Rating from '@/components/common/StarRating'
import { axiosI } from '@/state/fetcher'
import useColorStore from '@/state/hooks/useColorStore'
import { useSubscribe } from '@/state/swr/users/useSubscribe'
import { useUseHistories } from '@/state/swr/users/useUseHistories'
import { useUser } from '@/state/swr/useUser'
import { Button } from '@chakra-ui/button'
import { Box, Text } from '@chakra-ui/layout'
import { Textarea } from '@chakra-ui/textarea'
import { useRouter } from 'next/router'
import { useRef } from 'react'

const SubScribeDetail = () => {
  const { data: userData } = useUser()
  const { query } = useRouter()
  const { data: subscribeData } = useSubscribe(
    query?.subscribe_id ? parseInt(query.subscribe_id as string) : undefined
  )

  const { data: useHistoryData } = useUseHistories(
    query?.subscribe_id
      ? { filter: [['subscribe_id', query.subscribe_id as string]], per_page: 50 }
      : undefined
  )

  const handleReview = () => {
    if (subscribeData) {
      axiosI.post('/api/reviews', {
        subscribe_id: subscribeData.id,
        content: 'adf',
        score: ratingRef.current?.value || 5,
      })
    }
  }

  const ratingRef = useRef<HTMLInputElement>()

  console.log(useHistoryData)

  console.log(ratingRef.current?.value)

  return (
    <MobileDefaultLayout>
      <TopHiddenByScrollBtn></TopHiddenByScrollBtn>
      {subscribeData && (
        <Box onClick={() => {}}>
          {subscribeData.menu.name}
          <Text>{subscribeData.shop.name}</Text>
          <Text>{subscribeData.is_continue}</Text>
          <Text>{subscribeData.end_date} 끝나는 날 </Text>
          <Text>{subscribeData.settlement_date} 다음 결제일</Text>
        </Box>
      )}
      {useHistoryData?.data && (
        <Box onClick={() => {}}>
          {useHistoryData.data.map((data) => (
            <Text>{data.id}</Text>
          ))}
        </Box>
      )}
      <Box bgColor={useColorStore('surface')}>
        {useHistoryData?.data.map((data) => (
          <Box key={data.id}>
            <Text>사용날짜: {data.created_at}</Text>
          </Box>
        ))}
      </Box>
      <Rating ref={ratingRef}></Rating>
      <Textarea placeholder="리뷰를 적어주세요" resize="vertical" />
      <Button onClick={handleReview}>작성 완료</Button>
    </MobileDefaultLayout>
  )
}

export default SubScribeDetail
