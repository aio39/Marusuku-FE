import useColorStore from '@/state/hooks/useColorStore'
import { Shop } from '@/types/Shop'
import { StarIcon } from '@chakra-ui/icons'
import { Box, chakra, Flex, HStack } from '@chakra-ui/react'
import Link from 'next/link'
import React, { FC } from 'react'

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
        bgSize="cover"
        style={{
          backgroundImage: "url('https://source.unsplash.com/random/400x500')",
        }}
      ></Box>

      <Box w={2 / 3} p={{ base: 4, md: 4 }}>
        <chakra.h1 fontSize="2xl" fontWeight="bold" color={useColorStore('textHigh')}>
          {shop.name}
        </chakra.h1>

        <chakra.p mt={2} fontSize="sm" color={useColorStore('textMedium')}>
          {shop.desc}
        </chakra.p>

        <HStack spacing={1} display="flex" alignItems="center" mt={2}>
          <StarIcon color={useColorStore('yellow')} />
          <StarIcon color={useColorStore('yellow')} />
          <StarIcon color={useColorStore('yellow')} />
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
    </Flex>
  )
}

export default ShopCard
