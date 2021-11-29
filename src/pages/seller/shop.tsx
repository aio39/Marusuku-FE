import Rating from '@/components/common/StarRating'
import MenuList from '@/components/shop/menu/MenuList'
import MenuCard from '@/components/shop/menu/MenuList'
import { useMenus } from '@/state/swr/menus/useMenus'
import { useColorModeValue } from '@chakra-ui/color-mode'
import { Box, Text, VStack } from '@chakra-ui/layout'
import React from 'react'
import DefaultLayout from '../../components/common/layouts/DefaultLayout'
import { useMyShop } from '../../state/swr/shops/useShops'

export default function Home() {
  const { data: shopData } = useMyShop()
  const { data: menusData } = useMenus({ shop_id: shopData?.id })
  console.log(menusData)
  return (
    <DefaultLayout>
      <Box
        borderRadius="md"
        shadow="md"
        direction="column"
        maxW="container.xl"
        w="full"
        p="4"
        bg={useColorModeValue('white', 'gray.800')}
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
