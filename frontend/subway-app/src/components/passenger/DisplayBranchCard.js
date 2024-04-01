import "../../styles/utilities.css";
import "../../styles/home.css";

function DisplayBranchCard({ destination, time, price, imgurl }) {
  return (
    <div className="display-card float space-even">
      <div>
        <img src={imgurl} className="destination"/>
      </div>
      <div>
        <div className="display-header">{destination}</div>
        <div className="display-body float space-between">
          <div className="float space-between gap-6">
            <div>Departure time: {time}</div>
            <div>Ticket price: {price} </div>
          </div>         
        </div>
         <button className="button">Buy ticket</button>
      </div>
    </div>
  );
}

export default DisplayBranchCard;
