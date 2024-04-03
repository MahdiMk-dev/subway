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
    const [sidata, setsideData] = useState({});
    const [stations, setStations] = useState({});
    const { rideId } = useParams(); // Get the userId from URL params
    
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log('hi')
        const token = localStorage.getItem('admintoken');
        const response = await fetch('http://localhost:8000/api/getadminride/'+rideId, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        const rideData = await response.json();
        if(rideData.status=='success'){
          setData(rideData.rides);
          setStations(rideData.stations)
      }
      else{
        alert(rideData.message)
      }
        
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUserData();
  }, []);
      const handleChange = (e) => {
        const { id, value } = e.target;
        setData({ ...data, [id]: value });
    };
 const handleSubmit = async (e) => {
    e.preventDefault();
    const origin_station_id = document.getElementById('origin_station_id').value;
    const destination_station_id = document.getElementById('destination_station_id').value;
    const price = document.getElementById('price').value;
    const distance = document.getElementById('distance').value;
    const duration = document.getElementById('duration').value; 
    const id=rideId
    const formData = {
            id: rideId,
            origin_station_id: data.origin_station_id,
            destination_station_id: data.destination_station_id,
            distance: data.distance,
            duration: data.duration,
            price: data.price,
        };
        console.log(formData)
    try {
      const token = localStorage.getItem('admintoken');
      console.log(token)
      const response = await fetch('http://localhost:8000/api/updateadminride', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if(data.status=='success'){
        alert('updated successfully')
        window.location.href='/admin'
      }
      else{
        alert(data.message)
         window.location.href="/admin_login"
      }
      console.log(data); // Handle the response data here
    } catch (error) {
      console.error('Error:', error);
    }
  }; 
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
          <form className="productForm" onSubmit={handleSubmit}>
              <div className="productFormLeft">
                 <label>Origin</label>
                  <select name="origin_station_id" id="origin_station_id" value={data.origin_station} onChange={handleChange}
                  required>
                      {Array.isArray(stations) ? (
        // If it's an array, map over station data and generate option elements
        stations.map((station) => (
            <option key={station.id} value={station.id}>
                {station.name}
            </option>
        ))
    ) : (
        // If it's not an array or doesn't have the map function, display a default option
        <option value="">No stations available</option>
    )}
                  </select>
                  <label>Destination</label>
                  <select name="destination_station_id" id="destination_station_id" value={data.destination_station} onChange={handleChange}
                  required>
                      {Array.isArray(stations) ? (
        // If it's an array, map over station data and generate option elements
        stations.map((station) => (
            <option key={station.id} value={station.id}>
                {station.name}
            </option>
        ))
    ) : (
        // If it's not an array or doesn't have the map function, display a default option
        <option value="">No stations available</option>
    )}
                  </select>
                  <label>Price</label>
                  <input
                    type="number"
                    id="price"
                    value={data.price}
                    onChange={handleChange}
                  required
                  />
                  <label>Duration</label>
                  <input
                    type="number"
                    id="duration"
                    value={data.duration}
                    onChange={handleChange}
                  required
                  />
                  <label>Distance</label>
                  <input
                    type="number"
                    id="distance"
                    value={data.distance}
                    onChange={handleChange}
                  required
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