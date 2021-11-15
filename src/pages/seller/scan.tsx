import DefaultLayout from '@/components/common/layouts/DefaultLayout'
import { useColorModeValue } from '@chakra-ui/color-mode'
import { Box, Center } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import React, { useState } from 'react'
import QrReader from 'react-qr-reader'

const Scan = dynamic(() => import('../../components/shop/Scan'), {
  loading: () => <p>Qr Scanner is Loading</p>,
  ssr: false,
})

const ScanPage = () => {
  return (
    <DefaultLayout>
      <Box
        borderRadius="md"
        shadow="md"
        display="flex"
        alignItems="center"
        flexDirection="column"
        maxW="container.xl"
        w="full"
        p="4"
        bg={useColorModeValue('white', 'gray.800')}
      >
        <h1>aaa</h1>
        <Box
          maxW="60"
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{
            width: '100%',
            section: {
              width: '100%',
            },
          }}
        >
          <Scan />
        </Box>
      </Box>
    </DefaultLayout>
  )
}

export default ScanPage
