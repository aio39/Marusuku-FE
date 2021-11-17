import DefaultLayout from '@/components/common/layouts/DefaultLayout'
import { useSubscribe } from '@/state/swr/users/useSubscribe'
import { useUser } from '@/state/swr/useUser'
import { Button } from '@chakra-ui/button'
import { useColorMode, useColorModeValue } from '@chakra-ui/color-mode'
import { Box, Text, VStack } from '@chakra-ui/layout'
import { useMediaQuery } from '@chakra-ui/media-query'
import Link from 'next/link'
import React from 'react'

export default function Test() {
  const { colorMode, toggleColorMode } = useColorMode()
  const color = useColorModeValue('red.500', 'blue.200')
  const [isLargerThan1280] = useMediaQuery('(min-width: 30rem)')
  const { data: userData } = useUser()
  const { data: subscribeData } = useSubscribe(userData?.id)

  return (
    <DefaultLayout>
      <Box flexDirection="column">
        {subscribeData &&
          subscribeData.map((subscribe) => {
            const { menu, shop } = subscribe
            return (
              <VStack bg="white" mb="2">
                <Link href={`/user/qrcode?subscribe_id=${subscribe.id}`}>
                  <Button>상세</Button>
                </Link>
                <Text>{subscribe.id}</Text>
                <Text>{menu.name}</Text>
                <Text>{subscribe.settlement_date}</Text>
                <Text>{subscribe.end_date}</Text>
              </VStack>
            )
          })}
      </Box>
    </DefaultLayout>
  )
}
