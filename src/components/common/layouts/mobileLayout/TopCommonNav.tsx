import useColorStore from '@/state/hooks/useColorStore'
import { Box, HStack } from '@chakra-ui/layout'
import { FC } from 'react'
import BackPageBtn from '../../button/layoutControl/BackPageBtn'

const TopCommonNav: FC = ({ children }) => {
  return (
    <Box width="100vw" position="sticky" ml="-8px" zIndex="1" bgColor={useColorStore('surface')}>
      <HStack spacing="10px" height="60px" justifyContent="center">
        <BackPageBtn marginRight="auto"></BackPageBtn>
        {children}
      </HStack>
    </Box>
  )
}

export default TopCommonNav
