'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// 鳥居アイコン（デフォルトマーカーを鳥居風に）
const toriiIcon = new L.DivIcon({
  html: '⛩️',
  className: '',
  iconSize: [30, 30],
})

export default function ShrineMap({ places }: { places: any[] }) {
  return (
    <MapContainer
      center={[35.0, 136.0]}
      zoom={6}
      style={{ height: '500px', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {places.map((place) => (
        <Marker
          key={place.id}
          position={[place.latitude, place.longitude]}
          icon={toriiIcon}
        >
          <Popup>
            <strong>{place.name_ja}</strong>
            <br />
            {place.description}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}