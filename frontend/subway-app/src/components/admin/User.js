import {
    CalendarToday,
    LocationSearching,
    MailOutline,
    PermIdentity,
    PhoneAndroid,
    Publish,
  } from "@mui/icons-material";
  import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import '../../styles/admin/user.css'
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import Topbar from './Topbar';
import Sidebar from './Sidebar';
function User() {
    const [data, setData] = useState({});
    const { userId } = useParams(); // Get the userId from URL params
    console.log(userId)
 useEffect(() => {
    // Check if userId is not null
    if (userId !== null) {
        // Filter userRows to find the user with the matching id
        const user = userRows.find((user) => user.id === parseInt(userId));
        setData(user); // Set the data state with the found user
    }
}, [userId]); 
 console.log(data)
  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <div className="userShowTopTitle">
              <span className="userShowUsername">{data.name}</span>
              <span className="userShowUserTitle">{data.type}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{data.email}</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">{data.phone_number}</span>
            </div>
            <div className="userShowInfo">
              <ToggleOnIcon className="userShowIcon" />
              <span className="userShowInfoTitle">{data.status}</span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">{data.station}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder={data.name}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  id="email"
                  placeholder={data.email}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Type</label>
                 <select
                  placeholder="type"
                  id="type"
                  className="userUpdateInput"
                  value={data.type}
                >
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
                </select>
              </div>
              <div className="userUpdateItem">
                <label>Phone</label>
                <input
                  type="text"
                  id="phone_number"
                  placeholder={data.phone_number}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Status</label>
                <select
                  placeholder="status"
                  id="status"
                  className="userUpdateInput"
                  value={data.status}
                >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                </select>
              </div>
              <div className="userUpdateItem">
                <label>Station</label>
                <select
                  placeholder="station"
                  id="station"
                  className="userUpdateInput"
                  value={data.station}
                >
                <option value="rome">Rome</option>
                <option value="italy">Italy</option>
                </select>
              </div>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
export default User;
