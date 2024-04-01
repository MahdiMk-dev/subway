import '../../styles/admin/widgetSm.css'
import { Visibility } from "@mui/icons-material";
import { tripRows } from "../../dummyData";
import { coinRows } from "../../dummyData";
import { useState } from "react";
function WidgetSm() {
    const [trips, setTrips] = useState(tripRows);
    const[coins, setCoins] = useState(coinRows);
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Coin Requests</span>
      <ul className="widgetSmList">
        <li className="widgetSmListItem">
          <div className="widgetSmUser">
            <span className="widgetSmUsername">Saviour Blessing</span>
            <span className="widgetSmUserTitle">Software Engineer</span>
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Display
          </button>
        </li>
        <li className="widgetSmListItem">
          <img
            src="https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">Anna Keller</span>
            <span className="widgetSmUserTitle">Software Engineer</span>
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Display
          </button>
        </li>
      </ul>
    </div>
  );
}
export default WidgetSm;
