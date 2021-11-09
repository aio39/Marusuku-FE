import { Flex } from '@chakra-ui/layout';
import React, { FC } from 'react';
import { Container } from './Container';
import Navigation from './Navigation';

const DefaultLayout: FC = ({ children }) => {
  return (
    <Container>
      <Navigation />
      <Flex>{children}</Flex>
    </Container>
  );
};

export default DefaultLayout;
