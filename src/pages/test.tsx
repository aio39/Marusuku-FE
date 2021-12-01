import DefaultLayout from '@/components/common/layouts/DefaultLayout'
import MobileNavigation from '@/components/common/layouts/mobileLayout/MobileLayout'
import useColorStore from '@/state/hooks/useColorStore'
import { Button } from '@chakra-ui/button'
import { DarkMode, useColorMode } from '@chakra-ui/color-mode'
import { Box, Text } from '@chakra-ui/layout'
import { useMediaQuery } from '@chakra-ui/media-query'
import React from 'react'

export default function Test() {
  const { colorMode, toggleColorMode } = useColorMode()
  const [isLargerThan1280] = useMediaQuery('(min-width: 30rem)')
  return (
    <DefaultLayout>
      <Box flexDirection="column">
        <Button>aaa</Button>
        <Button onClick={toggleColorMode} color={useColorStore('surface')}>
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
      <MobileNavigation />
    </DefaultLayout>
  )
}
