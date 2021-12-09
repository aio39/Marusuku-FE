import MobileEmptyLayout from '@/components/common/layouts/mobileLayout/MobileEmptyLayout'
import TopHiddenByScrollBtn from '@/components/common/layouts/mobileLayout/TopHiddenByScrollBtn'
import ReviewWrapper from '@/components/menu/Review'
import useColorStore from '@/state/hooks/useColorStore'
import { useReviews } from '@/state/swr/reviews/useReviews'
import { useUser } from '@/state/swr/useUser'
import { Text, VStack } from '@chakra-ui/react'
import { FC } from 'react'

const MyReviews: FC = () => {
  const { data: userData } = useUser()
  const { data: reviewsData, isValidating } = useReviews(
    userData ? { filter: [['user_id', userData.id]], with: ['user', 'menu', 'shop'] } : undefined
  )

  return (
    <MobileEmptyLayout>
      <TopHiddenByScrollBtn>
        <Text flexGrow="2">나의 리뷰</Text>
      </TopHiddenByScrollBtn>
      <VStack
        width="100vw"
        height="full"
        flexGrow="1"
        mt="0"
        px="8px"
        bgColor={useColorStore('surface')}
      >
        <ReviewWrapper reviews={reviewsData?.data} isValidating={isValidating} type="edit" />
      </VStack>
    </MobileEmptyLayout>
  )
}

export default MyReviews
