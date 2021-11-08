import { LatLng, Map } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import {
  MapConsumer,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from 'react-leaflet';
import { usePosition } from '../state/hooks/usePosition';
import { usePlaces } from '../state/swr/usePlace';
import { NEWS } from '../types/Place';
import { DefaultIcon } from './leaflet/CommonParts';

type P = {
  setMap: Dispatch<SetStateAction<Map | undefined>>;
};

const CenterMarker = () => {
  const map = useMap();
  return (
    <Marker position={map.getCenter()} icon={DefaultIcon}>
      <Popup>현재 지점</Popup>
    </Marker>
  );
};

const Markers = () => {
  const [position, setPosition] = useState<LatLng | null>(null);
  const [news, setNews] = useState<NEWS>();
  const { data, error, mutate } = usePlaces(news);
  const map = useMapEvents({
    // click() {
    //   map.locate();
    //   console.log('click');
    // },
    // locationfound(e) {
    //   console.log('로케이션 파운트');
    //   setPosition(e.latlng);
    //   map.flyTo(e.latlng, map.getZoom());
    // },
    moveend() {
      const bounds = map.getBounds();
      const data: NEWS = {
        t: bounds.getNorth(),
        b: bounds.getSouth(),
        r: bounds.getEast(),
        l: bounds.getWest(),
      };
      setNews(data);
    },
  });

  return data ? (
    <React.Fragment>
      {data.map((place) => (
        <Marker
          position={[
            place.position.coordinates[1],
            place.position.coordinates[0],
          ]}
          icon={DefaultIcon}
        >
          <Popup>{place.name}</Popup>
        </Marker>
      ))}
    </React.Fragment>
  ) : null;
};

const MapMini: FC<P> = ({ setMap }) => {
  const { position, error } = usePosition();

  console.log(position);
  //  TODO 임시 0 0
  return (
    <MapContainer
      center={
        position ? [position.latitude, position.longitude] : [37.5, 126.9]
      }
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: 400, width: '100%' }}
      whenCreated={(map) => {
        console.log('Created');
        setMap(map);
      }}
      whenReady={() => {
        console.log('Ready');
      }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <CenterMarker />
      <MapConsumer>
        {(map) => {
          const { lat, lng } = map.getCenter();
          console.log('코너', map.getBounds());
          if (lat == 0 && lng == 0 && position) {
            // 초기화 0.0 상태일때만 갱신
            map.setView([position.latitude, position.longitude], 16);
          }
          return null;
        }}
      </MapConsumer>
      <Markers />
    </MapContainer>
  );
};

export default MapMini;
