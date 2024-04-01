import React, { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/profile.css';
import profileImage from '../../images/profile2.png'; 
import { DataGrid } from '@mui/x-data-grid';
import { tripRows } from "../../dummyData";
import Navbar from './Navbar';// import the image

function TripReview() {


  return (


       <div >
       <Navbar />
        <div className="mainprofile">
        <div className="review">
         <h2>Review Trip</h2>
          <div className="form-card">
      
            <form className="requestForm">
              <div className="requestFormLeft">
                 <label>Rate</label>
                 <select id="rate">
                  
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  </select>
                  <label>Review</label>
                  <textarea
                    id="review"
                    rows={5}
                    placeholder="Enter your comments here"
                  />
                  
                  <button className="requestButton">Request</button>
              </div>
              </form>

          </div>
          </div>
          </div>
          </div>
        
         
  

  );
}

export default TripReview;