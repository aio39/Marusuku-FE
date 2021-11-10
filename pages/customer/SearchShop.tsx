import { Box, Container, Flex, Text } from '@chakra-ui/layout';
import { Map } from 'leaflet';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import DefaultLayout from '../../layouts/DefaultLayout';
import { usePlaces } from '../../state/swr/usePlace';
import { NEWS } from '../../types/Place';

const Page = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [map, setMap] = useState<Map>();
  const [detailId, setDetailId] = useState<number>();

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

  console.log(isModalVisible);
  return (
    <DefaultLayout>
      <Flex height="90vh" width="100vw">
        <Container>
          <Map
            setMap={setMap}
            setNews={setNews}
            markerData={placesData}
            setIsModalVisible={setIsModalVisible}
            setDetailId={setDetailId}
          />
        </Container>
        <Container bg="white" shadow="base">
          {/* {placesData && placesData.map((place) => <div>{place.name}</div>)} */}
          {isModalVisible && (
            <div
              style={{
                position: 'absolute',
                width: '100%',
                height: '100vh',
                zIndex: 100,
                backgroundColor: 'gray',
              }}
            >
              <button onClick={() => setIsModalVisible(false)}>X</button>
              {detailId}
            </div>
          )}
          {placesData ? (
            placesData.map((place) => (
              <Box>
                <Text>{place.desc}</Text>
              </Box>
            ))
          ) : (
            <Box>No Data</Box>
          )}
        </Container>
      </Flex>
    </DefaultLayout>
  );
};

export default Page;
