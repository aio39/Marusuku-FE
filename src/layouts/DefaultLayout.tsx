import React, { FC } from 'react';
import { Container } from './Container';
import Navigation from './Navigation';

const DefaultLayout: FC = ({ children }) => {
  return (
    <Container>
      <Navigation />
      {children}
    </Container>
  );
};

export default DefaultLayout;
