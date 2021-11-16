import DefaultLayout from '@/components/common/layouts/DefaultLayout'
import { Button } from '@chakra-ui/button'
import { DarkMode, useColorMode, useColorModeValue } from '@chakra-ui/color-mode'
import { Box, Text } from '@chakra-ui/layout'
import { useMediaQuery } from '@chakra-ui/media-query'
import dynamic from 'next/dynamic'
import React from 'react'

export default function Test() {
  const { colorMode, toggleColorMode } = useColorMode()
  const color = useColorModeValue('red.500', 'blue.200')
  const [isLargerThan1280] = useMediaQuery('(min-width: 30rem)')
  return (
    <DefaultLayout>
      <Box flexDirection="column">
        <Button>aaa</Button>
        <Button onClick={toggleColorMode} color={color}>
          Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
        </Button>
        <DarkMode>
          <Box colorScheme="blue"> Always Color </Box>
        </DarkMode>
        <Box bg="red.200" w={[300, 400, 500, null, 700, 800]}>
          This is a box {isLargerThan1280 ? 'yes' : 'no'}
          <Text fontSize={{ base: '24px', md: '40px', lg: '56px' }}>This is responsive text</Text>
        </Box>
        <Box width={[1, 1 / 2, 1 / 4]} bg="blue" h="3.5" />
      </Box>
    </DefaultLayout>
  )
}
