import useScrollPercentAtoB from '@/state/hooks/useScrollPercentAtoB'
import { HStack } from '@chakra-ui/layout'
import { FC } from 'react'

const BottomColoredByHeight: FC<{ a?: number; b?: number }> = ({ children, a = 0, b = 0 }) => {
  const percent = useScrollPercentAtoB(a, b)
  return (
    <HStack
      h="4rem"
      bgColor="white"
      position="sticky"
      width="100vw"
      bottom={0}
      // bottom={scrollDown ? '-80px' : '0'}
      borderTop="2px"
      justifyContent="space-around"
      backgroundColor={`rgba(255,255,255,${percent})`}
      backdropFilter="blur(20px)"
    >
      {children}
    </HStack>
  )
}

export default BottomColoredByHeight
