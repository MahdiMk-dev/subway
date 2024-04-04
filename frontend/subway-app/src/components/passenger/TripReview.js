import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/profile.css';
import profileImage from '../../images/profile2.png'; 
import { DataGrid } from '@mui/x-data-grid';
import { tripRows } from "../../dummyData";
import { useParams } from 'react-router-dom';
import Navbar from './navbar'; // import the image

function TripReview() {
  const [rating, setRating] = useState(0);
  const { tripId } = useParams();
  // Function to handle click on stars
  const handleStarClick = (value) => {
    setRating(value);
    document.getElementById('rating-input').value = value;
  };
  const handleSubmitReviewt = async (e) => {
    e.preventDefault();
  

    const content = document.getElementById('review').value;
    const formData = {
            rate: rating,
            content:content,
            trip_id:tripId
    }
    console.log(formData)
    try {
      const token = localStorage.getItem('token');
      console.log(token)
      const response = await fetch('http://localhost:8000/api/addreview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if(data.status=='success'){
        alert('requested successfully')
        window.location.href='/profile'
      }
      else{
        alert(data.message)
         window.location.href="/login"
      }
      console.log(data); // Handle the response data here
    } catch (error) {
      console.error('Error:', error);
    }
  }; 
   

  return (
    <div>
      <Navbar />
      <div className="mainprofile">
        <div className="review">
          <h2>Review Trip</h2>
          <div className="form-card">
            <form className="requestForm" onSubmit={handleSubmitReviewt}>
              <div className="requestFormLeft">
                <label>Rate</label>
                <div id="rating" className="field rating clearfix">
                  <input id="rating-input" name="Field1" type="hidden" value={rating} />
                  {[1, 2, 3, 4, 5].map((value) => (
                    <span
                      id="rate"
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
