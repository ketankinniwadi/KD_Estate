import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './filter.scss';

export default function Filter() {
  const [query, setQuery] = useState({
    location: '',
    minPrice: '',
    maxPrice: '',
    bedroom: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setQuery({ ...query, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Filter out empty query parameters
    const filteredQuery = Object.fromEntries(
      Object.entries(query).filter(([_, value]) => value !== '')
    );

    // Construct query string
    const queryParams = new URLSearchParams(filteredQuery).toString();

    console.log("Navigating to: ", `/list?${queryParams}`); // Debugging

    // Navigate to /list with query parameters
    navigate(`/list?${queryParams}`);
  };

  return (
    <div className="filter">
      <h1>Search result for <b>India</b></h1>
      <form onSubmit={handleSubmit}>
        <div className="top">
          <div className="item">
            <label htmlFor="location">Location</label>
            <input 
              type="text" 
              id="location" 
              name="location" 
              placeholder="City Location" 
              value={query.location} 
              onChange={handleChange} 
            />
          </div>
        </div>
        <div className="bottom">
          <div className="item">
            <label htmlFor="minPrice">Min Price</label>
            <input 
              type="number" 
              id="minPrice" 
              name="minPrice" 
              placeholder="Min Price" 
              min={0} 
              value={query.minPrice} 
              onChange={handleChange} 
            />
          </div>
          <div className="item">
            <label htmlFor="maxPrice">Max Price</label>
            <input 
              type="number" 
              id="maxPrice" 
              name="maxPrice" 
              placeholder="Max Price" 
              min={0} 
              value={query.maxPrice} 
              onChange={handleChange} 
            />
          </div>
          <div className="item">
            <label htmlFor="bedroom">Bedroom</label>
            <input 
              type="text" 
              id="bedroom" 
              name="bedroom" 
              placeholder="Bedroom" 
              value={query.bedroom} 
              onChange={handleChange} 
            />
          </div>
          <button type="submit">
            <img src="/search.png" alt="Search" />
          </button>
        </div>
      </form>
    </div>
  );
}
