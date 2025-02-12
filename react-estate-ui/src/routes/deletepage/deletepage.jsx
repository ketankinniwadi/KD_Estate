import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PropertyService from "../../service/PropertyService"; // Import service for API calls
import './deletepage.scss'
export default function DeleteProperty() {
  const { id } = useParams(); // Get property ID from URL
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPropertyDetails();
  }, []);

  const fetchPropertyDetails = async () => {
    try {
      const response = await PropertyService.getPropertyById(id);
      setProperty(response.data);
    } catch (error) {
      console.error("Error fetching property details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete ${property?.title}?`)) {
      return;
    }

    try {
      await PropertyService.deleteProperty(id);
      alert("Property deleted successfully!");
      navigate("/owner"); // Redirect to owner's property list
    } catch (error) {
      console.error("Error deleting property:", error);
      alert("Failed to delete the property.");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="delete-property">
      <h2>Delete Property</h2>
      {property ? (
        <>
          <p><strong>Title:</strong> {property.title}</p>
          <p><strong>Location:</strong> {property.location}</p>
          <p><strong>Price:</strong> Rs {property.price}</p>
          <button onClick={handleDelete} className="delete-btn">Delete Property</button>
          <button onClick={() => navigate(-1)} className="cancel-btn">Cancel</button>
        </>
      ) : (
        <p>Property not found.</p>
      )}
    </div>
  );
}
