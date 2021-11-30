import StarRating from '@/components/common/StarRating2'
import useColorStore from '@/state/hooks/useColorStore'
import { useShop } from '@/state/swr/shops/useShops'
import { Box, chakra, Container, SkeletonText } from '@chakra-ui/react'
import Link from 'next/link'
import React, { FC } from 'react'

const ShopCardMini: FC<{ id?: number }> = ({ id }) => {
  const { data: shop } = useShop(id)
  return (
    <Container
      position="fixed"
      h="28"
      w={3 / 4}
      p={0}
      bg={useColorStore('surface')}
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
              color={useColorStore('surface')}
            >
              {shop.name}
            </chakra.h1>

            <chakra.p mt={2} fontSize="sm" color={useColorStore('textMedium')}>
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
