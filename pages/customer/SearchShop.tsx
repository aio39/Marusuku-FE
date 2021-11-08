import { Card, Col, List, Row } from 'antd';
import { Map } from 'leaflet';
import dynamic from 'next/dynamic';
import React, { ReactElement, useState } from 'react';
import DefaultLayout from '../../layouts/DefaultLayout';
import { usePlaces } from '../../state/swr/usePlace';
import { NEWS } from '../../types/Place';

const Page = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [map, setMap] = useState<Map>();

  const Map = React.useMemo(
    () =>
      dynamic(() => import('../../components/leaflet/mapSearch'), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );
  const [news, setNews] = useState<NEWS>();
  const { data: placesData, error, mutate } = usePlaces(news);

  return (
    <Row wrap style={{ height: '90vh' }}>
      <Col span={24} md={16}>
        <Map setMap={setMap} setNews={setNews} markerData={placesData} />
      </Col>
      <Col span={24} md={8}>
        {/* {placesData && placesData.map((place) => <div>{place.name}</div>)} */}
        <List
          style={{ maxHeight: '100vh', overflow: 'scroll' }}
          grid={{ gutter: 16, column: 1 }}
          dataSource={placesData}
          renderItem={(place) => (
            <List.Item>
              <Card title={place.name}>{place.desc}</Card>
            </List.Item>
          )}
        />
      </Col>
    </Row>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default Page;
