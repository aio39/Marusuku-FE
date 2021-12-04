import useColorStore from '@/state/hooks/useColorStore'
import { Center } from '@chakra-ui/layout'
import { Spinner } from '@chakra-ui/spinner'
import { FC } from 'react'

const BottomLoading: FC<{ isLoading: boolean }> = ({ isLoading }) => {
  return (
    <Center flexGrow={10} visibility={isLoading ? 'visible' : 'hidden'} my="30px">
      <Spinner
        thickness="6px"
        speed="0.65s"
        emptyColor="gray.200"
        color={useColorStore('primary')}
        size="xl"
      />
    </Center>
  )
}

export default BottomLoading
