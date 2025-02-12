import React from 'react'
import "./homepage.scss"
import SearchBar from '../../components/searchbar/SearchBar'
function HomePage() {
  return (
    <div className="homepage">
        <div className="textcontainer">
        <div className="wrapper">
            <h1 className='title'>
            Find Your Dream Home Where Comfort Meets Elegance!
            </h1>
            <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing 
                elit. Porro beatae natus animi. 
                Iure laudantium doloribus at pers
                piciatis quibusdam sit maiores, vitae, animi atque illum omnis eaque dolorum ad qui quisquam!
            </p>
            <SearchBar/>
            <div className="boxes">
                <div className="box">
                    <h1>16</h1>
                    <h2>Years of Experience</h2>
                </div>
                <div className="box">
                    <h1>200</h1>
                    <h2>Awards</h2>
                </div>
                <div className="box">
                    <h1>1200+</h1>
                    <h2>Property Ready</h2>
                </div>
            </div>
        </div>
        </div>
        <div className="imgcontainer">
            <img src="/bg.png" alt="" />
        </div>
    </div>
  )
}

export default HomePage
