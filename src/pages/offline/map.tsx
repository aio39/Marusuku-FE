import BackPageBtn from '@/components/common/button/layoutControl/BackPageBtn'
import OpenDrawerBtn from '@/components/common/button/OpenDrawerBtn'
import FixedFlexContainer from '@/components/common/layouts/FixedFlexContainer'
import MobileDefaultLayout from '@/components/common/layouts/mobileLayout/MobileLayout'
import ShopCard from '@/components/shop/ShopCard'
import ShopCardMini from '@/components/shop/ShopCardMini'
import { useShops } from '@/state/swr/shops/useShops'
import { NEWS } from '@/types/Shop'
import { Box, Container, Flex, VStack } from '@chakra-ui/layout'
import { DrawerBody, DrawerCloseButton, DrawerHeader } from '@chakra-ui/react'
import { Spinner } from '@chakra-ui/spinner'
import { Map } from 'leaflet'
import dynamic from 'next/dynamic'
import React, { useEffect, useState } from 'react'

const MapSearch = React.memo(
  dynamic(() => import('../../components/leaflet/mapSearch'), {
    loading: () => <div>A map is loading</div>,
    ssr: false,
  })
)

const Page = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [map, setMap] = useState<Map>()
  const [detailId, setDetailId] = useState<number>()
  const [maxMove, setMaxMove] = useState(300)

  const [news, setNews] = useState<NEWS>()
  const {
    data,
    error,
    mutate,
    isValidating: shopsDataIsValidating,
  } = useShops({ per_page: 200 }, news)
  const shopsData = data?.data

  useEffect(() => {
    if (window != undefined) {
      setMaxMove(window.innerHeight * 0.8)
    }
  }, [maxMove])

  return (
    <MobileDefaultLayout FlexProps={{ overflow: 'hidden', height: '100vh' }}>
      <FixedFlexContainer>
        <BackPageBtn marginRight="auto"></BackPageBtn>
        <OpenDrawerBtn text="목록" buttonProps={{ justifySelf: 'end', marginLeft: 'auto' }}>
          <DrawerCloseButton />
          <DrawerHeader>Create your account</DrawerHeader>

          <DrawerBody>
            <VStack overflowY="scroll" w="full" maxH={maxMove}>
              {shopsData ? (
                shopsData.map((shop, idx) => <ShopCard shop={shop} key={idx} />)
              ) : (
                <Box>No Data</Box>
              )}
            </VStack>
          </DrawerBody>
        </OpenDrawerBtn>
      </FixedFlexContainer>
      <link
        rel="stylesheet"
        href="https://unpkg.com/react-leaflet-markercluster/dist/styles.min.css"
      />
      <Flex minH="90vh" width="100vw">
        {shopsDataIsValidating && (
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

        <Container p="0" sx={{ circle: { backgroundColor: 'red' } }}>
          {typeof window !== 'undefined' && (
            <MapSearch
              setMap={setMap}
              setNews={setNews}
              markerData={shopsData}
              setIsShowDetail={setIsModalVisible}
              setDetailId={setDetailId}
            />
          )}
        </Container>
      </Flex>
      <ShopCardMini id={detailId} />
    </MobileDefaultLayout>
  )
}

export default Page
