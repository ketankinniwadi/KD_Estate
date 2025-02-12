import React from "react";
import { Link } from "react-router-dom";
import "../login/login.scss"

export default function Signup() {
  return (
    <div className="wrapper1 signUp">
    
      <div className="form">
        <div className="heading">CREATE AN ACCOUNT</div>
        <form>
          <div>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" placeholder="Enter your name" />
          </div>
          <div>
            <label htmlFor="name">E-Mail</label>
            <input type="text" id="name" placeholder="Enter your mail" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter you password"
            />
          </div>
          <button type="submit">Submit</button>
          <h2 align="center" class="or">
            OR
          </h2>
        </form>
        <p className="sign">
          Have an account ? 
          <div className="sign">
            <Link to="/login" > Login </Link>
          </div>
        </p>
      </div>
    </div>
  );
}
