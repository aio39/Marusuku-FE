import useColorStore from '@/state/hooks/useColorStore'
import useScrollDown from '@/state/hooks/useScrollDown'
import { Box, HStack } from '@chakra-ui/layout'
import { FC } from 'react'
import BackPageBtn from '../../button/layoutControl/BackPageBtn'

const TopHiddenByScrollNav: FC = ({ children }) => {
  const { isDowning, isUnderThanOffset, isShow } = useScrollDown('width')

  return (
    <Box width="100vw" position="sticky" top="0" h="0" zIndex="10">
      <HStack
        spacing="10px"
        height="60px"
        justifyContent="center"
        bgColor={useColorStore('surface') + (isUnderThanOffset ? (isDowning ? '00' : 'FF') : '00')} //
      >
        <BackPageBtn
          marginRight="auto"
          borderRadius="full"
          bgColor={useColorStore('surface') + (isUnderThanOffset ? '00' : 'FF')}
          opacity={isUnderThanOffset ? (isShow ? '1.0' : '0.0') : '1.0'}
        ></BackPageBtn>
        <Box opacity={isShow ? '1.0' : '0.0'}>{children}</Box>
      </HStack>
    </Box>
  )
}

export default TopHiddenByScrollNav
