import StarRating from '@/components/common/StarRating2'
import useColorStore from '@/state/hooks/useColorStore'
import { Menu } from '@/types/Menu'
import { Box, Flex, Link, VStack } from '@chakra-ui/layout'
import { chakra } from '@chakra-ui/system'
import { useRouter } from 'next/router'
import React, { FC } from 'react'

const MenuCard: FC<{ menu: Menu }> = ({ menu }) => {
  const router = useRouter()

  return (
    <Flex
      maxW="md"
      w="full"
      mx="auto"
      bg={useColorStore('surface')}
      shadow="lg"
      rounded="lg"
      overflow="hidden"
    >
      <Box w={2 / 3} p={{ base: 4, md: 4 }}>
        <chakra.h1 fontSize="2xl" fontWeight="bold" color={useColorStore('textHigh')}>
          {menu.name}
        </chakra.h1>
        <chakra.p mt={2} minH="4" fontSize="sm" color={useColorStore('textMedium')}>
          {menu.desc}
        </chakra.p>
        <StarRating score={menu.score ?? 1} />
        <Flex mt={3} alignItems="center" justifyContent="space-between">
          <chakra.h1 color={useColorStore('textHigh')} fontWeight="bold" fontSize="lg">
            {menu.price}원
          </chakra.h1>
          <Link href={`/shops/${router.query.shop_id}/menus/${menu.id}`}>
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
          </Link>
        </Flex>
      </Box>
      {menu.img && (
        <Box
          w={1 / 3}
          bgSize="cover"
          style={{
            backgroundImage: `url('${process.env.AWS_S3}${menu.img}')`,
            //   "url('https://images.unsplash.com/photo-1494726161322-5360d4d0eeae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80')",
          }}
        ></Box>
      )}
    </Flex>
  )
}

const MenuList: FC<{ menus: Menu[] }> = ({ menus }) => {
  return (
    <VStack p={50} w="full" alignItems="center" justifyContent="center" spacing="4">
      {menus &&
        menus.map((menu) => {
          return <MenuCard menu={menu} />
        })}
    </VStack>
  )
}

export default MenuList
