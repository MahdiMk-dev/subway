import '../../styles/admin/newUser.css'
import Topbar from './Topbar';
import Sidebar from './Sidebar';
import { useState, useEffect } from "react";

function NewRide() {
  const [formData, setFormData] = useState({
    origin_station_id: "1",
    destination_station_id: "1",
    price: "",
    duration: "",
    distance: "",
  });

  const [stations, setStations] = useState([]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    console.log(value)

  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("admintoken");
      console.log(formData)
      const response = await fetch("http://localhost:8000/api/createadminride", {
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
      <h1 className="newUserTitle">New Ride</h1>
         <form className="productForm" onSubmit={handleSubmit}>
              <div className="productFormLeft">
                 <label>Origin</label>
                  <select name="origin_station_id" id="origin_station_id" onChange={handleChange} required  >
                      {stations.map((station) => (
                  <option key={station.id} value={station.id}>
                    {station.name}
                  </option>
                ))}
                  </select>
                  <label>Destination</label>
                  <select name="destination_station_id" id="destination_station_id" onChange={handleChange} required >
                      {stations.map((station) => (
                  <option key={station.id} value={station.id}>
                    {station.name}
                  </option>
                ))}
                  </select>
                  <label>Price</label>
                  <input
                    type="number"
                    id="price"
                    placeholder="price"
                    onChange={handleChange} required 
                  />
                  <label>Duration</label>
                  <input
                    type="number"
                    id="duration"
                    placeholder="duration"
                    onChange={handleChange} required 
                  />
                  <label>Distance</label>
                  <input
                    type="number"
                    id="distance"
                    placeholder="distance"
                    onChange={handleChange} required 
                  />
              <button className="productButton">Create</button>
              </div>


          </form>
    </div>
    </div>
</div>
  );
}

export default NewRide;