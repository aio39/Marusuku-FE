import convertDate from '@/helper/convertDate'
import useColorStore from '@/state/hooks/useColorStore'
import { Review } from '@/types/Review'
import { Box, Text, VStack } from '@chakra-ui/layout'
import { FC } from 'react'
import StarRatingDisplay from '../common/StarRatingDisplay'

type IReview = {
  data: Review
}

type IReviewWrapper = {
  reviews?: Review[]
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

const ReviewWrapper: FC<IReviewWrapper> = ({ reviews }) => {
  if (!reviews) {
    return <Box>no data</Box>
  }

  return (
    <VStack width="100%" alignItems="start" p="8px" backgroundColor={useColorStore('surface')}>
      {reviews.map((data) => (
        <Review data={data} />
      ))}
    </VStack>
  )
}

export default ReviewWrapper
