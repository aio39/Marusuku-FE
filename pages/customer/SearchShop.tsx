import { Map } from 'leaflet';
import dynamic from 'next/dynamic';
import React, { ReactElement, useState } from 'react';
import DefaultLayout from '../../layouts/DefaultLayout';

const Page = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [map, setMap] = useState<Map>();

  const Map = React.useMemo(
    () =>
      dynamic(() => import('../../components/mapMini'), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );

  console.log(map?.getBounds());

  return (
    <div>
      <Map setMap={setMap} />
    </div>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default Page;
