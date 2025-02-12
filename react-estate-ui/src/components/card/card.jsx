import React from 'react';
import './card.scss';
import { Link } from 'react-router-dom';

function Card({ item }) {
  const userRole = localStorage.getItem("role"); // Get role from localStorage
  const isOwner = userRole === "OWNER"; // Check if user is an owner

  return (
    <div className='card'>
      <Link to={isOwner ? `/owner/property/${item.propertyId}` : `/${item.propertyId}`} className='imagecontainer'>
        <img src={item.imagepath} alt="" />
      </Link>
      
      <div className="textcontainer">
        <h2 className='title'>
          <Link to={isOwner ? `/owner/property/${item.propertyId}` : `/${item.propertyId}`}>
            {item.title}
          </Link>
        </h2>
        
        <p className='address'>
          <img src="/pin.png" alt="" />
          <span>{item.location}</span>
        </p>
        
        <p className='price'>
          Rs {item.price}
        </p>

        <div className="bottom">
          <div className="features">
            <div className="feature">
              <img src="/bed.png" alt="" />
              <span>{item.bedroom} Bedrooms</span>
            </div>
            <div className="feature">
              <img src="/bath.png" alt="" />
              <span>{item.bathroom} Bathrooms</span>
            </div>
          </div>

          <div className="icons">
            {isOwner ? (
              // If user is an OWNER, show Edit/Delete option
              <Link to={`/deleteproperty/${item.propertyId}`}>
                <div className="icon">
                  <img src="/utility.png" alt="" />
                </div>
              </Link>
            ) : (
              // If user is a regular user, show Inquiry button
              <Link to={`/inquiry/${item.propertyId}`}>
                <div className="icon">
                  <img src="/chat.png" alt="Inquiry" />
                </div>
              </Link>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default Card;
