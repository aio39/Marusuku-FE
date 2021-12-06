import useColorStore from '@/state/hooks/useColorStore'
import useScrollDown from '@/state/hooks/useScrollDown'
import { HStack } from '@chakra-ui/layout'
import { FC } from 'react'

const BottomHiddenByScrollBtn: FC = ({ children }) => {
  const { isShow } = useScrollDown(0)

  return (
    <HStack
      h="4rem"
      bgColor="white"
      position="sticky"
      visibility={isShow ? 'visible' : 'hidden'}
      width="100vw"
      bottom={0}
      // bottom={scrollDown ? '-80px' : '0'}
      borderTop="2px"
      justifyContent="space-around"
      backgroundColor={useColorStore('surface')}
    >
      {children}
    </HStack>
  )
}

export default BottomHiddenByScrollBtn
