import convertDate from '@/helper/convertDate'
import useColorStore from '@/state/hooks/useColorStore'
import { Review } from '@/types/Review'
import { Center, Text, VStack } from '@chakra-ui/layout'
import { Skeleton } from '@chakra-ui/react'
import { FC } from 'react'
import StarRatingDisplay from '../common/StarRatingDisplay'

type IReview = {
  data: Review
}

type IReviewWrapper = {
  reviews?: Review[]
  isValidating: boolean
}
const Review: FC<IReview> = ({ data }) => {
  const { content, created_at, score, user } = data
  return (
    <VStack width="100%" alignItems="start">
      <StarRatingDisplay score={score} />
      <Text>{content}</Text>

      <Text> - {user.name}</Text>
      <Text>{convertDate(created_at)}</Text>
    </VStack>
  )
}

const ReviewWrapper: FC<IReviewWrapper> = ({ reviews, isValidating }) => {
  if ((!reviews && !isValidating) || reviews?.length == 0)
    return (
      <Center height="100px" fontSize="xl">
        작성한 리뷰가 없습니다.
      </Center>
    )

  if (!reviews) return <Skeleton width="full" height="50vh"></Skeleton>

  return (
    <VStack width="100%" alignItems="start" p="8px" backgroundColor={useColorStore('surface')}>
      {reviews.map((data) => (
        <Review data={data} />
      ))}
    </VStack>
  )
}

export default ReviewWrapper
