import useColorStore from '@/state/hooks/useColorStore'
import { Button, ButtonProps } from '@chakra-ui/button'
import { FC } from 'react'

interface IFixedBtn {
  text: string
  onClickHandler: () => void
  buttonProps?: ButtonProps
}

const FixedBtn: FC<IFixedBtn> = ({ text, onClickHandler, buttonProps }) => {
  return (
    <Button
      {...buttonProps}
      size="md"
      onClick={onClickHandler}
      backgroundColor={useColorStore('surface')}
      color={useColorStore('textHigh')}
      position="fixed"
      transform="translateX(-50%)"
      bottom="5vh"
      left="50%"
      px="4"
      py="2px"
      zIndex="1"
      fontSize="lg"
    >
      {text}
    </Button>
  )
}

export default FixedBtn
