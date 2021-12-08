import convertDate from '@/helper/convertDate'
import useColorStore from '@/state/hooks/useColorStore'
import { Text, VStack } from '@chakra-ui/layout'
import { FC } from 'react'
import StarRating from '../common/StarRating2'

type ReviewData = {
  userName: string
  score: number
  content: string
  createdAt: string
}

type IReview = {
  data: ReviewData
}

type IReviewWrapper = {
  reviews: ReviewData[]
}
const Review: FC<IReview> = ({ data }) => {
  const { content, createdAt, score, userName } = data
  return (
    <VStack width="100%" alignItems="start">
      <StarRating score={score} />
      <Text>{content}</Text>

      <Text>{userName}</Text>
      <Text>{convertDate(createdAt)}</Text>
    </VStack>
  )
}

const ReviewWrapper: FC<IReviewWrapper> = ({ reviews }) => {
  return (
    <VStack width="100%" alignItems="start" p="8px" backgroundColor={useColorStore('surface')}>
      {reviews.map((data) => (
        <Review data={data} />
      ))}
    </VStack>
  )
}

export default ReviewWrapper
