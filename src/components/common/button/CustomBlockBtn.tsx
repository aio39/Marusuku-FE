import useColorStore from '@/state/hooks/useColorStore'
import { Box, Grid, GridItem, GridItemProps, Text } from '@chakra-ui/layout'
import Link from 'next/link'
import React, { FC } from 'react'

interface ICustomBlockBtn {
  url: string
  rowSize: number
  colSize: number
  title?: string
  subTitle?: string
  subTitle2?: string
  gridItemProps?: GridItemProps
}

const BLOCK_HEIGHT = 40

const CustomBlockBtn: FC<ICustomBlockBtn> = ({
  url,
  rowSize,
  colSize,
  title,
  subTitle,
  subTitle2,
  gridItemProps,
  children,
}) => {
  return (
    <Link href={url}>
      <GridItem
        rowSpan={rowSize}
        colSpan={colSize}
        height={BLOCK_HEIGHT * rowSize + 'px'}
        bg={useColorStore('surface')}
        shadow="sm"
        borderRadius="8"
        padding="8px"
        // width="100%"
        backgroundRepeat="no-repeat"
        {...gridItemProps}
      >
        {title && (
          <Text fontSize="xl" fontWeight="600" color={useColorStore('textHigh')}>
            {title}
            <Box as="span" ml="1" color={useColorStore('textDisabled')}>
              &gt;
            </Box>
          </Text>
        )}
        {subTitle && (
          <Text fontSize="sm" fontWeight="600" my="2">
            {subTitle}
          </Text>
        )}
        {subTitle2 && (
          <Text fontSize="sm" fontWeight="400" my="2">
            {subTitle2}
          </Text>
        )}
        {children}
      </GridItem>
    </Link>
  )
}

const CustomBlockBtnWrapper: FC = ({ children }) => {
  return (
    <Grid
      width="full"
      p="8px"
      templateRows="repeat(1, 1fr)"
      templateColumns="repeat(2, 1fr)"
      gap={4}
    >
      {children}
    </Grid>
  )
}

export { CustomBlockBtn, CustomBlockBtnWrapper }
