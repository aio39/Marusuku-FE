import useColorStore from '@/state/hooks/useColorStore'
import { Shop } from '@/types/Shop'
import { Box, chakra, Flex, Heading, Skeleton, Text, VStack } from '@chakra-ui/react'
import Link from 'next/link'
import React, { FC } from 'react'
import NextImage from '../common/image/NextImage'
import StarRatingDisplay from '../common/StarRatingDisplay'

const ShopCard: FC<{ shop: Shop }> = ({ shop }) => {
  return (
    <Flex
      maxW="md"
      w="full"
      bg={useColorStore('surface')}
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      mb="4"
      minH="40"
    >
      <Box
        w={1 / 3}
        // bgSize="cover"
        // style={{
        //   backgroundImage: shop.img || "url('https://source.unsplash.com/random/400x500')",
        // }}
      >
        <NextImage height="40" url={shop.img}></NextImage>
      </Box>

      <VStack alignItems="start" w={2 / 3} p={{ base: 4, md: 4 }}>
        <Heading
          width="full"
          fontSize="lg"
          isTruncated
          fontWeight="bold"
          color={useColorStore('textHigh')}
        >
          {shop.name}
        </Heading>

        <chakra.p mt={2} fontSize="sm" color={useColorStore('textMedium')}>
          {shop.description}
        </chakra.p>

        <StarRatingDisplay score={shop.score} />
        <Box flexGrow="1"></Box>
        <Flex mt={3} alignItems="center" justifyContent="space-between">
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
        </Flex>
      </VStack>
    </Flex>
  )
}

const ShopCardWrapper: FC<{ shops?: Shop[]; isValidating: boolean }> = ({
  shops,
  isValidating,
}) => {
  if ((!shops && !isValidating) || shops?.length == 0) {
    return (
      <Text fontSize="200px" fontWeight="600">
        텅
      </Text>
    )
  }

  if (!shops) {
    return (
      <VStack width="full">
        <Skeleton width="full" maxH="md" height="40" />
        <Skeleton width="full" maxH="md" height="40" />
        <Skeleton width="full" maxH="md" height="40" />
        <Skeleton width="full" maxH="md" height="40" />
        <Skeleton width="full" maxH="md" height="40" />
        <Skeleton width="full" maxH="md" height="40" />
      </VStack>
    )
  }

  return (
    <VStack width="full">
      {shops.map((shop, idx) => (
        <ShopCard shop={shop} key={idx} />
      ))}
    </VStack>
  )
}

export { ShopCard, ShopCardWrapper }
