import "../styles/utilities.css";
import "../styles/home.css";
import Navbar from "../components/passenger/navbar";
import { Link } from "react-router-dom";
import DisplayBranch from "./displayBranch";
function Home() {
  return (
    <div className="Home">
      <Navbar />
      <div className="main float space-even">
        <div>
          <div className="card">
            <div className="row float space-between gap">
              <div>Buy Tickets</div>
              <div> Check Schedule</div>
            </div>
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
          <div className="float space-between">
            <div className="link-text">Recomended</div>
            <div>
              <Link to="Branches" className="link-text">
                See more -
              </Link>
            </div>
          </div>
          <div>
              <DisplayBranch />
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
    </div>
  );
}

export default Home;
