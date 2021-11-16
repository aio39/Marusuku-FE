import { useShop } from '@/state/swr/shops/useShops'
import { StarIcon } from '@chakra-ui/icons'
import {
  Box,
  chakra,
  Container,
  Flex,
  HStack,
  SkeletonText,
  useColorModeValue,
} from '@chakra-ui/react'
import Link from 'next/link'
import React, { FC } from 'react'
import { Shop } from '../../types/Shop'
import StarRating from '../common/StarRating2'

const ShopCardMini: FC<{ id?: number }> = ({ id }) => {
  const { data: shop } = useShop(id)
  return (
    <Container
      position="fixed"
      h="28"
      w={3 / 4}
      p={0}
      bg={useColorModeValue('white', 'gray.800')}
      bottom="20"
      visibility={id ? 'visible' : 'hidden'}
      shadow="2xl"
      overflow="hidden"
      rounded="2xl"
      display="flex"
      flexDirection="row"
    >
      {shop ? (
        <>
          <Box
            w={1 / 3}
            h="full"
            bgSize="cover"
            style={{
              backgroundImage: "url('https://source.unsplash.com/random/400x500')",
            }}
          ></Box>

          <Box w={2 / 3} p={{ base: 4, md: 4 }}>
            <chakra.h1
              fontSize="lg"
              fontWeight="bold"
              textOverflow="ellipsis"
              overflow="hidden"
              whiteSpace="nowrap"
              color={useColorModeValue('gray.800', 'white')}
            >
              {shop.name}
            </chakra.h1>

            <chakra.p mt={2} fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>
              {shop.desc}
            </chakra.p>

            <StarRating score={2}></StarRating>

            <Box mt={3} position="absolute" right="1" bottom="1">
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
            </Box>
          </Box>
        </>
      ) : (
        <SkeletonText />
      )}
    </Container>
  )
}

export default ShopCardMini
