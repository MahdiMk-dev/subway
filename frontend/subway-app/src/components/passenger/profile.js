import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/profile.css';
import profileImage from '../../images/profile2.png'; // import the image

function Profile() {


  return (
    <div>
      <div className="sidenav">
        <div className="profile">
        <img src={profileImage} alt="" width="100" height="100" />

          <div className="name">Mahdi Mokalled</div>
          <div className="job">Web Developer</div>
        </div>
        <div className="sidenav-url">
          <div className="url">
            <a href="#profile" className="active">Profile</a>
            <hr align="center" />
          </div>
          <div className="url">
            <a href="#settings">Edit Info</a>
            <hr align="center" />
          </div>
        </div>
      </div>
      <div className="main">
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
        <h2>Previous Trips</h2>
        <div className="card">

            </div>
          </div>
        </div>

  );
}

export default Profile;
