import "../../styles/utilities.css";
import "../../styles/home.css";
import { useState } from "react";
import axios from "axios";
import dateFormat, { masks } from "dateformat";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

function DisplayBranch({ trip_id, status, origin, destination, time, price }) {
  const passenger_id = localStorage.getItem("userID");
  const navigate = useNavigate();
  const [amount, SetAmount] = useState(1);
  const [hide, SetHide] = useState("hide");
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
