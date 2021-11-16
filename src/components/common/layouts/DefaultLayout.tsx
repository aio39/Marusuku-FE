import { FlexProps } from '@chakra-ui/layout'
import React, { FC } from 'react'
import { Container } from './Container'
import Navigation from './Navigation'

const DefaultLayout: FC<{ FlexProps?: FlexProps }> = ({ FlexProps, children }) => {
  return (
    <Container {...FlexProps}>
      <Navigation />
      {children}
    </Container>
  )
}

export default DefaultLayout
