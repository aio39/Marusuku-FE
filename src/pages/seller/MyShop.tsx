import React from 'react';
import DefaultLayout from '../../layouts/DefaultLayout';
import { useMyShop } from '../../state/swr/useShops';

export default function Home() {
  const { data } = useMyShop();
  return <DefaultLayout>{data?.name}</DefaultLayout>;
}
