import DefaultLayout from '@/components/common/layouts/DefaultLayout'
import Rating from '@/components/common/StarRating'
import MenuList from '@/components/menu/MenuList'
import { useMyShop } from '@/lib/api/shops/ShopAPI'
import useColorStore from '@/state/hooks/useColorStore'
import { useMenus } from '@/state/swr/menus/useMenus'
import { Box, Text, VStack } from '@chakra-ui/layout'
import React from 'react'

export default function Home() {
  const { data: shopData } = useMyShop()
  const { data: menusData } = useMenus(shopData && { filter: [['shop_id', shopData.id]] })
  return (
    <DefaultLayout>
      <Box
        borderRadius="md"
        shadow="md"
        direction="column"
        maxW="container.xl"
        w="full"
        p="4"
        bg={useColorStore('surface')}
      >
        <VStack>
          <Text fontSize="md"> {shopData?.name}</Text>
          <Text fontSize="md"> {shopData?.address}</Text>
          <Text fontSize="md"> {shopData?.address2}</Text>
          <Text fontSize="md"> {shopData?.homepage}</Text>
          <Text fontSize="md"> {shopData?.score_count}</Text>
          <Rating size={48} icon="star" scale={5} fillColor="gold" strokeColor="grey" />
        </VStack>
        {menusData && <MenuList menus={menusData.data} />}
      </Box>
    </DefaultLayout>
  )
}
