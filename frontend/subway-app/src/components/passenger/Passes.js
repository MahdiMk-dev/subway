import { useEffect, useState } from "react";
import "../../styles/navbar.css";
import { Link } from "react-router-dom";
import Navbar from "./navbar";
import oneTicket from "./oneTicket";

function Passes({ticket, quantity}) {
const [one, SetOne] =  useState(0)
  const id = localStorage.getItem("ID")
  const [isLogin, Setlogin] = useState(false)
  useEffect(()=>{
    if(ticket != null && quantity != null){
        SetOne(ticket.price*quantity)
    }
  },[])
  return (
    <div >
        <Navbar />
        <div className="ticketdisplay float"><oneTicket /></div>
        <div></div>
      
    </div>
  );
}

export default Passes;