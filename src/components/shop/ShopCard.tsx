import { StarIcon } from '@chakra-ui/icons';
import { Box, chakra, Flex, HStack, useColorModeValue } from '@chakra-ui/react';
import React, { FC } from 'react';
import { Shop } from '../../types/Shop';

const ShopCard: FC<{ shop: Shop }> = ({ shop }) => {
  return (
    <Flex
      maxW="md"
      w="full"
      bg={useColorModeValue('white', 'gray.800')}
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      mb="4"
    >
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

        <chakra.p
          mt={2}
          fontSize="sm"
          color={useColorModeValue('gray.600', 'gray.400')}
        >
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
        </Flex>
      </Box>
    </Flex>
  );
};

export default ShopCard;
