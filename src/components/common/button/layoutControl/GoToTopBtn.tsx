import useColorStore from '@/state/hooks/useColorStore'
import useScrollDown from '@/state/hooks/useScrollDown'
import { Center } from '@chakra-ui/react'
import { FC } from 'react'
import { GoArrowUp } from 'react-icons/go'

const GoToTopBtn: FC = () => {
  const { isUnderThanOffset } = useScrollDown('height')

  const handler = () => {
    window.scrollTo(0, 0)
  }

  return (
    <Center
      width="40px"
      height="40px"
      borderRadius="full"
      bgColor={useColorStore('primary')}
      color={useColorStore('surface')}
      visibility={isUnderThanOffset ? 'visible' : 'hidden'}
      onClick={handler}
      position="fixed"
      right="3rem"
      bottom="6rem"
      zIndex="10"
      fontSize="2xl"
      opacity="0.8"
      cursor="pointer"
    >
      <GoArrowUp />
    </Center>
  )
}

export default GoToTopBtn
