import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/profile.css';
import profileImage from '../../images/profile2.png'; 
import { DataGrid } from '@mui/x-data-grid';
import { tripRows } from "../../dummyData";
import Navbar from './Navbar'; // import the image

function TripReview() {
  const [rating, setRating] = useState(0);

  // Function to handle click on stars
  const handleStarClick = (value) => {
    setRating(value);
    document.getElementById('rating-input').value = value;
  };

  return (
    <div>
      <Navbar />
      <div className="mainprofile">
        <div className="review">
          <h2>Review Trip</h2>
          <div className="form-card">
            <form className="requestForm">
              <div className="requestFormLeft">
                <label>Rate</label>
                <div id="rating" className="field rating clearfix">
                  <input id="rating-input" name="Field1" type="hidden" value={rating} />
                  {[1, 2, 3, 4, 5].map((value) => (
                    <span
                      key={value}
                      className={`star clickable ${value <= rating ? 'clicked' : ''}`}
                      value={value}
                      onClick={() => handleStarClick(value)}
                      tabIndex={value * 2 - 1}
                    ></span>
                  ))}
                </div>
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
