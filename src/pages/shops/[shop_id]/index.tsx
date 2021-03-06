import NextImage from '@/components/common/image/NextImage'
import DefaultLayout from '@/components/common/layouts/DefaultLayout'
import MobileDefaultLayout from '@/components/common/layouts/mobileLayout/MobileLayout'
import TopHiddenByScrollBtn from '@/components/common/layouts/mobileLayout/TopHiddenByScrollBtn'
import MenuList from '@/components/menu/MenuList'
import { useMenus } from '@/state/swr/menus/useMenus'
import { useShop } from '@/state/swr/shops/useShops'
import { AspectRatio, Center, Heading, Text, VStack } from '@chakra-ui/layout'
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
  const { data: menuData, isValidating: menuIsValidating } = useMenus({
    filter: [['shop_id', router.query.shop_id as string]],
  })
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
      <TopHiddenByScrollBtn>
        <Heading> {shopData.name} </Heading>
      </TopHiddenByScrollBtn>
      <AspectRatio width="full" ratio={1} maxW="container.sm" position="relative">
        <>
          {/* <Image
            src={shopData.img}
            alt="?????? ?????? ?????????"
            objectFit="cover"
            fallbackSrc="/img/fallback.png"
          /> */}
          <NextImage height="100vw" url={shopData.img}></NextImage>
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
          <Text fontSize="lg">{shopData.score}</Text>
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
          <Tab>?????? ??????</Tab>
          <Tab>??????</Tab>
          <Tab>??????</Tab>
        </TabList>

        <TabPanels p="0">
          <TabPanel p="4">
            <MenuList menus={menusData} isValidating={menuIsValidating}></MenuList>
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
