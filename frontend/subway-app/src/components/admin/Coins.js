import '../../styles/admin/widgetlg.css'
import { tripRows } from "../../dummyData";
import { coinRows } from "../../dummyData";
import { useState } from "react";
function Coins() {
      const [trips, setTrips] = useState(tripRows);
    const[coins, setCoins] = useState(coinRows);
 
  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest Conins Requests</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Name</th>
          <th className="widgetLgTh">Amount</th>
          <th className="widgetLgTh">Status</th>
        </tr>
         {coins.map((coin, index) => (
        <tr className="widgetLgTr">
          <td className="widgetLgUser">
            
            <span className="widgetLgName">{coin.name}</span>
          </td>
          <td className="widgetLgAmount">{coin.amount}</td>
          <td className="widgetLgStatus">
            <Button type={coin.status} />
          </td>
          </tr>
          ))}
        </table>
    </div>
  );
}
export default Coins;
