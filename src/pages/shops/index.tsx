import DefaultLayout from '@/components/common/layouts/DefaultLayout'
import { ShopCard } from '@/components/shop/ShopCard'
import ShopCardMini from '@/components/shop/ShopCardMini'
import { useShops } from '@/state/swr/shops/useShops'
import { NEWS } from '@/types/Shop'
import { Box, Center, Container, Flex, Text, VStack } from '@chakra-ui/layout'
import { Spinner } from '@chakra-ui/spinner'
import { Map } from 'leaflet'
import dynamic from 'next/dynamic'
import React, { useEffect, useState } from 'react'
import Draggable, { DraggableEventHandler } from 'react-draggable'

const MapSearch = React.memo(
  dynamic(() => import('../../components/leaflet/mapSearch'), {
    loading: () => <div>A map is loading</div>,
    ssr: false,
  })
)

const HandleHeight = '30px'
// const MAX_MOVE = 300
const TRIGGER_Y = 30

const Page = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [map, setMap] = useState<Map>()
  const [detailId, setDetailId] = useState<number>()
  const [controlledPosition, setControlledPosition] = useState({ x: 0, y: 0 })
  const [maxMove, setMaxMove] = useState(300)

  const [news, setNews] = useState<NEWS>()
  const { data, error, mutate, isValidating } = useShops({ per_page: 200 }, news)
  const shopsData = data?.data
  const onDrag: DraggableEventHandler = (event, data) => {
    console.log('drag')
    event.preventDefault()
    setControlledPosition((prev) => {
      const nextY = prev.y + -data.deltaY <= -maxMove ? -maxMove : prev.y + -data.deltaY
      return { x: 0, y: nextY }
    })
  }

  const onStop: DraggableEventHandler = (event, data) => {
    console.log('drop!', data)
    event.preventDefault()
    if (data.lastY <= -30) {
      setControlledPosition({ x: 0, y: -maxMove })
    } else {
      setControlledPosition({ x: 0, y: 0 })
    }
  }

  useEffect(() => {
    if (window != undefined) {
      setMaxMove(window.innerHeight * 0.8)
    }
  }, [maxMove])

  return (
    <DefaultLayout FlexProps={{ overflow: 'hidden', height: '100vh' }}>
      <link
        rel="stylesheet"
        href="https://unpkg.com/react-leaflet-markercluster/dist/styles.min.css"
      />
      <Flex minH="90vh" width="100vw">
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

        <Container p="0" sx={{ circle: { backgroundColor: 'red' } }}>
          {typeof window !== 'undefined' && (
            <MapSearch
              setMap={setMap}
              setNews={setNews}
              markerData={shopsData}
              // setIsShowDetail={setIsModalVisible}
              setDetailId={setDetailId}
            />
          )}
        </Container>
      </Flex>
      <ShopCardMini id={detailId} />
      <Box position="relative" w="100vw" h="0">
        <Draggable
          position={controlledPosition}
          onDrag={onDrag}
          onStop={onStop}
          axis="y"
          handle="strong"
        >
          <Box
            position="absolute"
            roundedTop="2xl"
            bg="white"
            w="100vw"
            left="0"
            right="0"
            top={-30}
            minH="90vh"
            // sx={{ transform: `translate3d(0px,-${HandleHeight}, 0px)` }}
          >
            <Center
              height={HandleHeight}
              _before={{
                display: 'block',
                height: '4px',
              }}
            >
              <Text fontSize="xl" as="strong">
                ?????????
              </Text>
            </Center>
            <VStack overflowY="scroll" w="full" maxH={maxMove}>
              {shopsData ? (
                shopsData.map((shop, idx) => <ShopCard shop={shop} key={idx} />)
              ) : (
                <Box>No Data</Box>
              )}
            </VStack>
          </Box>
        </Draggable>
      </Box>
    </DefaultLayout>
  )
}

export default Page
