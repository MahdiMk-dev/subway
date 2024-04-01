import '../../styles/admin/sidebar.css'
import {
  LineStyle,
  Timeline,
  TrendingUp,
  PermIdentity,
  Storefront,
  AttachMoney, 
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
            <li className="sidebarListItem active">
              <LineStyle className="sidebarIcon" />
              Home
            </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <Link to="/users" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Users
              </li>
            </Link>
            <Link to="/stations" className="link">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                Stations
              </li>
            </Link>
            <Link to="/coins_requests" className="link">
            <li className="sidebarListItem">
              <AttachMoney className="sidebarIcon" />
              Coins Requests
            </li>
            </Link>
             <Link to="/trips" className="link">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                Trips
              </li>
            </Link>
             <Link to="/rides" className="link">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                Rides
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Notifications</h3>
          <ul className="sidebarList">
          <Link to="/reviews" className="link">
            <li className="sidebarListItem">
              <DynamicFeed className="sidebarIcon" />
              Feedback
            </li>
          </Link>
          <Link to="/messages" className="link">
            <li className="sidebarListItem">
              <ChatBubbleOutline className="sidebarIcon" />
              Messages
            </li>
          </Link>
          </ul>
        </div>
       
      </div>
    </div>
  );
}
export default Sidebar;
