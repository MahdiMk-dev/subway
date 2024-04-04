import {useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/profile.css';
import profileImage from '../../images/profile2.png'; 
import { DataGrid } from '@mui/x-data-grid';
import { tripRows } from "../../dummyData";
import Navbar from './navbar';// import the image

function Profile() {
  
  const [data, setData] = useState([]);
   const [upcommingdata, setupcommingdata] = useState([]);
   const [showTripHistory, setShowTripHistory] = useState(false);
   const [showRequestCoins, setShowRequestCoins] = useState(false);
   const [showTripIpcomming, setTripIpcomming] = useState(false);
   const [showProfile, setProfile] = useState(true);
   const [EditProfile, setEditProfile] = useState(false);
   
   
  useEffect(() => {
    // Simulating data fetching or any asynchronous operation
    // Set data after fetching or any asynchronous operation
    setData(tripRows);
    setupcommingdata(tripRows)
  }, []);
    const handleMenuClick = (menuItem) => {
    setShowTripHistory(menuItem === 'tripHistory');
    setShowRequestCoins(menuItem === 'requestCoins');
    setTripIpcomming(menuItem === 'upcomingTrips');
    setProfile(menuItem === 'profile');
    setEditProfile(menuItem === 'editprofile');
  };
  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
  console.log(data)
  const columns = [
    { field: "id", headerName: "ID", width: 90, hide: true },
    { field: "origin_station", headerName: "Origin", width: 120 },
    { field: "destination_station", headerName: "Destination", width: 120 },
    { field: "price", headerName: "Price", width: 120 },
    { field: "status", headerName: "Status", width: 120 },
    { field: "departure_time", headerName: "Departure Time", width: 120 },
    { field: "arrival_time", headerName: "Arrival Time", width: 120 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/tripreview/" + params.row.id}>
              <button className="reviewListEdit">Add Review</button>
            </Link>
          </>
        );
      },
    },
  ];
    const upcommingcolumns = [
    { field: "id", headerName: "ID", width: 90, hide: true },
    { field: "origin_station", headerName: "Origin", width: 120 },
    { field: "destination_station", headerName: "Destination", width: 120 },
    { field: "price", headerName: "Price", width: 120 },
    { field: "status", headerName: "Status", width: 120 },
    { field: "departure_time", headerName: "Departure Time", width: 120 },
    { field: "arrival_time", headerName: "Arrival Time", width: 120 },
  ];

  useEffect(() => {
    const fetchData = async () => {
        try {
            const token = localStorage.getItem('admintoken');
            console.log(token)
            const response = await fetch('http://localhost:8000/api/show', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            const data = await response.json();
            console.log(data)
            if (data.status === 'success') {
                console.log(data.trips)
                if (data.trips.length>0) {
                    const transformedTrips = data.trips.map(trip => ({
        id: trip.id,
        origin_station: trip.origin_station.name,
        destination_station: trip.destination_station.name,
        price: trip.price,
        status: trip.status,
        departure_time: trip.departure_time,
        arrival_time: trip.arrival_time,
      }));
                    setData(transformedTrips);
                }
            }
             else {
                alert(data.message);
                window.location.href = '/admin_login';
            }

        } catch (error) {
            console.error('Error:', error);
        }
    };

    fetchData();
}, []);


  return (
    <div>
    <Navbar />
      <div className="sidenav">
        <div className="profile">
        <img src={profileImage} alt="" width="100" height="100" />

          <div className="name">Mahdi Mokalled</div>
          <div className="job">Web Developer</div>
        </div>
        <div className="sidenav-url">
          <div className="url">
            <a href="#settings" className={showProfile ? 'active' : ''} onClick={() => {handleMenuClick('profile');setEditProfile(false);setProfile(true);setShowTripHistory(false);setShowRequestCoins(false);setTripIpcomming(false)}}>
            Profile</a>
            <hr align="center" />
          </div>
          <div className="url">
            <a href="#settings" className={EditProfile ? 'active' : ''} onClick={() => {handleMenuClick('editprofile');setEditProfile(true);setProfile(false);setShowTripHistory(false);setShowRequestCoins(false);setTripIpcomming(false)}}>
            Edit Info</a>
            <hr align="center" />
          </div>
          <div className="url">
            <a href="#settings" className={showTripHistory ? 'active' : ''} onClick={() => {handleMenuClick('tripHistory');setEditProfile(false);setProfile(false);setShowTripHistory(true);setShowRequestCoins(false);setTripIpcomming(false)}}>Trip History</a>
            <hr align="center" />
          </div>
          <div className="url">
            <a href="#settings" className={showRequestCoins ? 'active' : ''} onClick={() => {handleMenuClick('requestCoins');setEditProfile(false);setProfile(false);setShowRequestCoins(true);setShowTripHistory(false);;setTripIpcomming(false)}}>Request Coins</a>
            <hr align="center" />
          </div>
           <div className="url">
            <a href="#settings" className={showTripIpcomming ? 'active' : ''} onClick={() => {handleMenuClick('upcomingTrips');setEditProfile(false);setProfile(false);setShowRequestCoins(false);setShowTripHistory(false);;setTripIpcomming(true)}}>Upcomming Trips</a>
            <hr align="center" />
          </div>
        </div>
      </div>
      <div className="mainprofile">
        <h2>Personal Info</h2>
        <div className="card">
          <div className="card-body">
            <i className="fa fa-pen fa-xs edit"></i>
            <table>
              <tbody>
                <tr>
                  <td>Name</td>
                  <td>:</td>
                  <td>Mahdi Mokalled</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>:</td>
                  <td>mokaledmahdi@gmail.com</td>
                </tr>
                <tr>
                  <td>Address</td>
                  <td>:</td>
                  <td>Lebanon, Beirut</td>
                </tr>
                
              </tbody>
            </table>
          </div>
        </div>
        {showTripHistory && data.length > 0 && (
          <div className="tripshistory">
          <h2>Previous Trips</h2>
          <div className="table-card">
           
            <DataGrid
              rows={data}
              disableSelectionOnClick
              columns={columns}
              pageSize={8}
              checkboxSelection
            />
          </div>
          </div>
        )}
        {showTripIpcomming && upcommingdata.length > 0 && (
          <div className="tripshistory">
          <h2>Upcomming Trips</h2>
          <div className="table-card">
           
            <DataGrid
              rows={upcommingdata}
              disableSelectionOnClick
              columns={upcommingcolumns}
              pageSize={8}
              checkboxSelection
            />
          </div>
          </div>
        )}
                {showRequestCoins  && (
        <div className="coins">
         <h2>Request Coins</h2>
          <div className="form-card">
      
            <form className="coinsForm">
              <div className="coinsFormLeft">
                 <label>Amount</label>
                  <input
                    type="number"
                    id="amount"
                    placeholder="amount"
                  />
                  
                  <button className="requestButton">Request</button>
              </div>
              </form>

          </div>
          </div>
        )}
        {EditProfile  && (
        <div className="coins">
         <h2>Edit Profile</h2>
          <div className="form-card">
      
            <form className="coinsForm">
              <div className="coinsFormLeft">
                 <label>Name</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Name"
                  />
                  <label>Email</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Email"
                  />
                  
                  <button className="requestButton">Update</button>
              </div>
              </form>

          </div>
          </div>
        )}
         
          </div>
        </div>

  );
}
export default Profile;