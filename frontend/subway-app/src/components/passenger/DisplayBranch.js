import "../../styles/utilities.css";
import "../../styles/home.css";

function DisplayBranch({ destination, time, price }) {
  return (
    <div className="displayBranch">
      <div className="display-header">{destination}</div>
      <div className="display-body float space-between">
        <div className="float space-between gap-6">
          <div>Departure time: {time}</div>
          <div>Ticket price: {price} </div>
        </div>
        <div className="display-btns">
          <div><button className="button">Buy ticket</button></div>
          <div><input
            type="number"
            className="ticketsCount"
            placeholder="ticket amount"
          /></div>
        </div>
      </div>
    </div>
  );
}

export default DisplayBranch;
