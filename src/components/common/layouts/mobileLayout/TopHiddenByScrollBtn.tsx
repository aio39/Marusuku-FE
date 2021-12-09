import useColorStore from '@/state/hooks/useColorStore'
import useScrollDown from '@/state/hooks/useScrollDown'
import { Box, HStack } from '@chakra-ui/layout'
import { FC } from 'react'
import BackPageBtn from '../../button/layoutControl/BackPageBtn'

const TopHiddenByScrollBtn: FC = ({ children }) => {
  const { isShow } = useScrollDown(0, true)

  return (
    <HStack
      h="4rem"
      bgColor="white"
      position="sticky"
      visibility={isShow ? 'visible' : 'hidden'}
      width="100vw"
      zIndex={100}
      top={0}
      justifyContent="space-around"
      backgroundColor={useColorStore('surface')}
    >
      <BackPageBtn marginRight="auto" borderRadius="full"></BackPageBtn>
      <Box>{children}</Box>
    </HStack>
  )
}

export default TopHiddenByScrollBtn
