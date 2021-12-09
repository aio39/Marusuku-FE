import { Box, BoxProps } from '@chakra-ui/layout'
import Image from 'next/image'
import { FC, useState } from 'react'

interface INextImage {
  url?: string
  width?: string
  boxProps?: BoxProps
  height: string
}

const NextImage: FC<INextImage> = ({ url, width = '100%', height, boxProps }) => {
  const [imgSrc, setImgSrc] = useState(url)
  const fallback = '/img/fallback.png'
  return (
    <Box position="relative" width={width} height={height} {...boxProps}>
      <Image
        objectFit="cover"
        layout="fill"
        src={imgSrc ? `${process.env.AWS_S3}${imgSrc}` : fallback}
        onError={(e) => {
          console.log(e)
          setImgSrc(undefined)
        }}
      />
    </Box>
  )
}

export default NextImage
