import { Button as ChakraButton, ButtonProps } from '@chakra-ui/button'
import { FC } from 'react'
import WithNextLink from '../hoc/WithNextLink'

const WIDTH = {
  full: '100%',
  medium: '20rem',
  small: '10rem',
}

interface IButton {
  text: string
  url?: string
  width?: keyof typeof WIDTH
  buttonProps?: ButtonProps
  onClick?: () => void
}

const Button: FC<IButton> = ({ text, onClick, url, buttonProps, width = 'full' }) => {
  return (
    <WithNextLink href={url}>
      <ChakraButton onClick={onClick} width={WIDTH[width]} {...buttonProps}>
        {text}
      </ChakraButton>
    </WithNextLink>
  )
}

export default Button
