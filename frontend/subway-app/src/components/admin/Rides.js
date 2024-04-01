import { Link } from "react-router-dom";
import '../../styles/admin/product.css'
import { productData } from "../../dummyData";
import {Publish} from '@mui/icons-material'
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import { rideRows } from "../../dummyData";
import Topbar from './Topbar';
import Sidebar from './Sidebar';

function Rides() {
   const [data, setData] = useState({});
      const { rideId } = useParams(); // Get the userId from URL params
 useEffect(() => {
    // Check if userId is not null
    if (rideId !== null) {
        // Filter userRows to find the user with the matching id
        const ride = rideRows.find((ride) => ride.id === parseInt(rideId));
        setData(ride); // Set the data state with the found user
    }
}, [rideId]); 
  return (
    <div>
    <Topbar />
      <div className="container">
        <Sidebar />
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Ride</h1>
      </div>
      
      <div className="productBottom">
          <form className="productForm">
              <div className="productFormLeft">
                 <label>Origin</label>
                  <select name="origin_station" id="origin" value={data.origin_station}>
                      <option value="rome">Rome</option>
                      <option value="newyork">Newyork</option>
                  </select>
                  <label>Destination</label>
                  <select name="destination_station" id="destination" value={data.destination_station}>
                      <option value="rome">Rome</option>
                      <option value="newyork">Newyork</option>
                      <option value="italy">italy</option>
                  </select>
                  <label>Price</label>
                  <input
                    type="number"
                    id="price"
                    value={data.price}
                  />
                  <label>Duration</label>
                  <input
                    type="number"
                    id="duration"
                    value={data.duration}
                  />
                  <label>Distance</label>
                  <input
                    type="number"
                    id="distance"
                    value={data.distance}
                  />
                  <button className="productButton">Update</button>
              </div>
          </form>
      </div>
    </div>
    </div>
</div>
  );
}
export default Rides;