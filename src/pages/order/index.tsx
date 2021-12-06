import NextImage from '@/components/common/image/NextImage'
import MobileEmptyLayout from '@/components/common/layouts/mobileLayout/MobileEmptyLayout'
import TopHiddenByScrollBtn from '@/components/common/layouts/mobileLayout/TopHiddenByScrollBtn'
import ModalWrapper from '@/components/common/ModalWrapper'
import { LabelTextChild, LabelTextWrapper } from '@/components/common/textView/ LabelText'
import { axiosI } from '@/state/fetcher'
import useColorStore from '@/state/hooks/useColorStore'
import { useMenu } from '@/state/swr/menus/useMenus'
import { Subscribe } from '@/types/Subscribe'
import { Badge, Box, Text, VStack } from '@chakra-ui/layout'
import { Button, useDisclosure, useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { MouseEventHandler, useState } from 'react'

const OrderIndex = () => {
  const router = useRouter()
  const { shop_id, menu_id } = router.query
  const { data: menu } = useMenu(parseInt(menu_id as string))
  // const { data: userData } = useUser()
  const useDisclosureReturn = useDisclosure()
  const [limitData, setLimitData] = useState<[string, number][]>([])
  const toast = useToast()
  const subscribeHandler: MouseEventHandler<HTMLButtonElement> = async (e) => {
    const { data } = await axiosI.post<Subscribe>(`/api/subscribes`, {
      menu_id,
    })

    if (data) {
      useDisclosureReturn.onOpen()
    }
  }

  return (
    <MobileEmptyLayout>
      <TopHiddenByScrollBtn>
        <Text flexGrow="2">구독 결제</Text>
      </TopHiddenByScrollBtn>
      {menu ? (
        <VStack width="100vw" mt="0">
          <NextImage url={menu.img} height="100vw"></NextImage>
          <VStack
            width="100%"
            alignItems="start"
            p="8px"
            backgroundColor={useColorStore('surface')}
          >
            <Text fontSize="3xl" fontWeight="600">
              {menu.name}
            </Text>
            <Text fontSize="lg">{menu?.desc}</Text>
            <LabelTextWrapper text="가격">
              <LabelTextChild text={menu.price}>
                <Badge variant="solid" colorScheme="green" display="flex">
                  할인
                </Badge>
              </LabelTextChild>
            </LabelTextWrapper>
            <LabelTextWrapper text="결제 주기">
              <LabelTextChild text={menu.cycle_month + '개월 마다'} />
            </LabelTextWrapper>
            <LabelTextWrapper text="사용 제한">
              {limitData.map(([key, value], idx) => (
                <LabelTextChild text={`${key}: ${value}`}></LabelTextChild>
              ))}
            </LabelTextWrapper>
          </VStack>
          <Button onClick={subscribeHandler} width="100%" bgColor={useColorStore('primary')}>
            구독
          </Button>
        </VStack>
      ) : (
        <div>loading</div>
      )}
      <ModalWrapper
        viewBtn={false}
        useDisclosureReturn={useDisclosureReturn}
        text={{ title: '구독 신청 성공', confirm: '홈으로 가기' }}
        href="/home"
      >
        <Box></Box>
      </ModalWrapper>
    </MobileEmptyLayout>
  )
}

export default OrderIndex
