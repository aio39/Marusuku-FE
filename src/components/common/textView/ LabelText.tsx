import { Box, Flex, Text, TextProps } from '@chakra-ui/layout'
import React, { FC } from 'react'

const LabelTextChild: FC<{ text: string | number; textProps?: TextProps }> = ({
  text,
  textProps,
  children,
}) => {
  return (
    <Flex alignItems="center" textAlign="center">
      <Text as="span" {...textProps}>
        {text}
      </Text>
      <Box as="span" ml="8px">
        {children}
      </Box>
    </Flex>
  )
}

const LabelTextWrapper: FC<{ text: string }> = ({ text, children }) => {
  return (
    <Flex width="100%">
      <Box w="80px" textAlign="left">
        <Text>{text}</Text>
      </Box>
      <Box flex="1">{children}</Box>
    </Flex>
  )
}

export { LabelTextWrapper, LabelTextChild }
