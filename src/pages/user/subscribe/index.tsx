import MobileDefaultLayout from '@/components/common/layouts/mobileLayout/MobileLayout'
import TopHiddenByScrollBtn from '@/components/common/layouts/mobileLayout/TopHiddenByScrollBtn'
import { useSubscribes } from '@/state/swr/users/useSubscribe'
import { useUser } from '@/state/swr/useUser'
import { Box, Text } from '@chakra-ui/layout'
import NextLink from 'next/link'

const SubScribeIndex = () => {
  const { data: userData } = useUser()
  const { data: subscribeData } = useSubscribes(
    userData ? { filter: [['user_id', userData.id]] } : undefined
  )

  return (
    <MobileDefaultLayout>
      <TopHiddenByScrollBtn></TopHiddenByScrollBtn>
      {subscribeData?.data.map((data) => (
        <NextLink href={`subscribe/${data.id}`}>
          <Box key={data.id} onClick={() => {}}>
            {data.menu.name}
            <Text>{data.shop.name}</Text>
            <Text>{data.is_continue}</Text>
            <Text>{data.end_date} 끝나는 날 </Text>
            <Text>{data.settlement_date} 다음 결제일</Text>
          </Box>
        </NextLink>
      ))}
    </MobileDefaultLayout>
  )
}

export default SubScribeIndex
