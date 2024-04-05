import "../../styles/utilities.css";
import "../../styles/home.css";
import { useState } from "react";
import axios from "axios";
import dateFormat, { masks } from "dateformat";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

function DisplayBranch({ trip_id, status, origin, destination, time, price }) {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [amount, SetAmount] = useState(1);
  const [hide, SetHide] = useState("hide");
  const buyTicket = () => {
    const isLogin = localStorage.getItem("login");
    const quantity = amount * price;
    console.log({  trip_id, status, quantity });
    if (isLogin) {
      axios
        .post(
          "//localhost:8000/api/buytickets",
          JSON.stringify({ trip_id, status, quantity }),
          {
            headers: {
              "Content-Type": "application/json",
              'Authorization': `Bearer ${token}`
            },
          }
        )
        .then((response) => {
          // Handle successful response
          if(response.data.status==='success')
          window.location.reload();
        else alert(response.data.message) // Optionally, log the response data
          SetHide(""); // Assuming SetHide is a function to update state or hide something
        })
        .catch((error) => {
          // Handle error
          console.error('Error:', error);
          // Optionally, you can also handle specific error statuses, e.g., if you want to show different messages for different errors
          if (error.response) {
            // The request was made and the server responded with a status code that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error:', error.message);
          }
        });
    } else {
      navigate("/login");
    }
  };
  return (
    <div className="displayBranch">
      <div className={`popup ${hide}`}>
        Tickets Have been bought{" "}
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="xmark"
          onClick={() => {
            SetHide("hide");
          }}
        />
      </div>
      <div className="display-header float space-between gap">
        <div>From:{origin}</div>
        <div>To:{destination}</div>
      </div>
      <div className="display-body float space-between">
        <div className="float space-between gap-6">
          <div>
            Departure time: <br />
            {dateFormat(time, "ddd, mmm dS, h:MM TT")}
          </div>
          <div>
            Ticket price: <br />
            {price} ${" "}
          </div>
        </div>
        <div className="display-btns">
          <div className="inputs row float gap">
            <button className="button" onClick={buyTicket}>
              Buy ticket
            </button>
            <input
              type="number"
              className="ticketsCount"
              placeholder="tickets"
              onChange={(e) => {
                SetAmount(e.target.value);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DisplayBranch;
