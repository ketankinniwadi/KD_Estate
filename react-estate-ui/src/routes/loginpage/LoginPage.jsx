import React from 'react'
import "./loginpage.scss"
import Login from '../../components/login/login'
function LoginPage() {
  return (
    <div className="homepage">
        <div className="textcontainer">
        <div className="wrapper">
           <Login/>
        </div>
        </div>
        <div className="imgcontainer">
            <img src="/bg.png" alt="" />
        </div>
    </div>
  )
}

export default LoginPage
