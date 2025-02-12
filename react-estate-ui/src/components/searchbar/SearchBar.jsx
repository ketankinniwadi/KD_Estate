import React, { useEffect, useState } from 'react'
import "./searchbar.scss"
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const types = ["buy"];
export default function SearchBar() {
  const [query,setQuery]=useState({
    type: "buy",
    location: "",
    minPrice: 0,
    maxPrice: 0,
  });
  const [location, setLocation] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Construct query string
    const queryParams = new URLSearchParams({
      location,
      minPrice,
      maxPrice
    }).toString();
    
    // Navigate to /list with query parameters
    navigate(`/list?${queryParams}`);
  };
  return (
    <div className="searchbar">
        <div className="type">
          {/* {types.map((type)=>(

          <button onClick={()=>switchtype(type)} className={query.type === type ? 'active' : ''} >
            {type}
            </button>

          ))} */}
          
        </div>
        <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        name="location" 
        placeholder="City Location" 
        value={location} 
        onChange={(e) => setLocation(e.target.value)} 
      />
      <input 
        type="number" 
        name="minPrice" 
        placeholder="Min Price" 
        min={0} 
        value={minPrice} 
        onChange={(e) => setMinPrice(e.target.value)} 
      />
      <input 
        type="number" 
        name="maxPrice" 
        placeholder="Max Price" 
        min={0} 
        value={maxPrice} 
        onChange={(e) => setMaxPrice(e.target.value)} 
      />
      <button type="submit">
        <img src="/search.png" alt="Search" />
      </button>
    </form>
        </div>
  )
}
