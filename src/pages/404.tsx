import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';

export default function NotFound() {
  const router = useRouter();

  return (
    <Flex height="100vh" justifyContent="center" alignItems="center">
      <Flex
        zIndex={2}
        direction="column"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        py={10}
        px={6}
        bg="white"
        w="fit-content"
        h="fit-content"
        maxW="container.sm"
        position="relative"
        rounded="3xl"
        shadow="md"
      >
        <Heading
          display="inline-block"
          as="h2"
          size="2xl"
          bgGradient="linear(to-r, teal.400, teal.600)"
          backgroundClip="text"
        >
          404
        </Heading>
        <Text fontSize="14px" mt={3} mb={0}>
          {router.asPath}
        </Text>
        <Text fontSize="18px" mt={3} mb={2}>
          Page Not Found
        </Text>
        <Text color={'gray.500'} mb={6}>
          The page you're looking for does not seem to exist
        </Text>

        <Button
          colorScheme="teal"
          bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
          color="white"
          variant="solid"
          w={3 / 4}
          onClick={() => {
            router.push('/');
          }}
        >
          Go to Home
        </Button>
      </Flex>
      <Box
        bgGradient="linear(to-r, teal.400, teal.600)"
        opacity={0.7}
        h="64"
        w={3 / 4}
        position="absolute"
        zIndex={1}
        rounded="xl"
        sx={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%) rotate(-6deg) scale(0.8 ,1.4)',
        }}
      ></Box>
      <Box
        bgGradient="linear(to-r, gray.600, gray.400)"
        opacity={0.3}
        h="64"
        w={3 / 4}
        position="absolute"
        zIndex={0}
        rounded="xl"
        sx={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%) rotate(-15deg) scale(0.8 ,1.4)',
        }}
      ></Box>
    </Flex>
  );
}
