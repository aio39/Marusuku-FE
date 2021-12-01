import useColorStore from '@/state/hooks/useColorStore'
import { Flex, FlexProps } from '@chakra-ui/react'

export const Container = (props: FlexProps) => {
  return (
    <Flex
      direction="column"
      // alignItems="center"
      justifyContent="flex-start"
      minH="100vh"
      width="100vw"
      bg={useColorStore('background')}
      color={useColorStore('textHigh')}
      {...props}
    />
  )
}
