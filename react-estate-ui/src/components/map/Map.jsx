import React from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import './map.scss'
import "leaflet/dist/leaflet.css";
import Pin from '../pin/Pin'
function Map({items}) {
  return (
    <div>
      <MapContainer center={[18.5204, 73.8567]} zoom={4} scrollWheelZoom={false} className='map'>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    { items.map((item,index)=>(
      <Pin item={item} key={item.propertyId || index}/>
    ))  }
  </MapContainer>
    </div>
  )
}
export default Map;
