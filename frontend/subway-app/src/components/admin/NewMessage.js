import '../../styles/admin/newUser.css'
import Topbar from './Topbar';
import Sidebar from './Sidebar';
import { useState, useEffect } from "react";


function NewMessage() {

  const [passengers, setpassenger] = useState([]);
  const [formData, setFormData] = useState({
    passenger_id: '',
    content: '',
  });

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const token = localStorage.getItem('admintoken');
        const response = await fetch('http://localhost:8000/api/messagepassenger/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();

        if (data.status === 'success') {
          console.log(data.passenger)
          setpassenger(data.passenger);

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

  const handleChange = (e) => {

    setFormData({ ...formData, [e.target.id]: e.target.value });
    console.log(formData)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('admintoken');
      const response = await fetch('http://localhost:8000/api/create_message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.status === 'success') {
        alert('created successfully');
        window.location.href = '/admin';
      } else {
        alert(data.message);
        window.location.href = '/admin_login';
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }; 
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const userType = localStorage.getItem('usertype');
    setIsAdmin(userType === 'admin');
  }, []);

  return (
    <div>
    <Topbar />
      <div className="admincontainer">
        <Sidebar />
    <div className="newUser">
      <h1 className="newUserTitle">New Message</h1>
         <form className="productForm" onSubmit={handleSubmit}>
              <div className="productFormLeft">
                 <label>Passenger</label>
                  <select name="passenger_id" id="passenger_id" onChange={handleChange} required  >
                 
                  <option value="">Select Passenger</option>
                  {isAdmin && (
  <>
    {passengers.map(passenger => (
      <option key={passenger.id} value={passenger.id}>
        {passenger.first_name}
      </option>
    ))}
  </>
)}

{!isAdmin && (
  <>
    {passengers.map(passenger => (
      <option key={passenger.id} value={passenger.id}>
        {passenger.first_name}
      </option>
    ))}
  </>
)}

                  </select>
                  <label>Message</label>
                  <textarea
                    id="content"
                    placeholder="Message"
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

export default NewMessage;