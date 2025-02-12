import React from 'react'
import { Marker, Popup } from 'react-leaflet'
import { Link } from 'react-router-dom'
import './pin.scss'
function Pin({item}) {
  return (
    <Marker position={[item.latitude, item.longitude]}>
          { <Popup>
            <div className="popupcontainer">
                <img src={item.imagepath} alt="" />
            </div>
            <div className="textcontainer">
                <Link to={`/${item.id}`}> {item.title}</Link>
                <span className='bed'>{item.bedroom} Bedroom</span>
                <p> Rs {item.price}</p>
            </div>
          </Popup> }
        </Marker>
  )
}
export default Pin
