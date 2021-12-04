import DefaultLayout from '@/components/common/layouts/DefaultLayout'
import MobileDefaultLayout from '@/components/common/layouts/mobileLayout/MobileLayout'
import MenuList from '@/components/shop/menu/MenuList'
import { useMenus } from '@/state/swr/menus/useMenus'
import { useShop } from '@/state/swr/shops/useShops'
import { Image } from '@chakra-ui/image'
import { AspectRatio, Center, Text, VStack } from '@chakra-ui/layout'
import { Tab, TabList, TabPanel, TabPanels, Tabs, UseTabsProps } from '@chakra-ui/tabs'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useSwipeable } from 'react-swipeable'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { shop_id } = context.query
  // console.log(context.query)
  // const url = 'https://localhost:3939' + '/api/shops/' + shop_id

  // const data = await axiosI.get(url)
  // console.log(data)
  // // const data = await res.json()

  return {
    props: {},
  }
}

const ShopDetailPage = ({}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter()
  const [tabIndex, setTabIndex] = useState(0)
  const { data: shopData } = useShop(parseInt(router.query.shop_id as string))
  const { data: menuData } = useMenus({ filter: [['shop_id', router.query.shop_id as string]] })
  const menusData = menuData?.data
  const MAX_INDEX = 2
  const handlers = useSwipeable({
    onSwipedLeft: (eventData) => {
      setTabIndex((prev) => (prev == 0 ? 0 : prev - 1))
    },
    onSwipedRight: (eventData) => {
      setTabIndex((prev) => (prev == MAX_INDEX ? MAX_INDEX : prev + 1))
    },
  })

  const handleTabsChange: UseTabsProps['onChange'] = (index) => {
    setTabIndex(index)
  }

  if (!router.isReady || !shopData) {
    return <DefaultLayout>'loading'</DefaultLayout>
  }

  const MB = shopData.img ? '30px' : '30px'

  return (
    <MobileDefaultLayout>
      <AspectRatio width="full" ratio={1} maxW="container.sm" position="relative">
        <>
          <Image
            src={shopData.img}
            alt="가게 대표 이미지"
            objectFit="cover"
            fallbackSrc="/img/fallback.png"
          />
        </>
      </AspectRatio>
      <Center position="relative" width="100%" mb={MB} h="150px">
        <VStack
          position="absolute"
          top={'-' + MB}
          bg="white"
          w="300px"
          h="full"
          borderRadius="2xl"
          shadow="md"
        >
          <Text fontSize="lg">{shopData.name}</Text>
        </VStack>
      </Center>
      <Tabs
        index={tabIndex}
        onChange={handleTabsChange}
        variant="enclosed-colored"
        size="lg"
        align="center"
        isFitted
        width="full"
        {...handlers}
      >
        <TabList>
          <Tab>구독 메뉴</Tab>
          <Tab>정보</Tab>
          <Tab>리뷰</Tab>
        </TabList>

        <TabPanels p="0">
          <TabPanel p="4">
            {menusData ? <MenuList menus={menusData}></MenuList> : <div>'loading</div>}
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
          <TabPanel>
            <p>three!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </MobileDefaultLayout>
  )
}

export default ShopDetailPage
