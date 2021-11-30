import { LatLng } from 'leaflet'
import { atom } from 'recoil'

const positionState = atom<LatLng>({
  key: 'position',
  default: new LatLng(0, 0),
})

const recentGeoCodeState = atom<LatLng | null>({
  key: 'recentGeoCode',
  default: null,
})

type Shop = {
  geoCode: LatLng
  name: string
  address: string
}

const shopListState = atom<Shop[]>({
  key: 'shops',
  default: [],
})

export { positionState, shopListState, recentGeoCodeState }
