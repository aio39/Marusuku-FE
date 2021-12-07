import DefaultLayout from '@/components/common/layouts/DefaultLayout'
import { useSubscribes } from '@/state/swr/users/useSubscribe'
import { useUser } from '@/state/swr/useUser'
import { Button } from '@chakra-ui/button'
import { Box, Text, VStack } from '@chakra-ui/layout'
import Link from 'next/link'
import React from 'react'

export default function Test() {
  const { data: userData } = useUser()
  const { data: subscribeData } = useSubscribes(
    userData ? { filter: [['user_id', userData.id]] } : undefined
  )

  return (
    <DefaultLayout>
      <Box flexDirection="column">
        {subscribeData &&
          subscribeData.data.map((subscribe) => {
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
