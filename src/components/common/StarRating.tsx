// https://codesandbox.io/s/y8zfo?file=/src/index.js
import { StarIcon } from '@chakra-ui/icons'
import { Box, Stack, Text } from '@chakra-ui/layout'
import React, { FC, useState } from 'react'

type P = {
  size: number
  icon: string
  scale: number
  fillColor: string
  strokeColor: string
}

const Rating = React.forwardRef(({ size, icon, scale, fillColor, strokeColor }: P, ref: any) => {
  const [rating, setRating] = useState(0)
  const buttons = []

  const onClick = (idx: any) => {
    if (!isNaN(idx)) {
      // allow user to click first icon and set rating to zero if rating is already 1
      if (rating === 1 && idx === 1) {
        setRating(0)
      } else {
        setRating(idx)
      }
    }
  }

  const RatingIcon: FC<{ fill: boolean }> = ({ fill }) => {
    return (
      <StarIcon
        name={icon}
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
        height={`${size}px`}
        width={`${size}px`}
        mx={1}
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
    <Stack isInline mt={8} justify="center">
      <input name="rating" type="hidden" value={rating} ref={ref} />
      {buttons}
      <Box width={`${size * 1.5}px`} textAlign="center">
        <Text fontSize="sm" textTransform="uppercase">
          Rating
        </Text>
        <Text fontSize="2xl" fontWeight="semibold" lineHeight="1.2em">
          {rating}
        </Text>
      </Box>
    </Stack>
  )
})

Rating.displayName = 'Rating'

export default Rating
