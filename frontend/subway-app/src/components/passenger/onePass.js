import "../../styles/passes.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function OnePass({ ride_id, origin, destination, price, passenger_id }) {
  const navigate = useNavigate();
  const [hide, SetHide] = useState("hide");
  const [amount, SetAmount] = useState(1);
  const [fullname, setFullname] = useState("firstname");
  const isLogin = localStorage.getItem("login");

  const setName = () => {
    axios
      .post("//localhost:8000/api/getPassenger",  {passenger_id}, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": true,
        },
      })
      .then((resp) => {
        setFullname(resp.data.data.first_name);
      }).catch((err)=>{
        console.log(err)
      });
  };
  const buyPass = () => {
    const quantity = amount * price;
    if (isLogin) {
      axios
        .post(
          "//localhost:8000/api/buyPass",
          JSON.stringify({ passenger_id, ride_id, quantity }),
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": true,
            },
          }
        )
        .then((_) => {
          SetHide("");
          alert("Pass bought");
        }).catch((err)=>{
          console.log(err)
        });;
    } else {
      navigate("/login");
    }
  };
  useEffect(() => {
    if (isLogin) {
      setName();
    }
  });
  return (
    <div className="ticket float gap-2">
      <div>
        <ul>
          <li>Name: {fullname}</li>
          <li>Ride number:{ride_id}</li>
          <li>From: {origin}</li>
          <li>
            <button className="button" onClick={buyPass}>
              Buy Pass
            </button>
          </li>
        </ul>
      </div>
      <div>
        <ul>
          <li>Date:</li>
          <li>Price: {price}$</li>
          <li>To: {destination}</li>
          <li>
            <input
              type="number"
              className="input"
              onChange={(e) => {
                SetAmount(e.target.value);
              }}
              placeholder="Passes"
            />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default OnePass;