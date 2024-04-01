import '../../styles/admin/widgetlg.css'
import { tripRows } from "../../dummyData";
import { coinRows } from "../../dummyData";
import { useState } from "react";

function Coins() {
      const [trips, setTrips] = useState(tripRows);

  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  return (
    
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest Trips</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Origin</th>
          <th className="widgetLgTh">Destination</th>
          <th className="widgetLgTh">Arrival Time</th>
          <th className="widgetLgTh">Departure Time</th>
          <th className="widgetLgTh">Status</th>
        </tr>
         {trips.map((trip, index) => (
        <tr className="widgetLgTr">
          <td className="widgetLgUser">
            
            <span className="widgetLgName">{trip.origin_station}</span>
          </td>
          <td className="widgetLgAmount">{trip.destination_station}</td>
           <td className="widgetLgAmount">{trip.arrival_time}</td>
            <td className="widgetLgAmount">{trip.departure_time}</td>
          <td className="widgetLgStatus">
            <Button type={trip.status} />
          </td>
          </tr>
          ))}
        </table>
    </div>
  );
}
export default Coins;
