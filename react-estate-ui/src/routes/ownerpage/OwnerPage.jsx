import React, { useEffect, useState } from "react";
import "./ownerpage.scss";
import UserService from "../../service/UserService";
import Card from "../../components/card/card";
import InquiryTable from "../../components/inquirytable/InquiryTable";
import AddProperty from "../../components/addproperty/AddProperty";

export default function OwnerPage() {
  const [data, setData] = useState(null);
  const [ownerId, setOwnerId] = useState(null); // Store ID in state

  // Load ID from localStorage when the component mounts
  useEffect(() => {
    const storedId = localStorage.getItem("id");
    if (storedId) {
      setOwnerId(storedId);
    } else {
      console.error("Owner ID is not found in localStorage");
    }
  }, []);

  // Fetch data when ownerId is set
  useEffect(() => {
    if (ownerId) {
      fetchData(ownerId);
    }
  }, [ownerId]);

  const fetchData = async (id) => {
    try {
      console.log("Fetching data for Owner ID:", id);
      const resp = await UserService.getUserById(id);

      if (!resp || !resp.data) {
        console.error("No data received from API");
        return;
      }

      setData(resp.data);
      console.log("Fetched Data:", resp.data);
    } catch (err) {
      console.error("Error fetching user data:", err);
    }
  };

  return (
    <div className="ownerpage">
      <div className="listcontainer">
        <div className="wrapper">
          <AddProperty />
          {data && data.properties ? (
            data.properties.map((item) => (
              <Card key={item.propertyId} item={item} />
            ))
          ) : (
            <p>Loading properties...</p>
          )}
        </div>
      </div>
      <div className="mapcontainer">
        <div className="owner-page">
          {data ? <InquiryTable properties={data.properties} /> : <p>Loading...</p>}
        </div>
      </div>
    </div>
  );
}
