// https://codesandbox.io/s/y8zfo?file=/src/index.js
import useColorStore from '@/state/hooks/useColorStore'
import { StarIcon } from '@chakra-ui/icons'
import { Box, HStack, Text } from '@chakra-ui/layout'
import React, { FC, useState } from 'react'

type P = {
  size?: number
  scale?: number
}

const Rating = React.forwardRef(({ size = 40, scale = 5 }: P, ref: any) => {
  const [rating, setRating] = useState(5)
  const buttons = []

  const onClick = (idx: any) => {
    if (!isNaN(idx)) {
      // 1인 상태에서 한번더 누르면 0 으로
      rating === 1 && idx === 1 ? setRating(0) : setRating(idx)
    }
  }

  const fillColor = useColorStore('yellow')
  const strokeColor = useColorStore('weekGray')

  const RatingIcon: FC<{ fill: boolean }> = ({ fill }) => {
    return (
      <StarIcon
        size={`${size}px`}
        color={fillColor}
        stroke={strokeColor}
        onClick={onClick}
        fillOpacity={fill ? '100%' : '0'}
      />
    )
  }

  const RatingButton: FC<{ idx: number; fill: boolean }> = ({ idx, fill }) => {
    return (
      <Box
        as="button"
        aria-label={`Rate ${idx}`}
        // height={`${size}px`}
        // width={`${size}px`}
        // mx={1}
        onClick={() => onClick(idx)}
        _focus={{ outline: 0 }}
      >
        <RatingIcon fill={fill} />
      </Box>
    )
  }

  for (let i = 1; i <= scale; i++) {
    buttons.push(<RatingButton key={i} idx={i} fill={i <= rating} />)
  }

  return (
    <HStack width="full" isInline mt={8} justify="start" alignItems="center">
      <input name="rating" type="hidden" value={rating} ref={ref} />
      {buttons}
      <Box width="full">
        <Text fontSize="2xl" lineHeight="1em">
          {rating}
        </Text>
      </Box>
    </HStack>
  )
})

export default Rating
