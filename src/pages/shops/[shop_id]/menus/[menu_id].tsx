import NextImage from '@/components/common/image/NextImage'
import BottomColoredByHeight from '@/components/common/layouts/mobileLayout/BottomColoredByHeight'
import MobileEmptyLayout from '@/components/common/layouts/mobileLayout/MobileEmptyLayout'
import TopHiddenByScrollNav from '@/components/common/layouts/mobileLayout/TopHiddenByScrollNav'
import { LabelTextChild, LabelTextWrapper } from '@/components/common/textView/ LabelText'
import ReviewWrapper from '@/components/menu/Review'
import convertLimitKeyToKR from '@/helper/converLimitKeyToKR'
import { axiosI } from '@/state/fetcher'
import useColorStore from '@/state/hooks/useColorStore'
import { useMenu } from '@/state/swr/menus/useMenus'
import { useUser } from '@/state/swr/useUser'
import { MenuLimit } from '@/types/Menu'
import { Subscribe } from '@/types/Subscribe'
import { Button } from '@chakra-ui/button'
import { Badge, Text, VStack } from '@chakra-ui/layout'
import { useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { MouseEventHandler, useEffect, useState } from 'react'

const Menu = () => {
  const router = useRouter()
  const { shop_id, menu_id } = router.query
  const { data: menu } = useMenu(parseInt(menu_id as string))
  const { data: userData } = useUser()
  const [limitData, setLimitData] = useState<[string, number][]>([])
  console.log(menu)
  const toast = useToast()
  const subscribeHandler: MouseEventHandler<HTMLButtonElement> = async (e) => {
    const { data } = await axiosI.post<Subscribe>(`/api/users/${userData?.id}/subscribes`, {
      menu_id,
    })
    toast({ title: 'success' })
  }

  useEffect(() => {
    if (menu) {
      const limit: [string, number][] = []
      for (const [key, value] of Object.entries(menu)) {
        if (key.startsWith('limit') && value) {
          limit.push([convertLimitKeyToKR(key as keyof MenuLimit), value as number])
        }
      }
      setLimitData(limit)
    }
  }, [menu])

  return (
    <MobileEmptyLayout>
      <TopHiddenByScrollNav offsetY="width">
        <Text>{menu?.name}</Text>
      </TopHiddenByScrollNav>
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
              {menu?.cycle_month}
            </Text>
            <Text fontSize="lg">{menu?.desc}</Text>
            <LabelTextWrapper text="가격">
              <LabelTextChild text={menu.price}>
                <Badge variant="solid" colorScheme="green" display="flex">
                  할인
                </Badge>
              </LabelTextChild>
            </LabelTextWrapper>
            <LabelTextWrapper text="사용 제한">
              {limitData.map(([key, value], idx) => (
                <LabelTextChild text={`${key}: ${value}`}></LabelTextChild>
              ))}
            </LabelTextWrapper>
          </VStack>
          <img src="/img/detail.jpg" width="100%" height="auto" alt="" />
          <ReviewWrapper
            reviews={[
              {
                content: 'fdsfds',
                userName: 'aio',
                score: 4.4,
                createdAt: '2021-12-05T16:45:41.000000Z',
              },
            ]}
          ></ReviewWrapper>
          <Button onClick={subscribeHandler}>구독하기</Button>
          <BottomColoredByHeight>aaaa</BottomColoredByHeight>
        </VStack>
      ) : (
        <div>loading</div>
      )}
    </MobileEmptyLayout>
  )
}

export default Menu
