import { Text } from '@chakra-ui/layout';
import QRCode from 'qrcode.react';
import React, { useState } from 'react';
import Clock from 'react-live-clock';
import DefaultLayout from '../../components/common/layouts/DefaultLayout';
import { useUser } from '../../state/swr/useUser';

export default function Home() {
  const { data: userData } = useUser();
  const [key, setKey] = useState('none');

  return (
    <DefaultLayout>
      <QRCode value={key} size={300} />
      <Text as="h2" fontSize="4xl">
        <Clock format="HH:mm:ss" interval={1000} ticking={true} />
      </Text>
      {userData?.email}
    </DefaultLayout>
  );
}
