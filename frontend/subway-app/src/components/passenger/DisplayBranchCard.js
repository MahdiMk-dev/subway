import "../../styles/utilities.css";
import "../../styles/home.css";
import { useState } from "react";
import axios from "axios";
import dateFormat, { masks } from "dateformat";
import { useNavigate } from "react-router-dom";

function DisplayBranchCard({ destination, time, price, imgurl }) {
  const navigate = useNavigate()
  const [amount,SetAmount] = useState(0)
  const buyTicket = () =>{
    const isLogin = localStorage.getItem("login")
    if(isLogin){
    axios.post("//localhost:8000/api/buytickets",amount).then((respone)=>{
      console.log(respone.message)
    })}
    else{
      navigate("/login")
    }
  }
  return (
    <div className="display-card float space-even">
      <div>
        <img src={imgurl} className="destination" />
      </div>
      <div>
        <div className="display-header float"><div>{destination}</div></div>
        <div className="display-body float space-between">
          <div className="float space-between ">
          <div>Departure time: {dateFormat(time, "ddd, mmm dS, h:MM TT")}</div>
            <div>Ticket price: {price} </div>
          </div>
        </div>
        <div className="inputs row float gap">
          <button className="button" onClick={buyTicket}>Buy ticket</button>
          <input
            type="number"
            className="amount"
            placeholder="tickets"
            onChange={(e)=>{
                SetAmount(e.target.value)
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default DisplayBranchCard;
