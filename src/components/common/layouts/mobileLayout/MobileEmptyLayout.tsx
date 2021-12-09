import { Box, BoxProps, FlexProps, VStack } from '@chakra-ui/react'
import React, { FC } from 'react'
import { Container } from '../Container'

const MobileEmptyLayout: FC<{
  flexProps?: FlexProps
  boxProps?: BoxProps
}> = ({ flexProps, boxProps, children }) => {
  return (
    <Container {...flexProps}>
      {/* <TopAbsoluteNav>ffff</TopAbsoluteNav> */}
      <VStack width="full" height="full" minH="100vh" {...boxProps}>
        {children}
      </VStack>
      <Box flexGrow="1"> </Box>
    </Container>
  )
}

export default MobileEmptyLayout
