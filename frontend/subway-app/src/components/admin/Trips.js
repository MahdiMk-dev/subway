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
    const [sidata, setsideData] = useState({});
    const [stations, setStations] = useState({});
    const { tripId } = useParams(); // Get the userId from URL params
    
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log('hi')
        const token = localStorage.getItem('admintoken');
        const response = await fetch('http://localhost:8000/api/getadmintrip/'+tripId, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        const tripData = await response.json();
        console.log(tripData)
        if(tripData.status=='success'){
          setData(tripData.trips);
          setStations(tripData.station)
          console.log(tripData)
      }
      else{
        alert(tripData.message)
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
    const arrival_time = document.getElementById('arrival_time').value;
    const departure_time = document.getElementById('departure_time').value;
    const status = document.getElementById('status').value; 
    const price = document.getElementById('price').value;
    const id=tripId
    const formData = {
            id: tripId,
            origin_station_id: data.origin_station_id,
            destination_station_id: data.destination_station_id,
            price: data.price,
            arrival_time: data.arrival_time,
            status: data.status,
            departure_time: data.departure_time,
        };
        console.log(formData)
    try {
      const token = localStorage.getItem('admintoken');
      console.log(token)
      const response = await fetch('http://localhost:8000/api/updateadmintrip', {
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
        <h1 className="productTitle">Trip</h1>
      </div>
      
      <div className="productBottom">
          <form className="productForm" onSubmit={handleSubmit}>
              <div className="productFormLeft">
                 <label>Origin</label>
                  <select name="origin_station_id" id="origin_station_id" value={data.origin_station_id} onChange={handleChange}
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
                  <select name="destination_station" id="destination_station_id" value={data.destination_station_id} onChange={handleChange}
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
                  <label>Status</label>
                  <select name="status" id="status" value={data.status} onChange={handleChange}
                  required>
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                  </select>
                  <label htmlFor="timeInput">Departure Time</label>
                  <input
                    type="datetime-local"
                    id="departure_time"
                    value={data.departure_time}
                    onChange={handleChange}
                  required
                  />
                  <label htmlFor="timeInput">Arrival Time</label>
                  <input
                    type="datetime-local"
                    id="arrival_time"
                    value={data.arrival_time}
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
export default Trips;