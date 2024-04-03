import "../../styles/utilities.css";
import "../../styles/home.css";
import { useState } from "react";
import axios from "axios";
import dateFormat, { masks } from "dateformat";

function DisplayBranch({ destination, time, price }) {
  const [amount,SetAmount] = useState(0)
  const buyTicket = () =>{
    axios.post("//localhost:8000/api/buytickets",amount).then((respone)=>{
      console.log(respone.message)
    })
  }
  return (
    <div className="displayBranch">
      <div className="display-header">{destination}</div>
      <div className="display-body float space-between">
        <div className="float space-between gap-6">
          <div>Departure time: <br/>{dateFormat(time, "ddd, mmm dS, h:MM TT")}</div>
          <div>Ticket price: <br/>{price} </div>
        </div>
        <div className="display-btns">
           <div className="inputs row float gap">
          <button className="button" onClick={buyTicket}>Buy ticket</button>
          <input
            type="number"
            className="ticketsCount"
            placeholder="tickets"
            onChange={(e)=>{
                SetAmount(e.target.value)
            }}
          /></div>
        </div>
      </div>
    </div>
  );
}

export default DisplayBranch;
