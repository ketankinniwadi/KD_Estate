import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./addpage.scss"; // Add styling if needed
import PropertyService from "../../service/PropertyService";
export default function PropertyForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    imagepath: "",
    latitude: "",
    longitude: "",
    bedroom: "",
    bathroom: "",
    ownerId: localStorage.getItem("id"),
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    PropertyService.addProperty(formData).then((resp)=>{
      console.log(resp);
      setTimeout(() => navigate("/"), 2000);
    }).catch(err=>console.log(err))

    console.log("Submitted Property:", formData);
    
    // Here you can call an API to save data
    // Example: APIService.addProperty(formData).then(response => console.log(response));

    navigate("/owner"); // Redirect after submission
  };

  return (
    <div className="property-form-container">
      <h2>Add Property</h2>
      <form onSubmit={handleSubmit}>
        <label>User ID:</label>
        <input type="number" name="ownerId" value={formData.ownerId} onChange={handleChange} required readOnly/>

        <label>Title:</label>
        <input type="text" name="title" value={formData.title} onChange={handleChange} required />

        <label>Description:</label>
        <textarea name="description" value={formData.description} onChange={handleChange} required />

        <label>Price ($):</label>
        <input type="number" name="price" value={formData.price} onChange={handleChange} required />

        <label>Location:</label>
        <input type="text" name="location" value={formData.location} onChange={handleChange} required />

        <label>Image URL:</label>
        <input type="text" name="imagepath" value={formData.imagepath} onChange={handleChange} />

        <label>Latitude:</label>
        <input type="number" name="latitude" value={formData.latitude} onChange={handleChange} required />

        <label>Longitude:</label>
        <input type="number" name="longitude" value={formData.longitude} onChange={handleChange} required />

        <label>Bedrooms:</label>
        <input type="number" name="bedroom" value={formData.bedroom} onChange={handleChange} required />

        <label>Bathrooms:</label>
        <input type="number" name="bathroom" value={formData.bathroom} onChange={handleChange} required />

        <button type="submit" className="submit-button">Submit Property</button>
      </form>
    </div>
  );
}
