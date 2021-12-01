import { NEWS } from '@/types/Shop'
import { LatLngBounds } from 'leaflet'

const convertBoundsToNEWS = (bounds: LatLngBounds): NEWS => {
  return {
    t: bounds.getNorth(),
    b: bounds.getSouth(),
    r: bounds.getEast(),
    l: bounds.getWest(),
  }
}

export { convertBoundsToNEWS }
