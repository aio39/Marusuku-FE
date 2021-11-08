import { LatLng } from 'leaflet';
import { atom } from 'recoil';

const positionState = atom<LatLng>({
  key: 'position',
  default: new LatLng(0, 0),
});

const recentGeoCodeState = atom<LatLng | null>({
  key: 'recentGeoCode',
  default: null,
});

type Place = {
  geoCode: LatLng;
  name: string;
  address: string;
};

const placeListState = atom<Place[]>({
  key: 'places',
  default: [],
});

export { positionState, placeListState, recentGeoCodeState };
