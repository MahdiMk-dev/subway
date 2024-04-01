import { Link } from "react-router-dom";
import '../../styles/admin/product.css'
import { productData } from "../../dummyData";
import {Publish} from '@mui/icons-material'
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import { stationRows } from "../../dummyData";

function Station() {
   const [data, setData] = useState({});
      const { stationId } = useParams(); // Get the userId from URL params
 useEffect(() => {
    // Check if userId is not null
    if (stationId !== null) {
        // Filter userRows to find the user with the matching id
        const station = stationRows.find((station) => station.id === parseInt(stationId));
        setData(station); // Set the data state with the found user
    }
}, [stationId]); 
  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Station</h1>
      </div>
      
      <div className="productBottom">
          <form className="productForm">
              <div className="productFormLeft">
                  <label>Product Name</label>
                  <input type="text" id="name" placeholder={data.name} />
                  <label>Latitude</label>
                  <input type="text" id="lat" placeholder={data.lat} />
                  <label>Longitude</label>
                  <input type="text" id="lng" placeholder={data.lng} />
                  <label>City</label>
                  <select name="city" id="city" value={data.city}>
                      <option value="rome">Rome</option>
                      <option value="newyork">Newyork</option>
                  </select>
                  <label>Status</label>
                  <select name="status" id="status" value="data.status">
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="underconstruction">Under Construction</option>
                  </select>
                  <label htmlFor="timeInput">Oppening Hours</label>
                  <input
                    type="time"
                    id="openning_at"
                    value={data.oppening_at}
                  />
                   <p> {data.openning_at}</p>
                  <label htmlFor="timeInput">Closing Hours</label>
                  <input
                    type="time"
                    id="closing_at"
                    value={data.closing_at}
                  />
                  <button className="productButton">Update</button>
              </div>
          </form>
      </div>
    </div>
  );
}
export default Station;