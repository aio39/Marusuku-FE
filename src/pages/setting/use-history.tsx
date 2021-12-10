import MobileEmptyLayout from '@/components/common/layouts/mobileLayout/MobileEmptyLayout'
import TopHiddenByScrollBtn from '@/components/common/layouts/mobileLayout/TopHiddenByScrollBtn'
import { UseHistoryCardWrapper } from '@/components/useHistory/UseHistoryCard'
import useColorStore from '@/state/hooks/useColorStore'
import { useUseHistories } from '@/state/swr/users/useUseHistories'
import { useUser } from '@/state/swr/useUser'
import { Text, VStack } from '@chakra-ui/layout'
import React from 'react'

export default function QRCodeClient() {
  const { data: userData } = useUser()
  const { data: subscribeData } = useUseHistories(
    userData ? { filter: [['user_id', userData.id]] } : undefined
  )

  return (
    <MobileEmptyLayout>
      <TopHiddenByScrollBtn>
        <Text flexGrow="2">사용 이력</Text>
      </TopHiddenByScrollBtn>
      <VStack
        width="100vw"
        height="full"
        flexGrow="1"
        mt="0"
        px="8px"
        bgColor={useColorStore('surface')}
      >
        <UseHistoryCardWrapper data={subscribeData?.data} />
      </VStack>
    </MobileEmptyLayout>
  )
}
