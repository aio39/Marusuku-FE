import { Box } from '@chakra-ui/layout'
import { LatLngBounds, Map } from 'leaflet'
import 'leaflet/dist/leaflet.css'
// import styles from './cluster.css'
import MarkerClusterGroup from './MarkerClusterGroup'
import React, { Dispatch, FC, SetStateAction } from 'react'
import {
  MapConsumer,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  Tooltip,
  useMap,
  useMapEvents,
} from 'react-leaflet'
import { usePosition } from '../../state/hooks/usePosition'
import { NEWS, Shop } from '../../types/Shop'
import { DefaultIcon } from './CommonParts'

type MapP = {
  setMap: Dispatch<SetStateAction<Map | undefined>>
  setNews: Dispatch<SetStateAction<NEWS | undefined>>
  setIsModalVisible: Dispatch<SetStateAction<boolean>>
  setDetailId: Dispatch<SetStateAction<number | undefined>>
  markerData: Shop[] | undefined
}

type MarkersP = Omit<MapP, 'setMap'>

const boundsToNews = (bounds: LatLngBounds): NEWS => {
  return {
    t: bounds.getNorth(),
    b: bounds.getSouth(),
    r: bounds.getEast(),
    l: bounds.getWest(),
  }
}

const ToolTipDiv = () => {
  return <div>aaaa</div>
}

const CenterMarker = () => {
  const map = useMap()
  return (
    <Marker position={map.getCenter()} icon={DefaultIcon}>
      <Popup>현재 지점</Popup>
    </Marker>
  )
}

const Markers = ({ markerData, setNews, setDetailId, setIsModalVisible }: MarkersP) => {
  const map = useMapEvents({
    moveend() {
      const data = boundsToNews(map.getBounds())
      setNews(data)
    },
    click() {
      setDetailId(undefined)
    },
  })

  return markerData ? (
    <React.Fragment>
      {markerData.map((shop) => (
        <Marker
          key={shop.id}
          position={[shop.location.coordinates[1], shop.location.coordinates[0]]}
          icon={DefaultIcon}
        >
          <Tooltip permanent direction="top" offset={[0, 20]} opacity={1} interactive>
            {/* <ToolTipDiv /> */}
            <div
              onClick={() => {
                setIsModalVisible(() => true)
                setDetailId(shop.id)
              }}
            >
              {shop.name}
            </div>
          </Tooltip>
        </Marker>
      ))}
    </React.Fragment>
  ) : null
}

const MapSearch: FC<MapP> = ({
  setMap,
  setNews,
  markerData,
  setDetailId,
  setIsModalVisible: setIsShowDetail,
}) => {
  const { position, error } = usePosition()

  //  TODO 임시 0 0
  return (
    <MapContainer
      className="markercluster-map"
      center={position ? [position.latitude, position.longitude] : [37.5, 126.9]}
      zoom={13}
      scrollWheelZoom={true}
      zoomControl={false}
      style={{ height: '100%', minHeight: 400, width: '100%', zIndex: 0 }}
      whenCreated={(map) => {
        console.info('Map Created')
        const data = boundsToNews(map.getBounds())
        setNews(data) // 현재 0 ,0 안 넣어서 실행 안 되는중임.
        setMap(map)
      }}
      whenReady={() => {
        console.info('Map Ready')
      }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <CenterMarker />
      <MapConsumer>
        {(map) => {
          const { lat, lng } = map.getCenter()
          if (lat == 0 && lng == 0 && position) {
            // 초기화 0.0 상태일때만 갱신
            map.setView([position.latitude, position.longitude], 16)
            const data = boundsToNews(map.getBounds())
            setNews(data)
          }
          return null
        }}
      </MapConsumer>
      <MarkerClusterGroup>
        <Markers
          markerData={markerData}
          setNews={setNews}
          setDetailId={setDetailId}
          setIsModalVisible={setIsShowDetail}
        />
      </MarkerClusterGroup>
    </MapContainer>
  )
}

export default MapSearch
