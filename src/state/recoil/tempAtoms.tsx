import { LatLng } from 'leaflet'
import { atom } from 'recoil'

const positionState = atom<LatLng | undefined>({
  key: 'position',
  default: undefined,
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

const qrcodeSelectedIdState = atom<number | undefined>({
  key: 'qrcode-current',
  default: undefined,
})

export { positionState, shopListState, recentGeoCodeState, qrcodeSelectedIdState }
