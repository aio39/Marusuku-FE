import { useColorModeValue } from '@chakra-ui/color-mode'
import { Box, Container, Flex } from '@chakra-ui/layout'
import { Spinner } from '@chakra-ui/spinner'
import { Map } from 'leaflet'
import dynamic from 'next/dynamic'
import React, { useState } from 'react'
import DefaultLayout from '../../components/common/layouts/DefaultLayout'
import ShopCard from '../../components/shop/ShopCard'
import { useShops } from '../../state/swr/shops/useShops'
import { NEWS } from '../../types/Shop'

const Page = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [map, setMap] = useState<Map>()
  const [detailId, setDetailId] = useState<number>()

  const Map = React.useMemo(
    () =>
      dynamic(() => import('../../components/leaflet/mapSearch'), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  )
  const [news, setNews] = useState<NEWS>()
  const { data: shopsData, error, mutate, isValidating } = useShops(news)

  console.log(isModalVisible)
  return (
    <DefaultLayout>
      <Flex height="90vh" width="100vw">
        {isValidating && (
          <Spinner
            position="absolute"
            zIndex="popover"
            thickness="6px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
            sx={{
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        )}

        <Container>
          <Map
            setMap={setMap}
            setNews={setNews}
            markerData={shopsData}
            setIsModalVisible={setIsModalVisible}
            setDetailId={setDetailId}
          />
        </Container>
        <Flex
          bg={useColorModeValue('#F9FAFB', 'gray.600')}
          p={4}
          w="full"
          h="max"
          direction="column"
          alignItems="center"
          justifyContent="center"
          overflow="scroll"
        >
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

          {shopsData ? shopsData.map((shop) => <ShopCard shop={shop} />) : <Box>No Data</Box>}
        </Flex>
      </Flex>
    </DefaultLayout>
  )
}

export default Page
