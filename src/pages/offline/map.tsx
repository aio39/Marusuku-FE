import FixedBtn from '@/components/common/button/FixedBtn'
import BackPageBtn from '@/components/common/button/layoutControl/BackPageBtn'
import OpenDrawerBtn from '@/components/common/button/OpenDrawerBtn'
import { Container } from '@/components/common/layouts/Container'
import FixedFlexContainer from '@/components/common/layouts/FixedFlexContainer'
import ShopCard from '@/components/shop/ShopCard'
import ShopCardMini from '@/components/shop/ShopCardMini'
import { convertBoundsToNEWS } from '@/helper/converBoundsToNEWS'
import { useShops } from '@/state/swr/shops/useShops'
import { CommonFSW } from '@/types/common'
import { NEWS } from '@/types/Shop'
import { Box, VStack } from '@chakra-ui/layout'
import { DrawerBody, DrawerCloseButton, DrawerHeader } from '@chakra-ui/react'
import { Spinner } from '@chakra-ui/spinner'
import { Map } from 'leaflet'
import dynamic from 'next/dynamic'
import React, { useState } from 'react'

const MapSearch = React.memo(
  dynamic(() => import('../../components/leaflet/mapSearch'), {
    loading: () => <div>A map is loading</div>,
    ssr: false,
  })
)

const Page = () => {
  const [map, setMap] = useState<Map>()
  const [detailId, setDetailId] = useState<number>()
  const [shopQuery, setShopQuery] = useState<CommonFSW>({ per_page: 200 })
  const [news, setNews] = useState<NEWS>()
  const { data, error, mutate, isValidating: shopsDataIsValidating } = useShops(shopQuery, news)
  const shopsData = data?.data

  return (
    <Container>
      <FixedFlexContainer>
        <BackPageBtn marginRight="auto"></BackPageBtn>
        <OpenDrawerBtn text="목록" buttonProps={{ justifySelf: 'end', marginLeft: 'auto' }}>
          <DrawerCloseButton />
          <DrawerHeader>Create your account</DrawerHeader>

          <DrawerBody>
            <VStack overflowY="scroll" w="full" maxH="90vh">
              {shopsData ? (
                shopsData.map((shop, idx) => <ShopCard shop={shop} key={idx} />)
              ) : (
                <Box>No Data</Box>
              )}
            </VStack>
          </DrawerBody>
        </OpenDrawerBtn>
      </FixedFlexContainer>

      {shopsDataIsValidating && (
        <Spinner
          position="fixed"
          zIndex="popover"
          thickness="6px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
          sx={{
            top: '50%',
            left: '45%',
          }}
        />
      )}
      <Box sx={{ circle: { backgroundColor: 'red' } }}>
        {typeof window !== 'undefined' && (
          <MapSearch
            setMap={setMap}
            setNews={setNews}
            markerData={shopsData}
            setDetailId={setDetailId}
          />
        )}
      </Box>

      <ShopCardMini id={detailId} />
      <FixedBtn
        text={'여기서 찾기'}
        onClickHandler={() => {
          if (map) {
            setNews(convertBoundsToNEWS(map.getBounds()))
          }
        }}
      />
    </Container>
  )
}

export default Page
