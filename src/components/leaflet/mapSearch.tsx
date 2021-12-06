// import { DefaultIcon } from './CommonParts'
import { DefaultIcon } from '@/components/leaflet/CommonParts'
// import styles from './cluster.css'
import MarkerClusterGroup from '@/components/leaflet/MarkerClusterGroup'
import DefaultTileLayer from '@/components/leaflet/parts/DefaultTileLayer'
import { convertBoundsToNEWS } from '@/helper/converBoundsToNEWS'
import { usePosition } from '@/state/hooks/usePosition'
import { NEWS, Shop } from '@/types/Shop'
import L, { Map } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import React, { Dispatch, FC, SetStateAction } from 'react'
import { renderToString } from 'react-dom/server'
import {
  MapConsumer,
  MapContainer,
  Marker,
  Popup,
  Tooltip,
  useMap,
  useMapEvents,
} from 'react-leaflet'

type MapP = {
  setMap: Dispatch<SetStateAction<Map | undefined>>
  setNews: Dispatch<SetStateAction<NEWS | undefined>>
  setDetailId: Dispatch<SetStateAction<number | undefined>>
  // setIsShowDetail: React.Dispatch<React.SetStateAction<boolean>>
  markerData: Shop[] | undefined
}

type MarkersP = Omit<MapP, 'setMap'>

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

const Markers = ({ markerData, setNews, setDetailId }: MarkersP) => {
  const map = useMapEvents({
    // moveend() {
    //   const data = convertBoundsToNEWS(map.getBounds())
    //   setNews(data)
    // },
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
          options={shop}
        >
          <Tooltip permanent direction="top" offset={[0, 20]} opacity={1} interactive>
            {/* <ToolTipDiv /> */}
            <div
              onClick={() => {
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

const PopoverList = (shops: Shop[]) => {
  return (
    <div className="popover-list">
      {shops.map((shop) => {
        return <span data-id={shop.id}>{shop.name}</span>
      })}
    </div>
  )
}

const MapSearch: FC<MapP> = ({ setMap, setNews, markerData, setDetailId }) => {
  const { position, error } = usePosition()

  //  TODO 임시 0 0
  return (
    <MapContainer
      className="markercluster-map"
      center={position ? [position.latitude, position.longitude] : [0, 0]}
      zoom={13}
      scrollWheelZoom={true}
      zoomControl={false}
      style={{ minHeight: '100vh', minWidth: '100vw', zIndex: 0 }}
      whenCreated={(map) => {
        console.info('Map Created')
        const data = convertBoundsToNEWS(map.getBounds())
        setNews(data) // 현재 0 ,0 안 넣어서 실행 안 되는중임.
        setMap(map)
      }}
      whenReady={() => {
        console.info('Map Ready')
      }}
    >
      <DefaultTileLayer />
      <CenterMarker />
      <MapConsumer>
        {(map) => {
          const { lat, lng } = map.getCenter()
          if (lat == 0 && lng == 0 && position) {
            // 초기화 0.0 상태일때만 갱신
            map.setView([position.latitude, position.longitude], 16)
            const data = convertBoundsToNEWS(map.getBounds())
            setNews(data)
          }
          return null
        }}
      </MapConsumer>
      <MarkerClusterGroup
        showCoverageOnHover={false}
        zoomToBoundsOnClick={false}
        spiderfyOnMaxZoom={false}
        animate={false}
        maxClusterRadius={30} //! 묶어주는 픽셀 범위
        onClick={(e) => {
          console.log('클러스터 클릭')
        }}
        // onMouseOver={(e: LeafletMouseEvent) => {
        //   e.propagatedFrom.bindTooltip(`Markers: aaaa`).openTooltip()
        //   console.log(e)
        // }}
        iconCreateFunction={(cluster) => {
          const markers = cluster.getAllChildMarkers()
          const data = []
          for (const marker of markers) {
            data.push(marker.options.options)
          }
          const popupComponent = PopoverList(data)

          const a = L.DomUtil.create('div')
          a.innerHTML = renderToString(popupComponent)

          a.addEventListener('click', ({ target }) => {
            if (target instanceof HTMLElement) {
              if ((target.className = 'popover-list')) {
                setDetailId(parseInt(target.dataset.id as string))
              }
            }
          })

          cluster.bindPopup(a).on('click', (e) => {
            console.log('팝업 클릭')
          })

          const html = '<span class="my-cluster-child">' + markers.length + '</span>'
          return L.divIcon({ html: html, className: 'my-cluster', iconSize: L.point(32, 32) })
        }}
      >
        <Markers markerData={markerData} setNews={setNews} setDetailId={setDetailId} />
      </MarkerClusterGroup>
    </MapContainer>
  )
}

export default MapSearch
