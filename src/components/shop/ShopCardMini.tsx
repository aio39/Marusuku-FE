import useColorStore from '@/state/hooks/useColorStore'
import { useShop } from '@/state/swr/shops/useShops'
import { Box, chakra, Container, SkeletonText } from '@chakra-ui/react'
import Link from 'next/link'
import React, { FC } from 'react'
import StarRatingDisplay from '../common/StarRatingDisplay'

const ShopCardMini: FC<{ id?: number }> = ({ id }) => {
  const { data: shop } = useShop(id)
  return (
    <Container
      position="fixed"
      transform="translateX(-50%)"
      left="50%"
      h="28"
      w="95vw"
      p={0}
      bg={useColorStore('surface')}
      bottom="5vh"
      visibility={id ? 'visible' : 'hidden'}
      shadow="xl"
      overflow="hidden"
      rounded="10px"
      display="flex"
      flexDirection="row"
      zIndex="2"
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
              {shop.description}
            </chakra.p>

            <StarRatingDisplay score={shop.score}></StarRatingDisplay>

            <Box mt={3} position="absolute" right="1" bottom="1">
              <Link href={'/shops/' + shop.id}>
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
