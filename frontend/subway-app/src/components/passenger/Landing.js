import "../../styles/utilities.css";
import "../../styles/home.css";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import DisplayBranch from "./DisplayBranch";
import DisplayBranchCard from "./DisplayBranchCard";
import { useEffect, useState } from "react";

function Landing() {
  const [branches, SetBranch] = useState([]);
  const [all, SetAll] = useState([]);
  const getAllBranches = () => {
    const arr = [];
    for (let i = 0; i < 7; i++) {
      const branch = (
        <DisplayBranch destination="Italy" time="12:30" price="1300$" />
      );
      arr.push(branch);
    }
    SetAll(arr);
  };
  const displayBranch = () => {
    const arr = [];
    for (let i = 0; i < 12; i++) {
      const branch = (
        <DisplayBranchCard destination="Italy" time="12:30" price="1300$" imgurl="https://images.pexels.com/photos/208701/pexels-photo-208701.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"/>
      );
      arr.push(branch);
    }
    SetBranch(arr);
  };
  useEffect(() => {
    displayBranch();
    getAllBranches()
  }, []);
  return (
    <div className="Landing">
      <Navbar />
      <div className="main float space-even">
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
          <div id="display" className="over-flow">
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
      <div className="cards row float over-flow space-even gap">

          {branches.map((branch) => {
              return <div className="row">{branch}</div>;
            })}
          </div>
    </div>
  );
}

export default Landing;
