import { useShop } from '@/state/swr/shops/useShops'
import { StarIcon } from '@chakra-ui/icons'
import { Box, chakra, Container, Flex, HStack, useColorModeValue } from '@chakra-ui/react'
import Link from 'next/link'
import React, { FC } from 'react'
import { Shop } from '../../types/Shop'

const ShopCardMini: FC<{ id?: number }> = ({ id }) => {
  const { data: shop } = useShop(id)
  return (
    <Container
      position="fixed"
      h="auto"
      w={3 / 4}
      bg={useColorModeValue('white', 'gray.800')}
      bottom="20"
      visibility={id ? 'visible' : 'hidden'}
      shadow="lg"
      rounded="lg"
    >
      {shop ? (
        <>
          <Box
            w={1 / 3}
            bgSize="cover"
            style={{
              backgroundImage: "url('https://source.unsplash.com/random/400x500')",
            }}
          ></Box>

          <Box w={2 / 3} p={{ base: 4, md: 4 }}>
            <chakra.h1
              fontSize="2xl"
              fontWeight="bold"
              color={useColorModeValue('gray.800', 'white')}
            >
              {shop.name}
            </chakra.h1>

            <chakra.p mt={2} fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>
              {shop.desc}
            </chakra.p>

            <HStack spacing={1} display="flex" alignItems="center" mt={2}>
              <StarIcon color={useColorModeValue('gray.700', 'gray.300')} />
              <StarIcon color={useColorModeValue('gray.700', 'gray.300')} />
              <StarIcon color={useColorModeValue('gray.700', 'gray.300')} />
              <StarIcon color="gray.500" />
              <StarIcon color="gray.500" />
            </HStack>

            <Flex mt={3} alignItems="center" justifyContent="space-between">
              <chakra.h1 color="white" fontWeight="bold" fontSize="lg">
                $220
              </chakra.h1>
              <Link href={'shops/' + shop.id}>
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
                  상세보기
                </chakra.button>
              </Link>
            </Flex>
          </Box>
        </>
      ) : (
        'loading'
      )}
    </Container>
  )
}

export default ShopCardMini
