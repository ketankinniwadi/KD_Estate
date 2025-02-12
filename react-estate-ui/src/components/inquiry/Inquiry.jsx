import React, { useState } from "react";
import './inquiry.scss'
import InquiryService from "../../service/InquiryService";
import { useNavigate, useParams } from "react-router-dom";

export default function Inquiry() {
  const [formData, setFormData] = useState({
    message: "",
    customerId: localStorage.getItem("id"),

  });
  const {propertyId} = useParams();
  const navigate = useNavigate();

  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    InquiryService.AddInquiry(formData.customerId,propertyId,formData.message).then((resp)=>{
      console.log(resp);
      setTimeout(() => navigate("/"), 2000);
    }).catch(err=>console.log(err))

  }

    // if (!formData.message || !formData.customerId || !formData.propertyId) {
    //   alert("All fields are required!");
    //    return;
    // }

  return (
    <div className="inquiry-form">
      <h2>Submit an Inquiry</h2>
      {success && <p>{success}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Customer ID:
          <input type="number" name="customerId" value={formData.customerId} onChange={handleChange} required readOnly />
        </label>
        <label>
          Property ID:
          <input type="number" name="propertyId" value={propertyId} onChange={handleChange} readOnly />
        </label>
        <label>
          Message:
          <textarea name="message" value={formData.message} onChange={handleChange} required />
        </label>
        <button type="submit">Submit Inquiry</button>
      </form>
    </div>
  );
}
