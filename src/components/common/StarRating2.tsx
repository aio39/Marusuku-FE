import { useColorModeValue } from '@chakra-ui/color-mode'
import { StarIcon } from '@chakra-ui/icons'
import { HStack } from '@chakra-ui/layout'
import React, { FC, memo } from 'react'

const StarRating: FC<{ score: number }> = ({ score }) => {
  const totalStar = 5
  const fullFillStar = score
  const emptyStar = totalStar - fullFillStar

  const Star = []

  for (let i = 1; i <= totalStar; i++) {
    i <= fullFillStar
      ? Star.push(<StarIcon color={useColorModeValue('gray.700', 'gray.300')} />)
      : Star.push(<StarIcon color="gray.500" />)
  }

  return (
    <HStack spacing={1} display="flex" alignItems="center" mt={2}>
      {Star}
    </HStack>
  )
}

export default StarRating
