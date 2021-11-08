import { DivIcon, icon, LatLng, LatLngBounds, Map } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Circle,
  ImageOverlay,
  MapContainer,
  Marker,
  Pane,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
  useMapEvents,
  ZoomControl,
} from 'react-leaflet';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  placeListState,
  positionState,
  recentGeoCodeState,
} from '../state/recoil/tempAtoms';
const position: [number, number] = [35.8953777, 128.6254371] as [
  number,
  number
];
const bounds = new LatLngBounds(
  [35.8953777, 128.6254371],
  [35.9056777, 128.6356371]
);

const ICON = icon({
  iconUrl: '/point.png',
  iconSize: [32, 32],
});

const ZOOM = 13;

function DisplayPosition({ map }: { map: Map }) {
  const [position, setPosition] = useRecoilState(positionState);
  const onClick = useCallback(() => {
    map.setView(center, ZOOM); // 초기 설정으로 돌아감.
  }, [map]);

  const onMove = useCallback(() => {
    setPosition(map.getCenter());
  }, [map]);

  useEffect(() => {
    map.on('move', onMove);
    return () => {
      map.off('move', onMove);
    };
  }, [map, onMove]);

  return (
    <p>
      latitude: {position.lat.toFixed(4)}, longitude: {position.lng.toFixed(4)}{' '}
      <button onClick={onClick}>reset</button>
    </p>
  );
}

function DraggableMarker() {
  const [draggable, setDraggable] = useState(false);
  const [position, setPosition] = useState({
    lat: 35.8953777,
    lng: 128.6254371,
  });
  const markerRef = useRef();
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
        }
      },
    }),
    []
  );
  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d);
  }, []);

  return (
    <Marker
      draggable={draggable}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
      icon={ICON}
    >
      <Popup minWidth={90}>
        <span onClick={toggleDraggable}>
          {draggable
            ? 'Marker is draggable'
            : 'Click here to make marker draggable'}
        </span>
      </Popup>
    </Marker>
  );
}

const ChildMap: FC = () => {
  const map = useMap(); // 현재 map의 상태를 Context Api를 통해 얻어옴.
  console.log(map.getCenter());

  return null;
};

const SingleEvent = () => {
  const map = useMapEvent('click', () => {
    // map.([50.5, 30.5]);
  });
  return null;
};

const TestEvent = () => {
  const setRecentGeoCode = useSetRecoilState(recentGeoCodeState);

  const map = useMapEvents({
    click: ({ latlng: { lat, lng } }) => {
      // map.locate();
      setRecentGeoCode(new LatLng(lat, lat));
    },
    locationfound: ({ latlng: { lat, lng } }) => {
      console.log('location found:', location);
      setRecentGeoCode(new LatLng(lat, lat));
    },

    // move: (location) => {
    //   console.log('move event', location);
    // },
  });

  return null;
};

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

const MapP = () => {
  const [map, setMap] = useState<Map>();
  const [position, setPosition] = useState<[number, number]>();
  const places = useRecoilValue(placeListState);

  const success: PositionCallback = (pos) => {
    const { latitude, longitude } = pos.coords;
    setPosition([latitude, longitude]);
  };

  const error: PositionErrorCallback = (err) => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  };
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, error, options);
  }, []);

  return (
    <>
      test2
      {map ? <DisplayPosition map={map} /> : null}
      {position ? (
        <MapContainer
          style={{ height: '100vh' }} // children 제외 immutable 함.
          center={position}
          zoomControl={false}
          zoom={20}
          scrollWheelZoom={true}
          whenCreated={setMap}
          whenReady={() => {
            console.log('지도 준비 완료 😊');
          }}
        >
          <TileLayer
            url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
            subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
            maxZoom={20}
            zIndex={1}
            // attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker
            position={position}
            icon={ICON}
            eventHandlers={{
              click: () => {
                console.log('marker clicked');
              },
            }}
          >
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
          {places.map((P) => (
            <Marker
              position={P.geoCode}
              icon={new DivIcon({ iconUrl: '/point.jpg', iconSize: [30, 30] })}
            >
              <Popup>
                <h1>{P.name}</h1>
                <h3>{P.address}</h3>
                <span>{P.geoCode.lat}</span> <br />
                <span>{P.geoCode.lng}</span>
              </Popup>
            </Marker>
          ))}

          <ChildMap />
          <TestEvent />
          <Pane name="custom">
            <Circle
              center={[position[0], position[1] + 0.001]}
              radius={200}
              pathOptions={{ color: 'red' }}
            />
          </Pane>
          <ImageOverlay
            url="http://www.lib.utexas.edu/maps/historical/newark_nj_1922.jpg"
            bounds={bounds}
            opacity={0.5}
            zIndex={10}
          />
          <ZoomControl position="bottomleft" />
          <DraggableMarker />
        </MapContainer>
      ) : (
        <div>좌표 취득중</div>
      )}
    </>
  );
};
export default MapP;
