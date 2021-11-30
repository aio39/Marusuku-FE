import { DefaultIcon } from '@/components/leaflet/CommonParts'
import DefaultTileLayer from '@/components/leaflet/parts/DefaultTileLayer'
import { Map } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import React, { Dispatch, FC, SetStateAction } from 'react'
import { MapConsumer, MapContainer, Marker, Popup } from 'react-leaflet'

type P = {
  setMap: Dispatch<SetStateAction<Map | undefined>>
  position: [number, number]
}

const CenterMarker: FC<Pick<P, 'position'>> = ({ position }) => {
  // const map = useMapEvents({
  //   moveend(e) {
  //     setPosition(map.getCenter())
  //   },
  // })

  return (
    <Marker position={position} icon={DefaultIcon}>
      <Popup>현재 지점</Popup>
    </Marker>
  )
}

const MapMini: FC<P> = ({ setMap, position }) => {
  if (!window) {
    return <div>loading</div>
  }

  return (
    <MapContainer
      center={position ? [position[0], position[1]] : [37.5, 126.9]}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: 400, width: '100%' }}
      whenCreated={(map) => {
        console.info('Map Created')
        setMap(map)
      }}
      whenReady={() => {
        console.info('Map Ready')
      }}
    >
      <DefaultTileLayer />
      <CenterMarker position={position} />
      <MapConsumer>
        {(map) => {
          const { lat, lng } = map.getCenter()
          if (lat == 0 && lng == 0 && position) {
            map.setView(position, 16)
          }
          return null
        }}
      </MapConsumer>
    </MapContainer>
  )
}

export default MapMini
