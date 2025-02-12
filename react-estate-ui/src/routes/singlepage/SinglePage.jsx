import "./singlePage.scss";
import Slider from "../../components/slider/Slider";
import Map from "../../components/map/Map";
import { Link } from "react-router-dom";

import { useState ,useEffect} from "react";
import { useParams } from "react-router-dom";
import PropertyService from "../../service/PropertyService";
function SinglePage() {
const[singlePostData,setSinglePostData] = useState([]);
const { id } = useParams();

useEffect(() => {
  console.log("Property ID:", id);
  if (id) {
    fetchData();
  } else {
    console.error("Property ID is undefined!");
  }
}, [id]);

const fetchData = async () => {
  if (!id) return;

  try {
    const resp = await PropertyService.getPropertyById(id);
    if (!resp.data) {
      console.error("No data received from API");
      return;
    }
    setSinglePostData(resp.data);
    console.log("Fetched Data:", resp.data);
  } catch (err) {
    console.error("Error fetching property:", err);
  }
};

  const images = singlePostData.imagepath
    ? singlePostData.imagepath.includes(",")
      ? singlePostData.imagepath.split(",") // Split into an array if multiple images
      : [singlePostData.imagepath] // Wrap single image in an array
    : []; 
  return (
    <div className="singlePage">
      <div className="details">
        <div className="wrapper">
          {<Slider images={images} /> }
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{singlePostData.title}</h1>
                <div className="address">
                  <img src="/pin.png" alt="" />
                  <span>{singlePostData.location}</span>
                </div>
                <div className="price">$ {singlePostData.price}</div>
              </div>
            
            </div>
            <div className="bottom">{singlePostData.description}</div>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
          
          <p className="title">Sizes</p>
          <div className="sizes">
            <div className="size">
              <img src="/size.png" alt="" />
              <span>80 sqft</span>
            </div>
            <div className="size">
              <img src="/bed.png" alt="" />
              <span>{singlePostData.bedroom} beds</span>
            </div>
            <div className="size">
              <img src="/bath.png" alt="" />
              <span>{singlePostData.bathroom} bathroom</span>
            </div>
          </div>
          
          <p className="title">Location</p>
          <div className="mapContainer">
          {singlePostData?.latitude && singlePostData?.longitude ? (
            <Map className="map" items={[singlePostData]} />
      ) : (
          <p>Loading map...</p>
          )}
          </div>
          <Link to={`/inquiry/${singlePostData.propertyId}`}>
          <div className="buttons">
            <button>
              <img src="/chat.png" alt="" />
              Send a Message
            </button>
          </div>
            </Link>
        </div>
      </div>
    </div>
  );
}

export default SinglePage;