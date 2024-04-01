import { Link } from "react-router-dom";
import '../../styles/admin/product.css'
import { productData } from "../../dummyData";
import {Publish} from '@mui/icons-material'
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import { tripRows } from "../../dummyData";
import Topbar from './Topbar';
import Sidebar from './Sidebar';

function Trips() {
   const [data, setData] = useState({});
      const { tripId } = useParams(); // Get the userId from URL params
 useEffect(() => {
    // Check if userId is not null
    if (tripId !== null) {
        // Filter userRows to find the user with the matching id
        const trip = tripRows.find((trip) => trip.id === parseInt(tripId));
        setData(trip); // Set the data state with the found user
    }
}, [tripId]); 
  return (
    <div>
    <Topbar />
      <div className="container">
        <Sidebar />
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Trip</h1>
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
                  <label>Status</label>
                  <select name="status" id="status" value={data.status}>
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                  </select>
                  <label htmlFor="timeInput">Departure Time</label>
                  <input
                    type="datetime-local"
                    id="departure_time"
                    value={data.departure_time}
                  />
                  <label htmlFor="timeInput">Arrival Time</label>
                  <input
                    type="datetime-local"
                    id="arrival_time"
                    value={data.arrival_time}
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
export default Trips;