import { TileLayer, TileLayerProps } from 'react-leaflet'

interface IProps {
  tileLayerProps?: TileLayerProps
}

export default function DefaultTileLayer({ tileLayerProps }: IProps): JSX.Element {
  return (
    <TileLayer
      maxZoom={21}
      minZoom={2}
      zIndex={1}
      {...tileLayerProps}
      url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
      subdomains={['mt0', 'mt1', 'mt2', 'mt3']}

      // attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
  )
}
