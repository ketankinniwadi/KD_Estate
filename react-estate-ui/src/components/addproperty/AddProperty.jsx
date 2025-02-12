import React from "react";
import { useNavigate } from "react-router-dom";
import "./addproperty.scss";
import { Link } from "react-router-dom";

export default function AddProperty(){
  const navigate = useNavigate();

  const handleAddProperty = () => {
    navigate("/addproperty"); // Update the route as needed
  };

  return (
    <div className="add-property-container">
      <h2>Add Property</h2>
     
      <button onClick={handleAddProperty} className="add-property-button">
        + Add New Property
      </button>
     
    </div>
  );
}
