import { useEffect, useState } from "react";
import "../../styles/passes.css";
import "../../styles/utilities.css";
import Navbar from "./navbar";
import OnePass from "./onePass";
import axios from "axios";

function Passes() {
  const id = localStorage.getItem("userID");
  const [all, SetAll] = useState([]);
  const getRides = () => {
    const arr = [];
    axios
      .get("//localhost:8000/api/displayRides", {
        headers: {
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin': true,
        },
      })
      .then((response) => {
        const ride = response.data.rideDestination;
        const origin = response.data.rideOrigin;
        
        for (let i = 0; i < ride.length; i++) {
          const branch = (
            <OnePass
              ride_id={ride[i].id}
              destination={ride[i].city}
              origin={origin[i].city}
              time={ride[i].departure_time}
              price={ride[i].price}
              passenger_id={id}
            />
          );
          arr.push(branch);
        }
        SetAll(arr);
      }).catch((err)=>{
        console.log(err)
      });;
  };
  useEffect(() => {
    getRides();
  }, []);
  return (
    <div>
      <Navbar />
      <div>Search bar</div>
      <div className="float container space-even gap over-flow">
        {all.map((branch) => {
          return <div>{branch}</div>;
        })}
      </div>
    </div>
  );
}

export default Passes;
