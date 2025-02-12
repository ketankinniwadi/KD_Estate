import React from "react";
import "./inquiryTable.scss";

export default function InquiryTable({ properties }) {
    if (!properties || properties.length === 0) {
        return <p>Loading inquiries...</p>; // Handles undefined or empty properties
      }
  return (
    <div className="inquiry-tables">
      {properties.map((property) => (
        <div key={property.propertyId} className="property-inquiry">
          <h2>{property.title}</h2>
          {property.inquiries.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Inquiry ID</th>
                  <th>Customer Email</th>
                  <th>Message</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {property.inquiries.map((inquiry) => (
                  <tr key={inquiry.inquiryId}>
                    <td>{inquiry.inquiryId}</td>
                    <td>{inquiry.customerEmail}</td>
                    <td>{inquiry.message}</td>
                    <td>{new Date(inquiry.date).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No inquiries yet for this property.</p>
          )}
        </div>
      ))}
    </div>
  );
}
