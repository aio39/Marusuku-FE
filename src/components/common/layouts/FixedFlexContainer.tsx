import { Box, HStack } from '@chakra-ui/layout'
import { FC } from 'react'

const FixedFlexContainer: FC = ({ children }) => {
  return (
    <Box position="fixed" width="100%" zIndex="1" px="10px" py="10px">
      <HStack spacing="10px" justifyContent="center">
        {children}
      </HStack>
    </Box>
  )
}

export default FixedFlexContainer
