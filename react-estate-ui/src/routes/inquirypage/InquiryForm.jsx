import React, { useState } from "react";
import './inquiryform.scss'
import Inquiry from "../../components/inquiry/Inquiry";
export default function InquiryForm() {
  
  return (
    <div className="homepage">
            <div className="textcontainer">
            <div className="wrapper">
            <Inquiry/>
            </div>
            </div>
            <div className="imgcontainer">
                <img src="/bg.png" alt="" />
            </div>
        </div>
  );
}
