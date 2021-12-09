import NextImage from '@/components/common/image/NextImage'
import useColorStore from '@/state/hooks/useColorStore'
import { Menu } from '@/types/Menu'
import { Box, Flex, Heading, SimpleGrid, VStack } from '@chakra-ui/layout'
import { chakra } from '@chakra-ui/system'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import React, { FC } from 'react'
import StarRatingDisplay from '../common/StarRatingDisplay'

const MenuCardLandscape: FC<{ menu: Menu }> = ({ menu }) => {
  const router = useRouter()
  return (
    <VStack bg={useColorStore('surface')} shadow="lg" rounded="lg" overflow="hidden">
      <NextImage url={menu.img} height="40vw" />
      <Box height="150px" width="full" px="2" textAlign="start">
        <chakra.h1 fontSize="2xl" fontWeight="bold" color={useColorStore('textHigh')}>
          {menu.name}
        </chakra.h1>
        <chakra.p mt={2} minH="4" fontSize="sm" color={useColorStore('textMedium')}>
          {menu.description}
        </chakra.p>
        <StarRatingDisplay score={menu.score ?? 1} />
        <Flex mt={3} justifyContent="space-between">
          <chakra.h1 color={useColorStore('textHigh')} fontWeight="bold" fontSize="lg">
            {menu.price}원
          </chakra.h1>
          <NextLink href={`/shops/${router.query.shop_id}/menus/${menu.id}`}>
            <chakra.button
              px={2}
              py={1}
              bg="white"
              fontSize="xs"
              color="gray.900"
              fontWeight="bold"
              rounded="lg"
              textTransform="uppercase"
              _hover={{
                bg: 'gray.200',
              }}
              _focus={{
                bg: 'gray.400',
              }}
            >
              상세 보기
            </chakra.button>
          </NextLink>
        </Flex>
      </Box>
    </VStack>
  )
}

const MenuCard: FC<{ menu: Menu }> = ({ menu }) => {
  const router = useRouter()
  return (
    <VStack bg={useColorStore('surface')} shadow="lg" rounded="lg" overflow="hidden">
      <NextImage url={menu.img} height="40vw" />
      <Box height="150px" width="full" px="2" textAlign="start">
        <Heading
          width="full"
          fontSize="md"
          fontWeight="bold"
          isTruncated
          color={useColorStore('textHigh')}
        >
          {menu.name}
        </Heading>
        <chakra.p
          mt={2}
          minH="40px"
          maxH="40px"
          overflow="hidden"
          fontSize="sm"
          textOverflow="ellipsis"
          sx={{ WebkitLineClamp: 3 }}
          color={useColorStore('textMedium')}
        >
          {menu.description}
        </chakra.p>
        <StarRatingDisplay score={menu.score ?? 3} />
        <Flex mt={3} justifyContent="space-between">
          <chakra.h1 color={useColorStore('textHigh')} fontWeight="bold" fontSize="lg">
            {menu.price}원
          </chakra.h1>
          <NextLink href={`/shops/${router.query.shop_id}/menus/${menu.id}`}>
            <chakra.button
              px={2}
              py={1}
              bg="white"
              fontSize="xs"
              color="gray.900"
              fontWeight="bold"
              rounded="lg"
              textTransform="uppercase"
              _hover={{
                bg: 'gray.200',
              }}
              _focus={{
                bg: 'gray.400',
              }}
            >
              상세 보기
            </chakra.button>
          </NextLink>
        </Flex>
      </Box>
    </VStack>
  )
}

const MenuList: FC<{ menus: Menu[]; type?: 'landscape' | 'default' }> = ({
  menus,
  type = 'default',
}) => {
  return (
    <SimpleGrid columns={2} spacing={4} justifyContent="center">
      {menus &&
        menus.map((menu) => {
          return type == 'landscape' ? <MenuCardLandscape menu={menu} /> : <MenuCard menu={menu} />
        })}
    </SimpleGrid>
  )
}

export default MenuList
export { MenuCardLandscape, MenuCard }
