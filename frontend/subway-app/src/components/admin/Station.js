import { Link } from "react-router-dom";
import '../../styles/admin/product.css'
import { productData } from "../../dummyData";
import {Publish} from '@mui/icons-material'
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import { stationRows } from "../../dummyData";
import Topbar from './Topbar';
import Sidebar from './Sidebar';

function Station() {
   const [data, setData] = useState({});
      const { stationId } = useParams(); // Get the userId from URL params


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log('hi')
        const token = localStorage.getItem('admintoken');
        
        const response = await fetch('http://localhost:8000/api/getstation/'+stationId, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        const stationData = await response.json();
        console.log(stationData)
        if(stationData.status=='success'){
          setData(stationData.stations);
      }
      else{
        alert(data.message)
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
    const name = document.getElementById('name').value;
    const city = document.getElementById('city').value;
    const lng = document.getElementById('lng').value;
    const lat = document.getElementById('lat').value;
    const status = document.getElementById('status').value;
    const closing_at = document.getElementById('closing_at').value; 
    const openning_at = document.getElementById('openning_at').value;  
    const id=stationId
    const formData = {
            id: stationId,
            name: data.name,
            lng: data.lng,
            lat: data.lat,
            city: data.city,
            status: data.status,
            closing_at: data.closing_at,
            openning_at: data.openning_at,
        };
    try {
      const token = localStorage.getItem('admintoken');
      console.log(token)
      const response = await fetch('http://localhost:8000/api/updateadminstation', {
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
      <div className="admincontainer">
        <Sidebar />
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Station</h1>
      </div>
      
      <div className="productBottom">
          <form className="productForm" onSubmit={handleSubmit}>
              <div className="productFormLeft">
                  <label>Station Name</label>
                  <input type="text" id="name" placeholder={data.name} onChange={handleChange} required value={data.name} />
                  <label>Latitude</label>
                  <input type="text" id="lat" placeholder={data.lat} onChange={handleChange} required value={data.lat} />
                  <label>Longitude</label>
                  <input type="text" id="lng" placeholder={data.lng} onChange={handleChange} required value={data.lng}/>
                  <label>City</label>
                  <select name="city" id="city" value={data.city} onChange={handleChange} required value={data.city}>
                      <option value="rome">Rome</option>
                      <option value="newyork">Newyork</option>
                  </select>
                  <label>Status</label>
                  <select name="status" id="status" value="data.status" onChange={handleChange} required value={data.status}>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="underconstruction">Under Construction</option>
                  </select>
                  <label htmlFor="timeInput">Oppening Hours</label>
                  <input
                    type="time"
                    id="openning_at"
                    value={data.openning_at}
                    onChange={handleChange} required value={data.openning_at}
                  />
                  <label htmlFor="timeInput">Closing Hours</label>
                  <input
                    type="time"
                    id="closing_at"
                    value={data.closing_at}
                    onChange={handleChange} required value={data.closing_at}
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
export default Station;