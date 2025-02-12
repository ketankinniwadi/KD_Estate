import React, { Component, useEffect, useState } from 'react'
import "./listpage.scss"
import Filter from '../../components/filter/filter'
import Card from '../../components/card/card'
import { listData } from '../../lib/dummydata'
import Map from '../../components/map/Map'
import PropertyService from '../../service/PropertyService'
import { useLocation } from 'react-router-dom'

export default function ListPage() {
   
  const [data, setData] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const filters = {
    location: queryParams.get("location") || "",
    minPrice: queryParams.get("minPrice") || 0,
    maxPrice: queryParams.get("maxPrice") || Number.MAX_VALUE,
    bedRoom: parseInt(queryParams.get("bedroom") || 0)
  };
  console.log(filters.bedRoom);

  useEffect(() => {
    fetchData();
  }, [location.search]);

  const fetchData = async () => {
    try {
      const response = await PropertyService.getAllProperty();
      
      
      // Apply filtering on the fetched data
      const filteredData = response.data.filter((item) => {
        return (
          (!filters.location || item.location.toLowerCase().includes(filters.location.toLowerCase())
        ) &&
          item.price >= filters.minPrice &&
          item.price <= filters.maxPrice &&
          item.bedroom >= filters.bedRoom
        );
      });

      setData(filteredData);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };
  return (
    <div className="listpage">
        <div className="listcontainer">
            <div className="wrapper">
                {<Filter/>}
               {data.map(item =>(
                <Card key={item.propertyId} item={item}/>
               ))}

            </div>
        </div>
        <div className="mapcontainer"> <Map items={data}/> </div> 
    </div>
  )
}
