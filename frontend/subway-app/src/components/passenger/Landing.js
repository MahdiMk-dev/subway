import "../../styles/utilities.css";
import "../../styles/home.css";
import Navbar from "./navbar";
import DisplayBranch from "./DisplayBranch";
import DisplayBranchCard from "./DisplayBranchCard";
import { useEffect, useState } from "react";
import axios from "axios";

function Landing() {
  const [branches, SetBranch] = useState([]);
  const [all, SetAll] = useState([]);
  const getAllBranches = () => {
    const arr = [];
    axios.get("//localhost:8000/api/displayTrips").then((response) => {
      const trip = response.data.trips;
      for (let i = 0; i < trip.length; i++) {
        const branch = (
          <DisplayBranch
            destination={trip[i].city}
            time={trip[i].departure_time}
            price={trip[i].price + "$"}
          />
        );
        arr.push(branch);
      }
      SetAll(arr);
    });
  };

  const displayBranch = () => {
    const arr = [];
    axios.get("//localhost:8000/api/displayTrips").then((response) => {
      const trip = response.data.trips;
      for (let i = 0; i < trip.length; i++) {
        const branch = (
          <DisplayBranchCard
            destination={trip[i].city}
            time={trip[i].departure_time}
            price={trip[i].price + "$"}
            imgurl={""}
          />
        );
        arr.push(branch);
      }
      SetBranch(arr);
    });
  };
  useEffect(() => {
    displayBranch();
    getAllBranches();
  }, []);
  return (
    <div className="Landing">
      <Navbar />
      <div className="main float space-even gap" >
        <div className="right">
          <div className="float">
            <div className="card">
              <div>
                <div className="row">Search Trains</div>
                <div className="row float space-between gap">
                  <div>
                    <input
                      className="inputs"
                      type="text"
                      placeholder="Start Location"
                    />
                  </div>
                  <div>
                    <input
                      className="inputs"
                      type="text"
                      placeholder="Start Location"
                    />
                  </div>
                </div>
                <div className="row float space-between gap">
                  <div>
                    <input
                      className="inputs"
                      type="date"
                      placeholder="Leave Date"
                    />
                  </div>
                  <div>
                    <input
                      className="inputs"
                      type="date"
                      placeholder="Return Date"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <button className="seacrh">Search</button>
            </div>
          </div>
          <div className="row float space-between">
            <div className="link-text">Upcoming Trains</div>
          </div>
          <div id="display" className="over-flow container">
            {all.map((branch) => {
              return <div className="row">{branch}</div>;
            })}
          </div>
        </div>
        <div>
          <img
            src="https://images.pexels.com/photos/1658967/pexels-photo-1658967.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="train"
            className="image"
          />
        </div>
      </div>
      <div className="row float space-between">
        <div className="link-text">Recomended</div>
      </div>
      <div className="cards row float gap">
        {branches.map((branch) => {
          return <div className="row">{branch}</div>;
        })}
      </div>
    </div>
  );
}

export default Landing;
