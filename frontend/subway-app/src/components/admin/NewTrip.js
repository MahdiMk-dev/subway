import '../../styles/admin/newUser.css';
import Topbar from './Topbar';
import Sidebar from './Sidebar';
import { useState, useEffect } from "react";

function NewTrip() {
  const [formData, setFormData] = useState({
    origin_station_id: "",
    destination_station_id: "1",
    price: "",
    status: "pending",
    departure_time: "",
    arrival_time: "",
  });

  const [allstations, setallStations] = useState([]);
  const [stations, setStations] = useState([]);
  

  const handleChange = (e) => {

    const { id, value } = e.target; 
    setFormData({ ...formData, origin_station_id: document.getElementById('origin_station_id').value });
    setFormData({ ...formData, [id]: value });
    console.log(value)

  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("admintoken");
      console.log(formData)
      const response = await fetch("http://localhost:8000/api/createadmintrip", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data); // Check the response from the server
      if (data.status === "success") {
        alert("Trip created successfully");
        window.location.href = "/admin";
      } else {
        alert(data.message);
        window.location.href = "/admin_login";
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const token = localStorage.getItem('admintoken');
        const response = await fetch('http://localhost:8000/api/admingetstations/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        console.log(data);
        if (data.status === 'success') {
          
          setallStations(data.allstations);
          setStations(data.stations);
        } else {
          alert(data.message);
          window.location.href = "/admin_login";
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchStations();
  }, []);

  return (
    <div>
      <Topbar />
      <div className="admincontainer">
        <Sidebar />
        <div className="newUser">
          <h1 className="newUserTitle">New Trip</h1>
          <form className="productForm" onSubmit={handleSubmit}>
            <div className="productFormLeft">
              <label>Origin</label>
              <select name="origin_station_id" id="origin_station_id" onChange={handleChange} required>
              <option value="" selected>Select Origin</option>
                {stations.map((station) => (
                  <option key={station.id} value={station.id} >
                    {station.name}
                  </option>
                ))}
              </select>
              <label>Destination</label>
              <select name="destination_station_id" id="destination_station_id" onChange={handleChange} required>
              <option value="" selected>Select Origin</option>
                {allstations.map((station) => (
                  <option key={station.id} value={station.id}>
                    {station.name}
                  </option>
                ))}
              </select>
              <label>Price</label>
              <input type="number" id="price" placeholder="Price" onChange={handleChange} required />
              <label>Status</label>
              <select name="status" id="status" onChange={handleChange} required>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <label htmlFor="departure_time">Departure Time</label>
              <input type="datetime-local" id="departure_time" onChange={handleChange} required />
              <label htmlFor="arrival_time">Arrival Time</label>
              <input type="datetime-local" id="arrival_time" onChange={handleChange} required />
              <button type="submit" className="productButton">Create</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewTrip;
