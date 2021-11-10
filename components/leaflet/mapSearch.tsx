import { LatLngBounds, Map } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React, { Dispatch, FC, SetStateAction } from 'react';
import {
  MapConsumer,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  Tooltip,
  useMap,
  useMapEvents,
} from 'react-leaflet';
import { usePosition } from '../../state/hooks/usePosition';
import { NEWS, Place } from '../../types/Place';
import { DefaultIcon } from './CommonParts';

type MapP = {
  setMap: Dispatch<SetStateAction<Map | undefined>>;
  setNews: Dispatch<SetStateAction<NEWS | undefined>>;
  setIsModalVisible: Dispatch<SetStateAction<boolean>>;
  setDetailId: Dispatch<SetStateAction<number | undefined>>;
  markerData: Place[] | undefined;
};

type MarkersP = Omit<MapP, 'setMap'>;

const boundsToNews = (bounds: LatLngBounds): NEWS => {
  return {
    t: bounds.getNorth(),
    b: bounds.getSouth(),
    r: bounds.getEast(),
    l: bounds.getWest(),
  };
};

const ToolTipDiv = () => {
  return <div>aaaa</div>;
};

const CenterMarker = () => {
  const map = useMap();
  return (
    <Marker position={map.getCenter()} icon={DefaultIcon}>
      <Popup>현재 지점</Popup>
    </Marker>
  );
};

const Markers = ({
  markerData,
  setNews,
  setDetailId,
  setIsModalVisible,
}: MarkersP) => {
  const map = useMapEvents({
    moveend() {
      const data = boundsToNews(map.getBounds());
      setNews(data);
    },
  });

  return markerData ? (
    <React.Fragment>
      {markerData.map((place) => (
        <Marker
          key={place.id}
          position={[
            place.position.coordinates[1],
            place.position.coordinates[0],
          ]}
          icon={DefaultIcon}
        >
          {/* <Popup>{place.name}</Popup> */}
          <Tooltip
            permanent
            direction="top"
            offset={[0, 20]}
            opacity={1}
            interactive
          >
            {/* <ToolTipDiv /> */}
            <div
              onClick={() => {
                setIsModalVisible(() => true);
                setDetailId(place.id);
              }}
            >
              {place.name}
            </div>
          </Tooltip>
        </Marker>
      ))}
    </React.Fragment>
  ) : null;
};

const MapSearch: FC<MapP> = ({
  setMap,
  setNews,
  markerData,
  setDetailId,
  setIsModalVisible: setIsShowDetail,
}) => {
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
      style={{ height: '100%', minHeight: 400, width: '100%' }}
      whenCreated={(map) => {
        console.log('Created');
        const data = boundsToNews(map.getBounds());
        setNews(data); // 현재 0 ,0 안 넣어서 실행 안 되는중임.
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
            const data = boundsToNews(map.getBounds());
            setNews(data);
          }
          return null;
        }}
      </MapConsumer>
      <Markers
        markerData={markerData}
        setNews={setNews}
        setDetailId={setDetailId}
        setIsModalVisible={setIsShowDetail}
      />
    </MapContainer>
  );
};

export default MapSearch;
