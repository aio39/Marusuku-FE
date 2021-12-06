import useColorStore from '@/state/hooks/useColorStore'
import { StarIcon } from '@chakra-ui/icons'
import { HStack } from '@chakra-ui/layout'
import React, { FC } from 'react'

const StarRating: FC<{ score: number }> = ({ score = 0 }) => {
  const totalStar = 5
  const fullFillStar = Math.round(score)
  const emptyStar = totalStar - fullFillStar

  const Star = []

  for (let i = 1; i <= totalStar; i++) {
    i <= fullFillStar
      ? Star.push(<StarIcon key={i} color={useColorStore('yellow')} />)
      : Star.push(<StarIcon key={i} color="gray.500" />)
  }

  return (
    <HStack spacing={1} display="flex" alignItems="center" mt={2}>
      {Star}
    </HStack>
  )
}

export default StarRating
