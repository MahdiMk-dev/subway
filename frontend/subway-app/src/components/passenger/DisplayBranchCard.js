import "../../styles/utilities.css";
import "../../styles/home.css";
import { useState } from "react";
import axios from "axios";
import dateFormat, { masks } from "dateformat";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

function DisplayBranchCard({
  trip_id,
  status,
  origin,
  destination,
  time,
  price,
  imgurl,
}) {
  const passenger_id = localStorage.getItem("userID");
  const navigate = useNavigate();
  const [hide, SetHide] = useState("hide");
  const [amount, SetAmount] = useState(1);
  const buyTicket = () => {
    const isLogin = localStorage.getItem("login");
    const quantity = amount * price;
    if (isLogin) {
      axios
        .post(
          "//localhost:8000/api/buytickets",
          JSON.stringify({ passenger_id, trip_id, status, quantity }),
          {
            headers: {
              "Content-Type": "application/json",
              withCredentials: true,
            },
          }
        )
        .then((_) => {
          SetHide("");
        });
    } else {
      navigate("/login");
    }
  };
  return (
    <>
      <div className={`popup ${hide}`}>
        Tickets Have been bought
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="xmark"
          onClick={() => {
            SetHide("hide");
          }}
        />
      </div>
      <div className="display-card float space-even">
        <div>
          <img src={imgurl} className="destination" />
        </div>
        <div>
          <div className="display-header float">
            <div>{destination}</div>
            <div>{origin}</div>
          </div>
          <div className="display-body float space-between">
            <div className="float space-between ">
              <div>
                Departure time: {dateFormat(time, "ddd, mmm dS, h:MM TT")}
              </div>
              <div>Ticket price: {price} </div>
            </div>
          </div>
          <div className="inputs row float gap">
            <button className="button" onClick={buyTicket}>
              Buy ticket
            </button>
            <input
              type="number"
              className="amount"
              placeholder="tickets"
              onChange={(e) => {
                SetAmount(e.target.value);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default DisplayBranchCard;
