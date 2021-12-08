import { Heading } from '@chakra-ui/layout'
import { FC } from 'react'

const H1Text: FC<{ text?: string }> = ({ children }) => {
  return (
    <Heading as="h1" size="xl" py="8px">
      {children}
    </Heading>
  )
}

export default H1Text
