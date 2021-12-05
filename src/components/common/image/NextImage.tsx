import { Box, BoxProps } from '@chakra-ui/layout'
import Image from 'next/image'
import { FC } from 'react'
import fallback from '../../../../public/img/fallback.png'

interface INextImage {
  url?: string
  width?: string
  boxProps?: BoxProps
  height: string
}

const NextImage: FC<INextImage> = ({ url, width = '100%', height, boxProps }) => {
  return (
    <Box position="relative" width={width} height={height} {...boxProps}>
      <Image objectFit="cover" layout="fill" src={url ? `${process.env.AWS_S3}${url}` : fallback} />
    </Box>
  )
}

export default NextImage
