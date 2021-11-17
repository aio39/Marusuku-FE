import DefaultLayout from '@/components/common/layouts/DefaultLayout'
import { useColorMode, useColorModeValue } from '@chakra-ui/color-mode'
import { Box } from '@chakra-ui/layout'
import { useMediaQuery } from '@chakra-ui/media-query'
import React from 'react'

export default function Test() {
  const { colorMode, toggleColorMode } = useColorMode()
  const color = useColorModeValue('red.500', 'blue.200')
  const [isLargerThan1280] = useMediaQuery('(min-width: 30rem)')
  return (
    <DefaultLayout>
      <Box flexDirection="column"></Box>
    </DefaultLayout>
  )
}
